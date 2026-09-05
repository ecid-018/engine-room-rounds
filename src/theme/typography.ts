export const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const typography = {
  systemFont,
  title: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 0.2 },
  sheetTitle: { fontSize: 13, fontWeight: '700' as const, letterSpacing: 0.9 },
  subtitle: { fontSize: 11 },
  label: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.5 },
  body: { fontSize: 14 },
  small: { fontSize: 12.5 },
  tiny: { fontSize: 10.5 },
};
