export const colors = {
  bg: '#020617',
  panel: '#0f172a',
  panelAlt: 'rgba(15, 23, 42, 0.4)',
  border: '#1e293b',
  borderMuted: 'rgba(30, 41, 59, 0.7)',

  textPrimary: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textFaint: '#64748b',
  textDim: '#475569',

  amber: '#f59e0b',
  amberMuted: 'rgba(245, 158, 11, 0.2)',
  amberText: '#fbbf24',

  green: '#10b981',
  greenMuted: 'rgba(16, 185, 129, 0.2)',
  greenText: '#34d399',

  red: '#f43f5e',
  redMuted: 'rgba(244, 63, 94, 0.2)',
  redText: '#fb7185',

  inactiveBorder: '#334155',
  inactiveText: '#94a3b8',
  inactiveBg: 'rgba(15, 23, 42, 0.4)',
} as const;

export const tierColors: Record<0 | 1 | 2, { border: string; bg: string; text: string; dot: string }> = {
  0: { border: colors.green, bg: colors.greenMuted, text: colors.greenText, dot: colors.green },
  1: { border: colors.amber, bg: colors.amberMuted, text: colors.amberText, dot: colors.amber },
  2: { border: colors.red, bg: colors.redMuted, text: colors.redText, dot: colors.red },
};
