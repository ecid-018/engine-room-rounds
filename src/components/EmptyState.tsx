import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl * 2,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.body.fontSize,
    color: colors.textMuted,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.small.fontSize,
    color: colors.textDim,
  },
});
