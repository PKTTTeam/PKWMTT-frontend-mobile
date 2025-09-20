import React from 'react';
import App from '../App';
import TabNavigator from '../src/app/tabs/tabNavigator';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import checkActiveLesson from '../src/services/timetable/checkActiveLesson';
import { SafeAreaProvider } from 'react-native-safe-area-context';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('basic rendering', () => {
  test('renders App component without crash', async () => {
    render(<App />);
  });

  test('TabNavigator contains expected tabs', async () => {
    const initialMetrics = {
      frame: { x: 0, y: 0, width: 320, height: 640 },
      insets: { top: 1, left: 0, right: 0, bottom: 0 },
    };

    const { queryByText } = render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>,
    );

    expect(
      queryByText('Rozkład zajęć') || queryByText('Timetable'),
    ).toBeTruthy();
    expect(queryByText('Kalendarz') || queryByText('Calendar')).toBeTruthy();
    expect(
      queryByText('Kalkulator ETCS') || queryByText('Calculator ETCS'),
    ).toBeTruthy();
    expect(queryByText('Ustawienia') || queryByText('Settings')).toBeTruthy();
  });
});

test('returns true when lesson is currently active on correct week/day', async () => {
  const lesson = { rowId: 2, name: 'Math', classroom: '101', type: 'lecture' };
  const aHours = ['8:00 - 8:45', '9:00 - 9:45', '10:00 - 10:45']; // rowId: 2 => 10:00-10:45
  const currentDayName = 'Poniedziałek';
  const isOddWeek = false;

  // Mock current time inside time window and correct week
  jest.useFakeTimers().setSystemTime(new Date('2025-07-21T10:15:00'));

  const result = checkActiveLesson(lesson, aHours, currentDayName, isOddWeek);
  expect(result).toBe(true);
});
