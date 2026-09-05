import { typography, systemFont } from './typography';
import { spacing, radius } from './spacing';

export const theme = { typography, systemFont, spacing, radius };
export { typography, systemFont, spacing, radius };
export { useTheme, ThemeProvider } from './ThemeContext';
export type { ThemeMode } from './ThemeContext';
export type { ColorPalette } from './palettes';
