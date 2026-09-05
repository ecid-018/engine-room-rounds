import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { Checkpoint, Tier } from '../types/checklist';
import { itemWorstTier } from '../utils/grouping';
import { spacing, typography, radius, useTheme, type ColorPalette } from '../theme';
import { SubCheckRow } from './SubCheckRow';

interface CheckpointRowProps {
  item: Checkpoint;
  status: Record<string, Tier>;
  onSelectTier?: (checkpointId: string, subIndex: number, tier: Tier) => void;
  remark: string | undefined;
  readOnly: boolean;
  remarkOpen?: boolean;
  onToggleRemark?: (checkpointId: string) => void;
  onChangeRemark?: (checkpointId: string, text: string) => void;
}

export function CheckpointRow({
  item,
  status,
  onSelectTier,
  remark,
  readOnly,
  remarkOpen,
  onToggleRemark,
  onChangeRemark,
}: CheckpointRowProps) {
  const { colors, tierColors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const worst = itemWorstTier(item, status);
  const dotColor = worst === 2 ? tierColors[2].dot : worst === 1 ? tierColors[1].dot : null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={styles.id}>{item.id}</Text>
          <Text style={styles.name}>{item.checkpoint}</Text>
          {dotColor ? <View style={[styles.dot, { backgroundColor: dotColor }]} /> : null}
        </View>
        {!readOnly ? (
          <Pressable onPress={() => onToggleRemark?.(item.id)} style={styles.noteButton}>
            <Text style={[styles.noteText, remark ? styles.noteTextActive : null]}>note</Text>
          </Pressable>
        ) : null}
      </View>

      <View>
        {item.subchecks.map((sc, subIndex) => (
          <SubCheckRow
            key={subIndex}
            checkpointId={item.id}
            subIndex={subIndex}
            subcheck={sc}
            status={status}
            onSelectTier={onSelectTier}
          />
        ))}
      </View>

      {!readOnly && remarkOpen ? (
        <TextInput
          autoFocus
          multiline
          numberOfLines={2}
          value={remark ?? ''}
          onChangeText={(text) => onChangeRemark?.(item.id, text)}
          placeholder="Remarks..."
          placeholderTextColor={colors.textDim}
          style={styles.remarkInput}
        />
      ) : null}

      {readOnly && remark ? (
        <View style={styles.remarkReadOnly}>
          <Text style={styles.remarkReadOnlyText}>{remark}</Text>
        </View>
      ) : null}
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: colors.lineSoft,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    titleWrap: {
      flexDirection: 'row',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      flexShrink: 1,
      gap: spacing.xs,
    },
    id: {
      fontSize: typography.tiny.fontSize,
      color: colors.textDim,
      fontVariant: ['tabular-nums'],
    },
    name: {
      fontSize: typography.body.fontSize,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    noteButton: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    noteText: {
      fontSize: typography.tiny.fontSize,
      color: colors.textDim,
    },
    noteTextActive: {
      color: colors.accent,
      borderColor: colors.accent,
    },
    remarkInput: {
      marginTop: spacing.sm,
      backgroundColor: colors.panel,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: 6,
      fontSize: typography.small.fontSize,
      color: colors.ink,
      minHeight: 44,
      textAlignVertical: 'top',
    },
    remarkReadOnly: {
      marginTop: spacing.sm,
      backgroundColor: colors.rowAlt,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.line,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: 6,
    },
    remarkReadOnlyText: {
      fontSize: typography.small.fontSize,
      color: colors.textMuted,
    },
  });
}
