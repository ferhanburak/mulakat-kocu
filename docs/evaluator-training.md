# Training the evaluator with practice answers

The answer evaluator is rule-based (`src/lib/evaluator.ts`). Each question lists its key
points as concepts with stems, plus optional traps (common wrong claims). "Training" means
writing many realistic answers and tuning a question's stems and traps until the evaluator
puts each answer in the right group. The answers stay as a regression set.

## Files

- Questions: `src/data/catalog/<name>.ts` (shared behavioural ones: `BEHAVIOURAL` in `src/data/build.ts`).
- Answers: `src/lib/__tests__/fixtures/answers.<name>.tr.json` (`ortak` = the shared behavioural ones),
  keyed by the question's exact text:
  `{ "<question text>": { "good": [...], "partial": [...], "wrong": [...] } }`
- Check: `npx jest src/lib/__tests__/answers.test.ts` (lists every answer that lands in the wrong group).
- Apply changes: `python scripts/train_stems.py src/data/catalog/<name>.ts <edits.json>` with
  `{ "<question text>": { "stems": { "<concept label>": ["new stem"] }, "traps": ["Label: pattern; pattern"] } }`.
  Run Python with `PYTHONIOENCODING=utf-8` on Windows.

## Groups

- good: covers at least 3/4 of the key points, no wrong claim.
- partial: covers at least one key point but under 3/4, no wrong claim.
- wrong: under half once wrong claims are counted (each trap costs half), and Elif reacts with a weak line.

## Writing answers (per question)

- 3 good: different wordings. One plain Turkish, one with English terms the way people really talk
  (e.g. "cache'lerim", "deploy ederiz"), one casual or story-like. Avoid copying the stems or the ideal answer.
- 2 partial: one covering a single point, one covering about half.
- 3 wrong: one off-topic or empty ("bilmiyorum…"), one vague, one with a confident wrong claim the
  field commonly gets wrong (this one needs a trap).

## Tuning

- A good answer missed a point: add the stem people actually say (synonyms, English terms, common
  suffix-free roots). Stems match the start of a word, so "ölç" matches "ölçerim"; keep stems at
  least 3 letters and specific enough not to match unrelated words.
- A partial or wrong answer scored too high: the stem is too broad; make it more specific.
- A wrong claim scored as correct: add a trap. Pattern parts are split by "..." and must appear in
  order inside one clause (no comma or . ! ? ; between, gaps up to 30 characters). Write affirmative
  forms ("idempotenttir") so the negated correct form ("idempotent değildir") doesn't match. Prefer
  tight patterns ("get veri oluşturur") over loose ones ("get ... oluşturur"), which also hit correct
  answers like "GET okur POST oluşturur".
- Never change an answer to make it pass. Never change `src/lib/evaluator.ts` or `src/data/build.ts`
  (other than `BEHAVIOURAL` stems/traps for `ortak`); if the matching rules themselves need a change,
  write it down in the report instead.
- When done, `npx tsc --noEmit`, `npx expo lint` and `npm test` must be clean.
