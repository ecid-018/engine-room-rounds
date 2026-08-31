import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RoundEntry, RoundListRow } from '../types/round';
import { computeTierCounts } from '../utils/roundConversion';
import { ROUND_INDEX_KEY, roundKey } from './keys';

async function readIndex(): Promise<RoundListRow[]> {
  const raw = await AsyncStorage.getItem(ROUND_INDEX_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as RoundListRow[];
}

async function writeIndex(rows: RoundListRow[]): Promise<void> {
  await AsyncStorage.setItem(ROUND_INDEX_KEY, JSON.stringify(rows));
}

export async function insertRound(entry: RoundEntry): Promise<void> {
  await AsyncStorage.setItem(roundKey(entry.roundId), JSON.stringify(entry));

  const counts = computeTierCounts(entry.answers);
  const row: RoundListRow = {
    roundId: entry.roundId,
    date: entry.date,
    time: entry.time,
    engineerOnDuty: entry.engineerOnDuty,
    chiefEngineer: entry.chiefEngineer,
    okCount: counts.ok,
    attentionCount: counts.attention,
    faultCount: counts.fault,
    submittedAt: entry.submittedAt,
  };

  const index = await readIndex();
  index.push(row);
  index.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  await writeIndex(index);
}

export async function listRounds(): Promise<RoundListRow[]> {
  return readIndex();
}

export async function getRoundById(roundId: string): Promise<RoundEntry | null> {
  const raw = await AsyncStorage.getItem(roundKey(roundId));
  if (!raw) return null;
  return JSON.parse(raw) as RoundEntry;
}
