import type { Checkpoint, Tier } from '../types/checklist';
import { UNGROUPED, type GroupedSection } from '../types/grouping';

export function statusKey(checkpointId: string, subIndex: number): string {
  return `${checkpointId}::${subIndex}`;
}

export function groupData(items: Checkpoint[]): GroupedSection[] {
  const sections: GroupedSection[] = [];
  const sectionMap = new Map<string, GroupedSection>();

  for (const item of items) {
    let section = sectionMap.get(item.section);
    if (!section) {
      section = { name: item.section, subGroups: new Map(), order: [] };
      sectionMap.set(item.section, section);
      sections.push(section);
    }
    const key = item.subGroup ?? UNGROUPED;
    let group = section.subGroups.get(key);
    if (!group) {
      group = [];
      section.subGroups.set(key, group);
      section.order.push(key);
    }
    group.push(item);
  }

  return sections;
}

export function sectionItems(section: GroupedSection): Checkpoint[] {
  return section.order.flatMap((key) => section.subGroups.get(key) ?? []);
}

export function isItemDone(item: Checkpoint, status: Record<string, Tier>): boolean {
  return item.subchecks.every((_sc, i) => status[statusKey(item.id, i)] !== undefined);
}

export function itemWorstTier(item: Checkpoint, status: Record<string, Tier>): -1 | Tier {
  let worst: -1 | Tier = -1;
  for (let i = 0; i < item.subchecks.length; i++) {
    const t = status[statusKey(item.id, i)];
    if (t !== undefined && t > worst) worst = t;
  }
  return worst;
}

export function sectionWorstTier(items: Checkpoint[], status: Record<string, Tier>): -1 | Tier {
  let worst: -1 | Tier = -1;
  for (const item of items) {
    const t = itemWorstTier(item, status);
    if (t > worst) worst = t;
  }
  return worst;
}

export function filterChecklist(items: Checkpoint[], query: string): Checkpoint[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (i) =>
      i.checkpoint.toLowerCase().includes(q) ||
      i.section.toLowerCase().includes(q) ||
      (i.subGroup ?? '').toLowerCase().includes(q)
  );
}
