import type { Checkpoint } from './checklist';

export const UNGROUPED = '__none__';

export interface GroupedSection {
  name: string;
  order: string[];
  subGroups: Map<string, Checkpoint[]>;
}
