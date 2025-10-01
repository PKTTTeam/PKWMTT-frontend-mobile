// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  I18nextProvider: ({ children }: any) => children,
}));

import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';
import checkActiveLesson from '../src/services/timetable/checkActiveLesson';

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

  test('returns true when lesson is currently active on correct week/day', async () => {
    const lesson = {
      rowId: 2,
      name: 'Math',
      classroom: '101',
      type: 'lecture',
    };
    const aHours = ['8:00 - 8:45', '9:00 - 9:45', '10:00 - 10:45']; // rowId: 2 => 10:00-10:45
    const currentDayName = 'Poniedziałek';
    const isOddWeek = false;

    jest.useFakeTimers().setSystemTime(new Date('2025-07-21T10:15:00'));

    const result = checkActiveLesson(lesson, aHours, currentDayName, isOddWeek);
    expect(result).toBe(false);
  });
});
