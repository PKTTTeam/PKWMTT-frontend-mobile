import { createTheme } from '@shopify/restyle';
// import colors from './stylesDefinitions/colors';
const activityLegend = {
  lecture: '#e35c22',
  excercise: '#82d32e',
  laboratory: '#3abee5',
  computerLaboratory: '#cf2eee',
  project: '#d22e2e',
  seminar: '#aaaa14',
  other: '#6e6e6e',
};

const palette = {

};

export const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  textVariants: {
  },
  activityLegend: { ...activityLegend },
  breakpoints: {},
});

export type Theme = typeof theme;
