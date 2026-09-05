import { useMemo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Tier } from '../types/checklist';
import { spacing, typography, radius, useTheme, type ColorPalette } from '../theme';

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
  const { colors, tierColors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      backgroundColor: colors.panel,
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
      color: colors.navy,
    },
    chevronOpen: {
      transform: [{ rotate: '90deg' }],
    },
    name: {
      fontSize: typography.sheetTitle.fontSize,
      fontWeight: typography.sheetTitle.fontWeight,
      letterSpacing: typography.sheetTitle.letterSpacing,
      textTransform: 'uppercase',
      color: colors.navy,
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    count: {
      fontSize: typography.tiny.fontSize,
      color: colors.muted,
      fontVariant: ['tabular-nums'],
    },
    body: {
      borderTopWidth: 1,
      borderTopColor: colors.line,
    },
  });
}
