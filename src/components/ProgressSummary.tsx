import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { TierCountBadge } from './TierCountBadge';

interface ProgressSummaryProps {
  doneItems: number;
  totalItems: number;
  doneSubchecks: number;
  totalSubchecks: number;
  okCount: number;
  attentionCount: number;
  faultCount: number;
}

export function ProgressSummary({
  doneItems,
  totalItems,
  doneSubchecks,
  totalSubchecks,
  okCount,
  attentionCount,
  faultCount,
}: ProgressSummaryProps) {
  const pct = totalItems > 0 ? (doneItems / totalItems) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.barRow}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.count}>
          {doneItems} / {totalItems} items
        </Text>
      </View>
      <View style={styles.badgeRow}>
        <TierCountBadge ok={okCount} attention={attentionCount} fault={faultCount} compact />
        <Text style={styles.points}>
          {doneSubchecks}/{totalSubchecks} points
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.amber,
    borderRadius: 4,
  },
  count: {
    fontSize: typography.tiny.fontSize,
    color: colors.textMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  points: {
    marginLeft: 'auto',
    fontSize: typography.tiny.fontSize,
    color: colors.textDim,
  },
});
