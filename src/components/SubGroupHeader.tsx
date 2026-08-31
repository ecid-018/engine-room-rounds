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
    paddingTop: spacing.sm,
    paddingBottom: 4,
    backgroundColor: colors.panelAlt,
  },
  text: {
    fontSize: typography.tiny.fontSize,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.amberText,
    fontWeight: '600',
  },
});
