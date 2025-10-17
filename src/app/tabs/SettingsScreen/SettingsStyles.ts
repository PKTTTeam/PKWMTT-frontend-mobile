import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/globalTheme/theme';

export const createSettingsStyle = (theme: Theme) => {

  const colors = {
    mainBg: theme.colors.Background,
    text: theme.colors.textPrimary,
    settingsBg: theme.colors.settingsBackground,
  }

return StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  container: {
    flex: 1,
    // backgroundColor: '#1f1f1eff',
    backgroundColor: colors.settingsBg,
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
  },
  groupsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  elementsSpacing: {
    marginTop: 10,
  },
  labelText: {
    alignSelf: 'center',
    // color: 'white',
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentGroups: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  notifications: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    flexWrap: 'wrap',
  },
  notificationsMid: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});
}

export default createSettingsStyle;
