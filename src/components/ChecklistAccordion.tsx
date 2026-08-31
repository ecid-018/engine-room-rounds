import { View } from 'react-native';
import type { Tier } from '../types/checklist';
import type { GroupedSection } from '../types/grouping';
import { UNGROUPED } from '../types/grouping';
import { isItemDone, sectionItems, sectionWorstTier } from '../utils/grouping';
import { SectionAccordion } from './SectionAccordion';
import { SubGroupHeader } from './SubGroupHeader';
import { CheckpointRow } from './CheckpointRow';

interface ChecklistAccordionProps {
  sections: GroupedSection[];
  expanded: Set<string>;
  onToggleSection?: (name: string) => void;
  status: Record<string, Tier>;
  onSelectTier?: (checkpointId: string, subIndex: number, tier: Tier) => void;
  remarks: Record<string, string>;
  openRemarkId?: string | null;
  onToggleRemark?: (checkpointId: string) => void;
  onChangeRemark?: (checkpointId: string, text: string) => void;
  readOnly: boolean;
  forceOpenAll?: boolean;
}

export function ChecklistAccordion({
  sections,
  expanded,
  onToggleSection,
  status,
  onSelectTier,
  remarks,
  openRemarkId,
  onToggleRemark,
  onChangeRemark,
  readOnly,
  forceOpenAll,
}: ChecklistAccordionProps) {
  return (
    <View>
      {sections.map((section) => {
        const items = sectionItems(section);
        const doneCount = items.filter((i) => isItemDone(i, status)).length;
        const worstTier = sectionWorstTier(items, status);
        const isOpen = forceOpenAll || expanded.has(section.name);

        return (
          <SectionAccordion
            key={section.name}
            name={section.name}
            isOpen={isOpen}
            onToggle={() => onToggleSection?.(section.name)}
            doneCount={doneCount}
            totalCount={items.length}
            worstTier={worstTier}
          >
            {section.order.map((subKey) => {
              const groupItems = section.subGroups.get(subKey) ?? [];
              return (
                <View key={subKey}>
                  {subKey !== UNGROUPED ? <SubGroupHeader name={subKey} /> : null}
                  {groupItems.map((item) => (
                    <CheckpointRow
                      key={item.id}
                      item={item}
                      status={status}
                      onSelectTier={readOnly ? undefined : onSelectTier}
                      remark={remarks[item.id]}
                      readOnly={readOnly}
                      remarkOpen={openRemarkId === item.id}
                      onToggleRemark={readOnly ? undefined : onToggleRemark}
                      onChangeRemark={readOnly ? undefined : onChangeRemark}
                    />
                  ))}
                </View>
              );
            })}
          </SectionAccordion>
        );
      })}
    </View>
  );
}
