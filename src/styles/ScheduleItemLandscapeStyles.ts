import { StyleSheet } from 'react-native';
import { Theme } from '../../src/styles/globalTheme/theme';
import { ICON_SIZE, ICON_RADIUS } from '../constants/constants';

export const createScheduleItemStyles = (theme: Theme) => {
  const colors = {
    foreground: theme.colors.Foreground,
    textPrimary: theme.colors.textPrimary,
  };

  return StyleSheet.create({
    ScreenContainer: {
      height: 70,
      flexDirection: 'row',
      backgroundColor: colors.foreground,
      padding: 6,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: 2,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row', 
      justifyContent: 'space-between',
      height: '100%',
      paddingHorizontal: 6,
    },
    leftColumn: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    rightColumn: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start', 
      paddingTop: 10, 
    },
    icon: {
      width: ICON_SIZE / 2,
      height: ICON_SIZE / 2,
      borderRadius: ICON_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default createScheduleItemStyles;
