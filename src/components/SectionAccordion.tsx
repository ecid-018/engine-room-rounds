import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Tier } from '../types/checklist';
import { colors, spacing, typography, tierColors } from '../theme';

interface SectionAccordionProps {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  doneCount: number;
  totalCount: number;
  worstTier: -1 | Tier;
  children: ReactNode;
}

export function SectionAccordion({
  name,
  isOpen,
  onToggle,
  doneCount,
  totalCount,
  worstTier,
  children,
}: SectionAccordionProps) {
  const dotColor = worstTier === 2 ? tierColors[2].dot : worstTier === 1 ? tierColors[1].dot : null;

  return (
    <View style={styles.container}>
      <Pressable onPress={onToggle} style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.chevron, isOpen ? styles.chevronOpen : null]}>▶</Text>
          <Text style={styles.name}>{name}</Text>
          {dotColor ? <View style={[styles.dot, { backgroundColor: dotColor }]} /> : null}
        </View>
        <Text style={styles.count}>
          {doneCount}/{totalCount}
        </Text>
      </Pressable>
      {isOpen ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panelAlt,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  chevron: {
    fontSize: typography.tiny.fontSize,
    color: colors.textFaint,
  },
  chevronOpen: {
    transform: [{ rotate: '90deg' }],
  },
  name: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  count: {
    fontSize: typography.tiny.fontSize,
    color: colors.textFaint,
  },
  body: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
