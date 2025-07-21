import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
// import TabNavigator from './src/app/tabs/tabNavigator';
import RootNavigator from './src/app/tabs/rootNavigator';

const App = () => {
  return (
    <>
      <NavigationContainer>
        {/* <TabNavigator /> */}
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
