"""
Generates the interviewers' voice clips: every question (Turkish catalogue and its
English translation) and every interviewer line, once per interviewer character.

Usage (from the project root):
    pip install edge-tts imageio-ffmpeg
    python scripts/generate_voices.py

- Characters and their voices come from src/data/interviewers.json.
- Turkish questions are read from src/data (build.ts, catalog/*.ts); English ones from src/data/en/*.json.
- Each text is spoken by the character's voice for its language (native speakers only).
- Clips go to assets/voice/<hash>.mp3, re-encoded to 24 kbps mono to keep the app small
  (skipped if imageio-ffmpeg is missing). Existing clips are kept, stale ones deleted.
- Writes src/data/voiceClips.ts: interviewer id -> text -> bundled clip.

Backend: with AZURE_SPEECH_KEY and AZURE_SPEECH_REGION set, the official Azure Speech REST
API is used (use this for store releases). Otherwise the free Edge read-aloud service
(edge-tts), which is fine for development.
"""

import asyncio
import hashlib
import json
import os
import re
import subprocess
import urllib.request
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
OUT_DIR = ROOT / "assets" / "voice"
MAP_FILE = DATA / "voiceClips.ts"
TR_SOURCES = [DATA / "build.ts", *sorted((DATA / "catalog").glob("*.ts"))]

TURKISH_CHARS = re.compile(r"[çğıöşüÇĞİÖŞÜ]")
ENGLISH_WORDS = re.compile(r"\b(the|you|your|we|me|about|what|why|where|how|tell)\b", re.I)
Q_CALL = re.compile(r"\bq\(\s*'[a-z]+',\s*'((?:[^'\\]|\\.)*)'", re.S)


def lang_of(text: str) -> str:
    return "en" if not TURKISH_CHARS.search(text) and ENGLISH_WORDS.search(text) else "tr"


def collect_texts() -> dict[str, str]:
    """text -> language, for every question in both languages."""
    texts: dict[str, str] = {}
    for path in TR_SOURCES:
        for m in Q_CALL.finditer(path.read_text(encoding="utf-8")):
            text = m.group(1).replace("\\'", "'")
            texts[text] = lang_of(text)
    for path in sorted((DATA / "en").glob("*.json")):
        if path.name == "meta.json":
            continue
        for unit in json.loads(path.read_text(encoding="utf-8")).values():
            for q in unit["q"]:
                texts[q[0]] = "en"
    return texts


def clip_name(voice: dict, text: str) -> str:
    key = f"{voice['name']}|{voice['rate']}|{voice['pitch']}|{text}"
    return hashlib.sha1(key.encode()).hexdigest()[:12] + ".mp3"


def azure(voice: dict, lang: str, text: str, out: Path, key: str, region: str) -> None:
    ssml = (
        f"<speak version='1.0' xml:lang='{'tr-TR' if lang == 'tr' else 'en-US'}'>"
        f"<voice name='{voice['name']}'><prosody rate='{voice['rate']}' pitch='{voice['pitch']}'>"
        f"{escape(text)}</prosody></voice></speak>"
    )
    req = urllib.request.Request(
        f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=ssml.encode(),
        headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
            "User-Agent": "mulakat-kocu-voices",
        },
    )
    with urllib.request.urlopen(req) as res:
        out.write_bytes(res.read())


async def edge(voice: dict, text: str, out: Path) -> None:
    import edge_tts

    await edge_tts.Communicate(text, voice["name"], rate=voice["rate"], pitch=voice["pitch"]).save(str(out))


def ffmpeg_exe() -> str | None:
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return None


def compress(ffmpeg: str, path: Path) -> None:
    tmp = path.with_suffix(".tmp.mp3")
    subprocess.run(
        [ffmpeg, "-y", "-loglevel", "error", "-i", str(path), "-ac", "1", "-ar", "22050", "-b:a", "24k", str(tmp)],
        check=True,
    )
    tmp.replace(path)


async def make(voice: dict, lang: str, text: str, out: Path, ffmpeg: str | None) -> bool:
    key, region = os.environ.get("AZURE_SPEECH_KEY"), os.environ.get("AZURE_SPEECH_REGION")
    for attempt in range(3):
        try:
            if key and region:
                await asyncio.to_thread(azure, voice, lang, text, out, key, region)
            else:
                await edge(voice, text, out)
            if ffmpeg:
                await asyncio.to_thread(compress, ffmpeg, out)
            return True
        except Exception as e:  # network hiccups: retry, then give up on this clip
            if attempt == 2:
                print(f"  failed: {text[:50]}... ({e})")
                out.unlink(missing_ok=True)
    return False


async def main() -> None:
    interviewers = json.loads((DATA / "interviewers.json").read_text(encoding="utf-8"))
    questions = collect_texts()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ffmpeg = ffmpeg_exe()
    backend = "Azure" if os.environ.get("AZURE_SPEECH_KEY") else "edge-tts"
    print(f"{len(questions)} questions, {len(interviewers)} interviewers, backend: {backend}, compress: {bool(ffmpeg)}")

    jobs: list[tuple[str, dict, str, str, str]] = []  # (who, voice, lang, text, file)
    for i in interviewers:
        texts = dict(questions)
        for lang in ("tr", "en"):
            for line in [*i["intro"][lang], *i["ack"][lang], *i["ackGood"][lang], *i["ackWeak"][lang], i["outro"][lang], i["probe"][lang], i["probeExpand"][lang], i["probeResult"][lang]]:
                texts[line] = lang
        for text, lang in texts.items():
            voice = i["voice"][lang]
            jobs.append((i["id"], voice, lang, text, clip_name(voice, text)))

    todo = [j for j in jobs if not (OUT_DIR / j[4]).exists()]
    print(f"{len(jobs)} clips, {len(todo)} to generate")
    sem = asyncio.Semaphore(6)
    failed: set[str] = set()

    async def run(job):
        async with sem:
            if not await make(job[1], job[2], job[3], OUT_DIR / job[4], ffmpeg):
                failed.add(job[4])

    for n in range(0, len(todo), 60):
        await asyncio.gather(*(run(j) for j in todo[n : n + 60]))
        print(f"  {min(n + 60, len(todo))}/{len(todo)}")

    jobs = [j for j in jobs if j[4] not in failed]
    names = {j[4] for j in jobs}
    for f in OUT_DIR.glob("*.mp3"):
        if f.name not in names:
            f.unlink()

    lines = [
        "// Generated by scripts/generate_voices.py. Do not edit by hand.",
        "// Interviewer id -> spoken text -> bundled voice clip.",
        "export const VOICE_CLIPS: Record<string, Record<string, number>> = {",
    ]
    for i in interviewers:
        lines.append(f"  {i['id']}: {{")
        for _who, _v, _l, text, name in sorted((j for j in jobs if j[0] == i["id"]), key=lambda j: j[4]):
            js = text.replace("\\", "\\\\").replace("'", "\\'")
            lines.append(f"    '{js}': require('../../assets/voice/{name}'),")
        lines.append("  },")
    lines.append("};\n")
    MAP_FILE.write_text("\n".join(lines), encoding="utf-8")
    size = sum(f.stat().st_size for f in OUT_DIR.glob("*.mp3")) / 1e6
    print(f"done: {len(jobs)} clips, {size:.1f} MB, {len(failed)} failed")


if __name__ == "__main__":
    asyncio.run(main())
