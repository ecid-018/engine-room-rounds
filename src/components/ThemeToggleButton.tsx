import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme';

export function ThemeToggleButton() {
  const { mode, toggleMode } = useTheme();
  return (
    <Pressable onPress={toggleMode} style={styles.button} hitSlop={10}>
      <Text style={styles.icon}>{mode === 'dark' ? '☀️' : '🌙'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  icon: {
    fontSize: 18,
  },
});
