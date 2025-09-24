import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/app/tabs/tabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSettingsStore } from './src/store/settingsStore';
import FirstTimeSetupScreen from './src/app/main/FirstTimeSetupScreen';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';

const App = () => {
  const isSetupComplete = useSettingsStore(state => state.setupComplete);
  const handleSetupDone = () => {
    useSettingsStore.getState().setupComplete;
  };

  useEffect(() => {
    i18n.init();
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
      </SafeAreaProvider>
    </I18nextProvider>
  );
};

export default App;
