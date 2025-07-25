import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/app/tabs/tabNavigator';
const App = () => {
  return (
    <>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
