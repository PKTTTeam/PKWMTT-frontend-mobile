import { createTheme } from '@shopify/restyle';
import spacing from './stylesDefinitions/spacing';
import palette from './stylesDefinitions/basePalette';
import objects from './stylesDefinitions/objects';

const activityLegendColors = {
  lecture: '#e35c22',
  excercise: '#82d32e',
  laboratory: '#3abee5',
  computerLaboratory: '#cf2eee',
  project: '#d22e2e',
  seminar: '#aaaa14',
  other: '#6e6e6e',
};

const baseConfig = {
  objects,
  spacing,
  activityLegendColors,
  borderRads: {
    s: 4,
    m: 8,
    l: 16,
  },
  breakpoints: {},
};

// DARK THEME
export const darkTheme = createTheme({
  ...baseConfig,
  colors: {
    mainForeground: palette.darkColors.white,
    mainBackground: palette.darkColors.darkGray,
    textPrimary: palette.darkColors.white,
    textContrast: palette.darkColors.black,
    textSecondary: palette.darkColors.brightGray,
    error: palette.accentColors.brightRed,
    border: palette.darkColors.darkGray2,
    border2: palette.darkColors.darkGray2,
    confirmAccent: palette.accentColors.lightPurple,
    cancelAccent: palette.accentColors.red,
  },
});

// LIGHT THEME UNFINISHED
export const lightTheme = createTheme({
  ...baseConfig,
  colors: {
    mainForeground: palette.lightColors.white,
    mainBackground: palette.lightColors.white,
    textPrimary: palette.lightColors.black,
    textContrast: palette.lightColors.black,
    textSecondary: palette.darkColors.brightGray,
    error: palette.accentColors.red,
    border: palette.lightColors.mutedTeal,
    border2: palette.lightColors.lightTeal,
    confirmAccent: palette.accentColors.purple,
    cancelAccent: palette.accentColors.red,
    // mainForeground: palette.darkColors.black,
    // mainBackground: palette.darkColors.white,
    // textPrimary: palette.darkColors.black,
    // textContrast: palette.darkColors.black,
    // textSecondary: palette.darkColors.darkGray,
    // error: palette.darkColors.brightRed,
    // border: palette.darkColors.lightGray,
    // confirmAccent: palette.darkColors.lightPurple,
    // cancelAccent: palette.accentColors.red,
  },
});

export type Theme = typeof darkTheme;
