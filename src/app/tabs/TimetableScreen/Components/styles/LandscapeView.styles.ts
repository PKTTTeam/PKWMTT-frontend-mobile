import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createLandscapeViewStyles = (theme: Theme) =>
  StyleSheet.create({
    mainRow: {
      flexDirection: 'row',
      marginLeft: 12,
      alignItems: 'flex-start', // ensures columns align at top
    },

    weekIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8, // consistent gap before hours start
    },

    weekText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.themeOpposite,
      marginLeft: 5,
    },

    hoursColumn: {
      marginRight: 10,
      marginTop: 5, // baseline top margin
      alignItems: 'center',
    },

    dayColumn: {
      marginRight: 10,
      width: '16%',
      marginTop: 5, // SAME as hoursColumn
      alignItems: 'center',
    },

    hourBlock: {
      width: '100%',
      alignItems: 'stretch',
            gap: 6,
      marginBottom: 6,
    },

    dayTitleLandscape: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.dayTitle,
      textAlign: 'center',
      marginBottom: 8, // match weekIndicator marginBottom
      
    },

    lessonBlock: {
      gap: 6,
      marginBottom: 6,
      width: '100%',
      alignItems: 'stretch',
    },
  });
