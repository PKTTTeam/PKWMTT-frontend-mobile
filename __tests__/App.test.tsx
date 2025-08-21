import React from 'react';
import App from '../App';
import TabNavigator from '../src/app/tabs/tabNavigator';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import checkActiveLesson from '../src/services/timetable/checkActiveLesson';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('basic rendering', () => {
  test('renders App component without crash', () => {
    render(<App />);
  });

  test('TabNavigator contains expected tabs', () => {
    const initialMetrics = {
      frame: { x: 0, y: 0, width: 320, height: 640 },
      insets: { top: 1, left: 0, right: 0, bottom: 0 },
    };

    const { getByText } = render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>,
    );
    expect(getByText('Rozkład zajęć') || getByText('Timetable')).toBeTruthy();
    expect(getByText('Kalendarz') || getByText('Calendar')).toBeTruthy();
    expect(
      getByText('Kalkulator ETCS') || getByText('Calculator ETCS'),
    ).toBeTruthy();
    expect(getByText('Ustawienia') || getByText('Settings')).toBeTruthy();
  });
});

test('returns true when lesson is currently active on correct week/day', () => {
  const lesson = { rowId: 2, name: 'Math', classroom: '101', type: 'lecture' };
  const aHours = ['8:00 - 8:45', '9:00 - 9:45', '10:00 - 10:45']; // rowId: 2 => 10:00-10:45
  const currentDayName = 'Poniedziałek';
  const isOddWeek = false;

  // Mock current time inside time window and correct week
  jest.useFakeTimers().setSystemTime(new Date('2025-07-21T10:15:00'));

  expect(checkActiveLesson(lesson, aHours, currentDayName, isOddWeek)).toBe(
    true,
  );
});
