import { createTheme } from '@shopify/restyle';
import spacing from "./stylesDefinitions/spacing"
import palette from "./stylesDefinitions/basePalette"
import objects from "./stylesDefinitions/objects"

const activityLegend = {
  lecture: '#e35c22',
  excercise: '#82d32e',
  laboratory: '#3abee5',
  computerLaboratory: '#cf2eee',
  project: '#d22e2e',
  seminar: '#aaaa14',
  other: '#6e6e6e',
};

export const theme = createTheme({
  objects,
  spacing,
  palette,
  activityLegend,
  borderRads: {
    s: 4,
    m: 8,
    l: 16,
  },
  colors: {
    mainForeground: palette.black,
    mainBackground: palette.darkGray,
    textPrimary: palette.white,
    textSecondary: palette.brightGray,
    error: palette.brightRed,
    border: palette.darkGray2,
    confirmAccent: palette.lightPurple,
    cancelAccent: palette.red
  },
  breakpoints: {},
});


export type Theme = typeof theme;
