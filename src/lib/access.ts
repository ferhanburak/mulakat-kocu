import { findUnit } from '@/data/professions';
import { useStore } from './store';

/**
 * What a guest may use before signing up. Everything here is checked on the device;
 * once real accounts exist (Faz 3) the same rules can be enforced on the server.
 */
export const GUEST_INTERVIEWS = 3;

export type Locked = 'unit' | 'interviews' | 'daily' | 'review';

export function useAccess() {
  const { session, stats } = useStore();
  const guest = session?.mode === 'guest';
  const interviewsLeft = guest ? Math.max(0, GUEST_INTERVIEWS - stats.interviews) : Infinity;

  /** Guests only get the first unit of each track. */
  const canOpenUnit = (unitId: string) => {
    if (!guest) return true;
    const f = findUnit(unitId);
    return !!f && f.track.units[0].id === unitId;
  };

  /** Why this unit's interview is closed to the user, if it is. */
  const interviewBlock = (unitId: string): Locked | null =>
    !canOpenUnit(unitId) ? 'unit' : interviewsLeft <= 0 ? 'interviews' : null;

  return {
    guest,
    interviewsLeft,
    canOpenUnit,
    interviewBlock,
    /** Günün Sorusu and the mistake-notebook review need an account. */
    canDaily: !guest,
    canReview: !guest,
  };
}
