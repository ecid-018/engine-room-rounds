import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightPalette, darkPalette, buildTierColors, type ColorPalette } from './palettes';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ColorPalette;
  tierColors: ReturnType<typeof buildTierColors>;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'themeMode';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('light');

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark') setModeState(stored);
    });
  }, []);

  function setMode(next: ThemeMode) {
    setModeState(next);
    AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {});
  }

  function toggleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  const palette = mode === 'dark' ? darkPalette : lightPalette;

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, colors: palette, tierColors: buildTierColors(palette), toggleMode, setMode }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
