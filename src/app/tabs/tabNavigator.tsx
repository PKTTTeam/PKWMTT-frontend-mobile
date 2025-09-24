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
import { useTranslation } from 'react-i18next';

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
  tabBarInactiveBackgroundColor: '#181818',
  tabBarActiveBackgroundColor: '#181818',

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
    backgroundColor: '#181818',
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
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={getScreenOptions(insets)}>
      <Tab.Screen
        name={t('timetable')}
        component={TimetableScreen}
        options={{
          tabBarIcon: renderTimetableIcon,
          //eslint-disable-next-line  react/no-unstable-nested-components
          headerRight: () => <ActivityLegend />,
        }}
      />
      <Tab.Screen
        name={t('calendar')}
        component={CalendarScreen}
        options={{
          tabBarIcon: renderCalendarIcon,
        }}
      />
      <Tab.Screen
        name={t('ECTSCalc')}
        component={CalculatorScreen}
        options={{
          tabBarIcon: renderCalcIcon,
        }}
      />
      <Tab.Screen
        name={t('settings')}
        component={SettingsScreen}
        options={{
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
