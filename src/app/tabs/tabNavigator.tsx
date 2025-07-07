import { View, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timetable from './timetable/timetable';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

function CalendarScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calendar Screen</Text>
    </View>
  );
}
function OrganisationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Org Screen</Text>
    </View>
  );
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: true,
    headerTitle: 'PKWMTT',
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Rozklad zajęć" component={Timetable} />
      <Tab.Screen name="Kalendarz" component={CalendarScreen} />
      <Tab.Screen name="Orgzaniacja roku" component={OrganisationScreen} />
      <Tab.Screen name="Ustawienia" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
