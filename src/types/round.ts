import type { Tier } from './checklist';

export interface RoundEntry {
  roundId: string;
  date: string;
  time: string;
  engineerOnDuty: string;
  chiefEngineer: string;
  answers: { [checkpointId: string]: { [subcheckIndex: number]: Tier } };
  remarks: { [checkpointId: string]: string };
  submittedAt: string;
}

export interface TierCounts {
  ok: number;
  attention: number;
  fault: number;
}

export interface RoundListRow {
  roundId: string;
  date: string;
  time: string;
  engineerOnDuty: string;
  chiefEngineer: string;
  okCount: number;
  attentionCount: number;
  faultCount: number;
  submittedAt: string;
}
