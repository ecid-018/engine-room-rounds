import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export function SubGroupHeader({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
