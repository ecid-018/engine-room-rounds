import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { spacing, typography, radius, useTheme, type ColorPalette } from '../theme';

interface SegmentedSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedSelect({ options, value, onChange }: SegmentedSelectProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(selected ? '' : option)}
            style={[styles.pill, selected ? styles.pillSelected : null]}
          >
            <Text style={[styles.pillText, selected ? styles.pillTextSelected : null]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    pill: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.panel,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: radius.sm,
      paddingVertical: 9,
    },
    pillSelected: {
      backgroundColor: colors.navy,
      borderColor: colors.navy,
    },
    pillText: {
      fontFamily: typography.systemFont,
      fontSize: typography.small.fontSize,
      fontWeight: '600',
      color: colors.ink,
    },
    pillTextSelected: {
      color: '#ffffff',
    },
  });
}
