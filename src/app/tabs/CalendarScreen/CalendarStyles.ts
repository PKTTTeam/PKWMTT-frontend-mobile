import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/globalTheme/theme';

export const createCalendarScreen = (theme: Theme) => {
  const colors = theme.colors;

  const calendarTheme = {
    containerBacgroundColor: colors.Background,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: calendarTheme.containerBacgroundColor,
      padding: 8,
    },
    calendarWrapper: {
      justifyContent: 'center',
      flex: 1,
    },
  });

  return styles;
};

export default createCalendarScreen;
