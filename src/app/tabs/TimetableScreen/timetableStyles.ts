import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/globalTheme/theme';

export const createTimetableStyles = (theme: Theme) => {

  const colors = {
    bgColor: theme.colors.Background,
    bgColor2: theme.colors.Foreground, //'#1e1f1f',
    textColor: theme.colors.textPrimary,
    separatorColor: theme.colors.separator,//'#3A3A3A', //light #e8eaed
    btnBg: '#2A2A2A',
    loadingAccent: '#666',
  };

 return  StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgColor2,
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
  },
  weekIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
    alignSelf: 'center',
    padding: 5,
    backgroundColor: colors.btnBg,
    borderRadius: 8,
  },
  weekText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '200',
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navButton: {
    backgroundColor: colors.btnBg,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  navButtonText: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayTitle: {
    color: '#e5e5ff',
    fontSize: 30,
    fontFamily: 'InterSemiBold',
    textAlign: 'center',
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.separatorColor, // subtle dark gray line
    marginVertical: 0,
    opacity: 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.loadingAccent,
    textAlign: 'center',
  },

  // Required filters block
  requiredFiltersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  warningIcon: {
    marginBottom: 20,
  },
  requiredFiltersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  requiredFiltersText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  missingFiltersList: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  missingFilterItem: {
    fontSize: 16,
    color: '#ff9500',
    fontWeight: '500',
    marginBottom: 5,
  },
  requiredFiltersSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
}