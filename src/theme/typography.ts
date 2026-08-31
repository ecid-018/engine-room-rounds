import { Platform } from 'react-native';

export const monospace = Platform.select({
  ios: 'Courier',
  android: 'monospace',
  default: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
});

export const typography = {
  monospace,
  title: { fontSize: 17, fontWeight: '600' as const },
  subtitle: { fontSize: 12 },
  label: { fontSize: 10 },
  body: { fontSize: 14 },
  small: { fontSize: 12 },
  tiny: { fontSize: 10 },
};
