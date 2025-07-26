import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TimetableScreen from './TimetableScreen/TimetableScreen';
import CalendarScreen from './CalendarScreen/CalendarScreen';
import OrganisationScreen from './OrganisationScreen/OrganisationScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: true,
  headerTitle: 'PKWMTT',
  tabBarActiveTintColor: '#8d95fe',
  tabBarInactiveTintColor: 'white',
  tabBarInactiveBackgroundColor: '#161514',
  tabBarActiveBackgroundColor: '#161514',

  headerStyle: {
    backgroundColor: '#181818',
    height: 160,
  },

  headerTitleStyle: {
    color: '#FFFFFF',
  },

  tabBarStyle: {
    height: 100,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontFamily: 'InterMedium',
    marginBottom: 4,
  },
  tabBarIconStyle: {
    marginTop: 10,
  },
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Rozkład zajęć"
        component={TimetableScreen}
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
        name="Organizacja Roku"
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
