import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/app/tabs/tabNavigator';
import { View } from 'react-native';
const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
