import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/tabs/rootNavigator';
const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
