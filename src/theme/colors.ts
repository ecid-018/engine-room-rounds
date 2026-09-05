// Matches the Queen Trader Fuel & Lub Oil Tank Calculator's palette so both
// vessel apps read as one suite.
export const colors = {
  navy: '#0b3d5c',
  navyDark: '#072a40',
  ink: '#10202b',
  muted: '#5b6b76',
  line: '#c9d4dc',
  lineSoft: '#e3eaef',
  bg: '#eef2f5',
  panel: '#ffffff',
  accent: '#0e7490',
  rowAlt: '#f6f9fb',
  subheadBg: '#dbe6ed',

  warnBg: '#fff4d6',
  warnLine: '#d9a400',
  warnInk: '#6b4e00',

  errBg: '#fdeaea',
  errLine: '#c0392b',
  errInk: '#8e2a20',

  ok: '#1c7a4a',
  okBg: '#e5f3ea',

  // legacy aliases kept so existing component styles keep working
  textPrimary: '#10202b',
  textSecondary: '#10202b',
  textMuted: '#5b6b76',
  textFaint: '#5b6b76',
  textDim: '#8a99a3',

  green: '#1c7a4a',
  greenMuted: '#e5f3ea',
  greenText: '#1c7a4a',

  red: '#c0392b',
  redMuted: '#fdeaea',
  redText: '#8e2a20',

  border: '#c9d4dc',
  borderMuted: '#e3eaef',
  panelAlt: '#ffffff',

  inactiveBorder: '#c9d4dc',
  inactiveText: '#5b6b76',
  inactiveBg: '#ffffff',
} as const;

export const tierColors: Record<0 | 1 | 2, { border: string; bg: string; text: string; dot: string }> = {
  0: { border: colors.ok, bg: colors.okBg, text: colors.ok, dot: colors.ok },
  1: { border: colors.warnLine, bg: colors.warnBg, text: colors.warnInk, dot: colors.warnLine },
  2: { border: colors.errLine, bg: colors.errBg, text: colors.errInk, dot: colors.errLine },
};
