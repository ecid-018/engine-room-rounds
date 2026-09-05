import { useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { spacing, typography, radius, useTheme, type ColorPalette } from '../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Search checkpoint or area..."
      placeholderTextColor={colors.textDim}
      style={styles.input}
    />
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    input: {
      marginTop: spacing.md,
      backgroundColor: colors.panel,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 10,
      fontSize: typography.body.fontSize,
      color: colors.textSecondary,
    },
  });
}
