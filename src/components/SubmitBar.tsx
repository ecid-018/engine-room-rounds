import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { spacing, typography, radius, useTheme, type ColorPalette } from '../theme';

interface SubmitBarProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  helperText?: string;
}

export function SubmitBar({ label, onPress, disabled, helperText }: SubmitBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        style={({ pressed }) => [
          styles.button,
          disabled ? styles.buttonDisabled : null,
          pressed && !disabled ? styles.buttonPressed : null,
        ]}
      >
        <Text style={[styles.buttonText, disabled ? styles.buttonTextDisabled : null]}>{label}</Text>
      </Pressable>
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
      backgroundColor: colors.bg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    button: {
      backgroundColor: colors.navy,
      borderRadius: radius.md,
      paddingVertical: 14,
      alignItems: 'center',
    },
    buttonPressed: {
      backgroundColor: colors.navyDark,
    },
    buttonDisabled: {
      backgroundColor: colors.panel,
      borderWidth: 1,
      borderColor: colors.line,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: typography.body.fontSize,
      fontWeight: '700',
    },
    buttonTextDisabled: {
      color: colors.muted,
    },
    helper: {
      marginTop: spacing.xs,
      textAlign: 'center',
      fontSize: typography.tiny.fontSize,
      color: colors.muted,
    },
  });
}
