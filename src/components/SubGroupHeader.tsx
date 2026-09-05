import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography, useTheme, type ColorPalette } from '../theme';

export function SubGroupHeader({ name }: { name: string }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingTop: 6,
      paddingBottom: 6,
      backgroundColor: colors.subheadBg,
    },
    text: {
      fontSize: typography.tiny.fontSize,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      color: colors.navy,
      fontWeight: '700',
    },
  });
}
