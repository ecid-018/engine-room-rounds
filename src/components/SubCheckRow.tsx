import { StyleSheet, Text, View } from 'react-native';
import type { SubCheck, Tier } from '../types/checklist';
import { statusKey } from '../utils/grouping';
import { colors, spacing, typography } from '../theme';
import { TierButton } from './TierButton';

interface SubCheckRowProps {
  checkpointId: string;
  subIndex: number;
  subcheck: SubCheck;
  status: Record<string, Tier>;
  onSelectTier?: (checkpointId: string, subIndex: number, tier: Tier) => void;
}

export function SubCheckRow({ checkpointId, subIndex, subcheck, status, onSelectTier }: SubCheckRowProps) {
  const selectedTier = status[statusKey(checkpointId, subIndex)];

  return (
    <View style={styles.container}>
      {subcheck.label ? <Text style={styles.label}>{subcheck.label}</Text> : null}
      <View style={styles.row}>
        {subcheck.tickers.map((text, tierIndex) => {
          const tier = tierIndex as Tier;
          return (
            <TierButton
              key={tierIndex}
              text={text}
              tier={tier}
              selected={selectedTier === tier}
              onPress={onSelectTier ? () => onSelectTier(checkpointId, subIndex, tier) : undefined}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xs,
  },
  label: {
    fontSize: typography.label.fontSize,
    color: colors.textFaint,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
