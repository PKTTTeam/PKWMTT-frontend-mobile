import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HEADER_HEIGHT, TAB_BAR_HEIGHT } from '../../constants/constants';
import HeaderLogo from '../../assets/svg/HeaderLogoWhite.svg';
import { StyleSheet } from 'react-native';

import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import TabNavigator from './tabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    const checkWelcome = async () => {
      const value = await AsyncStorage.getItem('hasSeenWelcome');
      setHasSeenWelcome(value === 'true');
      setLoading(false);
    };
    checkWelcome();
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions, 
        // headerShown: !hasSeenWelcome
      }}
      initialRouteName={hasSeenWelcome ? 'Tabs' : 'Welcome'}
    >
      <Stack.Screen name="Welcome" options={{ headerShown: true }} component={WelcomeScreen} />
      <Stack.Screen name="Tabs" options={{ headerShown: false }} component={TabNavigator} />
    </Stack.Navigator>
  );
};

const NavigationStyles = StyleSheet.create({
  HeaderLogoCenter: {
    alignSelf: 'center',
  },
});

const screenOptions = {
  headerTitle: () => (
    <HeaderLogo width={200*1.3} height={150*1.3} style={NavigationStyles.HeaderLogoCenter} />
  ),
  tabBarActiveTintColor: '#8d95fe',
  tabBarInactiveTintColor: 'white',
  tabBarInactiveBackgroundColor: '#161514',
  tabBarActiveBackgroundColor: '#161514',

  headerStyle: {
    backgroundColor: '#181818',
    height: HEADER_HEIGHT,
  },

  headerTitleStyle: {
    color: '#FFFFFF',
  },

  tabBarStyle: {
    height: TAB_BAR_HEIGHT,
  },

  tabBarLabelStyle: {
    fontSize: 10,
    fontFamily: 'InterMedium',
    marginBottom: 4,
  },

  tabBarIconStyle: {
    marginTop: 10,
  },
  // headerRight: () => <ActivityLegend />,
};

export default RootNavigator;
