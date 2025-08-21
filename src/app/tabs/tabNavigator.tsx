import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TimetableScreen from './TimetableScreen/TimetableScreen';
import CalendarScreen from './CalendarScreen/CalendarScreen';
import CalculatorScreen from './CalculatorScreen/CalculatorScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { HEADER_HEIGHT, TAB_BAR_HEIGHT } from '../../constants/constants';

import HeaderLogo from '../../assets/svg/HeaderLogoWhite.svg';
import { StyleSheet } from 'react-native';
import { ActivityLegend } from '../../components/ActivityLegend';

const Tab = createBottomTabNavigator();

const NavigationStyles = StyleSheet.create({
  HeaderLogo: {
    marginLeft: 15,
  },
});

const getScreenOptions = (insets: any) => ({
  headerShown: true,
  headerTitle: () => (
    <HeaderLogo width={200} height={150} style={NavigationStyles.HeaderLogo} />
  ),
  tabBarActiveTintColor: '#8d95fe',
  tabBarInactiveTintColor: 'white',
  tabBarInactiveBackgroundColor: '#161514',
  tabBarActiveBackgroundColor: '#161514',

  headerStyle: {
    backgroundColor: '#181818',
    height: HEADER_HEIGHT,
    paddingTop: insets.top,
  },

  headerTitleStyle: {
    color: '#FFFFFF',
  },

  tabBarStyle: {
    height: TAB_BAR_HEIGHT + insets.bottom,
    paddingBottom: insets.bottom > 0 ? 10 : 15,
    paddingTop: 10,
    backgroundColor: '#161514',
    borderTopWidth: 0,
  },

  tabBarLabelStyle: {
    fontSize: 10,
    fontFamily: 'InterMedium',
    marginBottom: 4,
  },

  tabBarIconStyle: {
    marginTop: 10,
  },
  headerRight: () => <ActivityLegend />,
});

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
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={getScreenOptions(insets)}>
      <Tab.Screen
        name="Rozkład zajęć"
        component={TimetableScreen}
        options={{
          tabBarIcon: renderTimetableIcon,
        }}
      />
      <Tab.Screen
        name="Kalendarz"
        component={CalendarScreen}
        options={{
          tabBarIcon: renderCalendarIcon,
        }}
      />
      <Tab.Screen
        name="Kalkulator ETCS"
        component={CalculatorScreen}
        options={{
          tabBarIcon: renderCalcIcon,
        }}
      />
      <Tab.Screen
        name="Ustawienia"
        component={SettingsScreen}
        options={{
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
