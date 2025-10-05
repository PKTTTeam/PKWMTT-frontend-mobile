import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import TabNavigator from './src/app/tabs/tabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSettingsStore } from './src/store/settingsStore';
import FirstTimeSetupScreen from './src/app/main/FirstTimeSetupScreen';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import { compareVersions } from './src/utils/compareVersions';
import { getLatestVersion } from './src/services/versionService';
import { getAppVersion } from './src/utils/getAppVersion';
import UpdateAlertModal from './src/components/modals/UpdateAlertModal';
import { ThemeProvider } from '@shopify/restyle';
import { vexo } from 'vexo-analytics';
import { VEXO_KEY } from '@env';

// 🔹 typ dla tras
type RootStackParamList = {
  Settings: undefined;
  Home: undefined;
  Tabs: undefined;
  // dodaj inne ekrany, które masz w TabNavigator
};

const App = () => {
  const isSetupComplete = useSettingsStore(state => state.setupComplete);
  const currentAppTheme = useSettingsStore(state => state.theme);
  const themeMode = useSettingsStore(state => state.themeMode);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');

  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  vexo(VEXO_KEY);

  const handleSetupDone = () => {
    useSettingsStore.getState().setupComplete = true;
  };

  // 🔹 przechodzenie do Settings po zmianie motywu
  useEffect(() => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Settings');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode]);

  // 🔹 sprawdzanie wersji aplikacji
  useEffect(() => {
    i18n.init();

    const checkVersion = async () => {
      try {
        const current = getAppVersion();
        const latest = await getLatestVersion();

        setCurrentVersion(current);
        setLatestVersion(latest);

        if (compareVersions(current, latest) < 0) {
          setUpdateModalVisible(true);
        }
      } catch (err) {
        console.error('Version check failed:', err);
      }
    };

    checkVersion();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <ThemeProvider theme={currentAppTheme}>
          <NavigationContainer ref={navigationRef}>
            {!isSetupComplete ? (
              <FirstTimeSetupScreen onDone={handleSetupDone} />
            ) : (
              <TabNavigator />
            )}
          </NavigationContainer>

          <UpdateAlertModal
            visible={updateModalVisible}
            currentVersion={currentVersion}
            latestVersion={latestVersion}
            onClose={() => setUpdateModalVisible(false)}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
};

export default App;
