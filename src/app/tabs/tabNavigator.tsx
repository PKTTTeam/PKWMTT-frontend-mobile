import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TimetableScreen from './TimetableScreen/TimetableScreen';
import CalendarScreen from './CalendarScreen/CalendarScreen';
import CalculatorScreen from './CalculatorScreen/CalculatorScreen';
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

const renderTimetableIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="view-list" color={color} size={size} />;

const renderCalendarIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="calendar-month" color={color} size={size} />;

const renderCalcIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="calculate" color={color} size={size} />
);

const renderSettingsIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="settings" color={color} size={size} />;

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Rozkład zajęć"
        component={TimetableScreen}
        options={{ tabBarIcon: renderTimetableIcon }}
      />
      <Tab.Screen
        name="Kalendarz"
        component={CalendarScreen}
        options={{ tabBarIcon: renderCalendarIcon }}
      />
      <Tab.Screen
        name="Kalkulator"
        component={CalculatorScreen}
        options={{ tabBarIcon: renderCalcIcon }}
      />
      <Tab.Screen
        name="Ustawienia"
        component={SettingsScreen}
        options={{ tabBarIcon: renderSettingsIcon }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
