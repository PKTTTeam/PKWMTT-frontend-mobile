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
    mainForeground: palette.white,
    mainBackground: palette.darkGray,
    textPrimary: palette.white,
    textContrast: palette.black,
    textSecondary: palette.brightGray,
    error: palette.brightRed,
    border: palette.darkGray2,
    confirmAccent: palette.lightPurple,
    cancelAccent: palette.red,
  },
});

// LIGHT THEME UNFINISHED
export const lightTheme = createTheme({
  ...baseConfig,
  colors: {
    mainForeground: palette.white,
    mainBackground: palette.white,
    textPrimary: palette.red,
    textContrast: palette.red,
    textSecondary: palette.red,
    error: palette.red,
    border: palette.red,
    confirmAccent: palette.red,
    cancelAccent: palette.red,
    // mainForeground: palette.black,
    // mainBackground: palette.white,
    // textPrimary: palette.black,
    // textContrast: palette.black,
    // textSecondary: palette.darkGray,
    // error: palette.brightRed,
    // border: palette.lightGray,
    // confirmAccent: palette.lightPurple,
    // cancelAccent: palette.red,
  },
});

export type Theme = typeof darkTheme;
