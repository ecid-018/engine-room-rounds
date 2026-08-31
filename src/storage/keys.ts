export const ROUND_INDEX_KEY = 'roundIndex';

export function roundKey(roundId: string): string {
  return `round:${roundId}`;
}
