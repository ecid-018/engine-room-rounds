export type Tier = 0 | 1 | 2;

export interface SubCheck {
  label: string | null;
  tickers: [string, string, string];
}

export interface Checkpoint {
  id: string;
  section: string;
  subGroup: string | null;
  checkpoint: string;
  subchecks: SubCheck[];
}
