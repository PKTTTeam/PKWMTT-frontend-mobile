import { StyleSheet } from 'react-native';
import { Theme } from '../../src/styles/globalTheme/theme';
import { ICON_SIZE, ICON_RADIUS } from '../constants/constants';

export const createScheduleItemStyles = (theme: Theme, isLandscape: boolean = false) => {
  const colors = {
    foreground: theme.colors.Foreground,
    textPrimary: theme.colors.textPrimary,
  };

  const fontSize = isLandscape ? 10 : 16; 

  return StyleSheet.create({
    ScreenContainer: {
      flexDirection: 'row',
      backgroundColor: colors.foreground,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: 4,
    },
    timeAndSubject: {
      flex: 1,
      flexDirection: 'column',
      paddingLeft: 8,
    },
    icon: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      borderRadius: ICON_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    time: {
      color: colors.textPrimary,
      fontSize,
      marginBottom: 4,
    },
    subject: {
      color: colors.textPrimary,
      fontSize,
      fontWeight: '400',
      marginTop: 10,
    },
  });
};

export default createScheduleItemStyles;
