import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography, useTheme, type ColorPalette } from '../theme';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
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
}
