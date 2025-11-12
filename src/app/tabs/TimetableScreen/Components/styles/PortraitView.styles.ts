import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createPortraitViewStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.Foreground,
      padding: 16,
      marginHorizontal: 6,
      borderRadius: 8,
    },
    navigationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    navButton: {
      backgroundColor: theme.colors.navButton,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      minWidth: 44,
      alignItems: 'center',
    },
    dayTitle: {
      color: theme.colors.dayTitle,
      fontSize: 30,
      fontFamily: 'InterSemiBold',
      textAlign: 'center',
      flex: 1,
    },
    weekIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      columnGap: 5,
      padding: 5,
      backgroundColor: theme.colors.navButton,
      borderRadius: 8,
    },
    weekText: {
      color: theme.colors.themeOpposite,
      fontSize: 12,
      fontWeight: '200',
    },
    listContainer: {
      paddingBottom: 10,
    },
  });
};
