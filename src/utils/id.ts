import * as Crypto from 'expo-crypto';

export function generateRoundId(): string {
  return Crypto.randomUUID();
}
