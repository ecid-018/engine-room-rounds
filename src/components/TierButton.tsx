import { Pressable, StyleSheet, Text } from 'react-native';
import type { Tier } from '../types/checklist';
import { colors, tierColors, spacing, radius, typography } from '../theme';

interface TierButtonProps {
  text: string;
  tier: Tier;
  selected: boolean;
  onPress?: () => void;
}

export function TierButton({ text, tier, selected, onPress }: TierButtonProps) {
  const active = tierColors[tier];
  const style = selected
    ? { borderColor: active.border, backgroundColor: active.bg }
    : { borderColor: colors.inactiveBorder, backgroundColor: colors.inactiveBg };
  const textColor = selected ? active.text : colors.inactiveText;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && onPress ? styles.pressed : null,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: typography.small.fontSize,
    lineHeight: 16,
    fontWeight: '500',
  },
});
