import Icon from 'react-native-vector-icons/MaterialIcons';

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
    tabBarActiveTintColor: '#8d95fe',
    tabBarInactiveTintColor: 'white',
    tabBarInactiveBackgroundColor: '#161514',
    tabBarActiveBackgroundColor: '#161514',

    tabBarStyle: {
      height: 100,
    },
    tabBarLabelStyle: {
      fontSize: 10,
      fontFamily: 'Inter_18pt-Thin',
      marginBottom: 4,
    },
    tabBarIconStyle: {
      marginTop: 4,
    },
  };
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Rozklad zajęć"
        component={Timetable}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Kalendarz"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-month" color={color} size={size} />
          ),
        }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Orgzaniacja roku"
        component={OrganisationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="school" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ustawienia"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
