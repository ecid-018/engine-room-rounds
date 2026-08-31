import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../theme';

interface TierCountBadgeProps {
  ok: number;
  attention: number;
  fault: number;
  compact?: boolean;
}

export function TierCountBadge({ ok, attention, fault, compact }: TierCountBadgeProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.text, { color: colors.greenText }]}>{ok} OK</Text>
      <Text style={[styles.text, { color: colors.amberText }]}>
        {attention} {compact ? 'attn' : 'attention'}
      </Text>
      <Text style={[styles.text, { color: colors.redText }]}>{fault} fault</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: typography.tiny.fontSize,
  },
});
