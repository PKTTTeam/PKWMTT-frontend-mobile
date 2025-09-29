import { NavigationContainer } from '@react-navigation/native';
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

import { vexo } from 'vexo-analytics';
import { VEXO_KEY } from '@env';

const App = () => {
  const isSetupComplete = useSettingsStore(state => state.setupComplete);
  vexo(VEXO_KEY);
  const handleSetupDone = () => {
    useSettingsStore.getState().setupComplete = true;
  };

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    i18n.init();
  }, []);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const current = getAppVersion();
        const latest = await getLatestVersion();

        setCurrentVersion(current);
        setLatestVersion(latest);

        if (compareVersions(currentVersion, latestVersion) < 0) {
          setUpdateModalVisible(true);
        }
      } catch (err) {
        console.error('Version check failed:', err);
      }
    };

    checkVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <NavigationContainer>
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
      </SafeAreaProvider>
    </I18nextProvider>
  );
};

export default App;
