import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/app/tabs/tabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSettingsStore } from './src/store/settingsStore';
import FirstTimeSetupScreen from './src/app/main/FirstTimeSetupScreen';
const App = () => {
  const isSetupComplete = useSettingsStore(state => state.setupComplete);
  const handleSetupDone = () => {
    useSettingsStore.getState().setupComplete;
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isSetupComplete ? (
          <FirstTimeSetupScreen onDone={handleSetupDone} />
        ) : (
          <TabNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
