import danismanlik from './answers.danismanlik.tr.json';
import diger from './answers.diger.tr.json';
import genel from './answers.genel.tr.json';
import hizmet from './answers.hizmet.tr.json';
import kamu from './answers.kamu.tr.json';
import muhendislik from './answers.muhendislik.tr.json';
import ortak from './answers.ortak.tr.json';
import sosyal from './answers.sosyal.tr.json';
import ticaret from './answers.ticaret.tr.json';
import yazilim from './answers.yazilim.tr.json';

/**
 * Practice answers, one file per catalogue file (src/data/catalog/<name>.ts; "ortak" is the
 * shared behavioural questions in src/data/build.ts). Each maps a question's exact text to
 * its good, partial and wrong answers.
 */
export type Groups = { good?: string[]; partial?: string[]; wrong?: string[] };

export const ANSWER_SETS: Record<string, Record<string, Groups>> = {
  danismanlik,
  diger,
  genel,
  hizmet,
  kamu,
  muhendislik,
  ortak,
  sosyal,
  ticaret,
  yazilim,
};
