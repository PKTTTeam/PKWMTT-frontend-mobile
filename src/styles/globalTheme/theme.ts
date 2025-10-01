import { createTheme } from '@shopify/restyle';
import palette from "./stylesDefinitions/basePalette"
import objects from "./stylesDefinitions/objects"
import spacing from "./stylesDefinitions/spacing"

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
  spacing,
  objects,
  palette,
  colors: {
    mainForeground: palette.black,
    mainBackground: palette.darkGray,
  },
  textVariants: {},
  activityLegend: { ...activityLegend },

  breakpoints: {},
});


export type Theme = typeof theme;
