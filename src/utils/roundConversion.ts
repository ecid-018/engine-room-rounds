import type { Tier } from '../types/checklist';
import type { RoundEntry, TierCounts } from '../types/round';
import { statusKey } from './grouping';

export function statusMapToAnswers(status: Record<string, Tier>): RoundEntry['answers'] {
  const answers: RoundEntry['answers'] = {};
  for (const [key, tier] of Object.entries(status)) {
    const [checkpointId, subIndexStr] = key.split('::');
    const subIndex = Number(subIndexStr);
    if (!answers[checkpointId]) answers[checkpointId] = {};
    answers[checkpointId][subIndex] = tier;
  }
  return answers;
}

export function answersToStatusMap(answers: RoundEntry['answers']): Record<string, Tier> {
  const status: Record<string, Tier> = {};
  for (const [checkpointId, subAnswers] of Object.entries(answers)) {
    for (const [subIndexStr, tier] of Object.entries(subAnswers)) {
      status[statusKey(checkpointId, Number(subIndexStr))] = tier;
    }
  }
  return status;
}

export function computeTierCounts(answers: RoundEntry['answers']): TierCounts {
  const counts: TierCounts = { ok: 0, attention: 0, fault: 0 };
  for (const subAnswers of Object.values(answers)) {
    for (const tier of Object.values(subAnswers)) {
      if (tier === 0) counts.ok++;
      else if (tier === 1) counts.attention++;
      else counts.fault++;
    }
  }
  return counts;
}
