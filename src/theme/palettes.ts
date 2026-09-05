interface CoreColors {
  navy: string;
  navyDark: string;
  ink: string;
  muted: string;
  textDim: string;
  line: string;
  lineSoft: string;
  bg: string;
  panel: string;
  accent: string;
  rowAlt: string;
  subheadBg: string;
  warnBg: string;
  warnLine: string;
  warnInk: string;
  errBg: string;
  errLine: string;
  errInk: string;
  ok: string;
  okBg: string;
}

function withAliases(base: CoreColors) {
  return {
    ...base,
    // legacy aliases kept so component styles have one place to reference
    textPrimary: base.ink,
    textSecondary: base.ink,
    textMuted: base.muted,
    textFaint: base.muted,
    green: base.ok,
    greenMuted: base.okBg,
    greenText: base.ok,
    red: base.errLine,
    redMuted: base.errBg,
    redText: base.errInk,
    border: base.line,
    borderMuted: base.lineSoft,
    panelAlt: base.panel,
    inactiveBorder: base.line,
    inactiveText: base.muted,
    inactiveBg: base.panel,
  };
}

// Matches the Queen Trader Fuel & Lub Oil Tank Calculator's palette so both
// vessel apps read as one suite in light mode.
const lightBase: CoreColors = {
  navy: '#0b3d5c',
  navyDark: '#072a40',
  ink: '#10202b',
  muted: '#5b6b76',
  textDim: '#8a99a3',
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
};

// A dark-engine-room-friendly companion, built from the same navy/gold/teal
// brand hues (not a return to the old amber industrial theme).
const darkBase: CoreColors = {
  navy: '#0b3d5c',
  navyDark: '#051d2c',
  ink: '#eef2f5',
  muted: '#93a5b3',
  textDim: '#6c8194',
  line: '#234258',
  lineSoft: '#1a3247',
  bg: '#0a1929',
  panel: '#102840',
  accent: '#22a8c9',
  rowAlt: '#0d2135',
  subheadBg: '#16334a',
  warnBg: '#3a2c05',
  warnLine: '#f0b429',
  warnInk: '#f0b429',
  errBg: '#3a1414',
  errLine: '#ef4444',
  errInk: '#f87171',
  ok: '#34d399',
  okBg: '#10301f',
};

export const lightPalette = withAliases(lightBase);
export const darkPalette = withAliases(darkBase);

export type ColorPalette = ReturnType<typeof withAliases>;

export function buildTierColors(palette: ColorPalette): Record<0 | 1 | 2, { border: string; bg: string; text: string; dot: string }> {
  return {
    0: { border: palette.ok, bg: palette.okBg, text: palette.ok, dot: palette.ok },
    1: { border: palette.warnLine, bg: palette.warnBg, text: palette.warnInk, dot: palette.warnLine },
    2: { border: palette.errLine, bg: palette.errBg, text: palette.errInk, dot: palette.errLine },
  };
}
