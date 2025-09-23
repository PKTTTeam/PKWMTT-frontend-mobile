import React from 'react';
import { render } from '@testing-library/react-native';
import CalendarEvents from '../src/components/modals/CalendarEventsModal';

const mockEvents = [
  { id: '1', title: 'Test Event 1', time: '10:00', color: '#123456' },
  { id: '2', title: 'Test Event 2', time: '12:00', color: '#654321' },
];

describe('CalendarEvents', () => {
  it('renders "Wybierz datę" when no date is selected', () => {
    const { getByText } = render(
      <CalendarEvents selectedDate="" events={[]} />,
    );
    expect(getByText('Wybierz datę')).toBeTruthy();
  });

  it('renders formatted date when selectedDate is provided', () => {
    const { getByText } = render(
      <CalendarEvents selectedDate="2025-08-27" events={[]} />,
    );
    expect(getByText('27.08')).toBeTruthy();
  });

  it('renders event list items', () => {
    const { getByText } = render(
      <CalendarEvents selectedDate="2025-08-27" events={mockEvents} />,
    );
    expect(getByText('10:00 Test Event 1')).toBeTruthy();
    expect(getByText('12:00 Test Event 2')).toBeTruthy();
  });

  it('renders "Brak wydarzeń" when no events exist', () => {
    const { getByText } = render(
      <CalendarEvents selectedDate="2025-08-27" events={[]} />,
    );
    expect(getByText('Brak wydarzeń')).toBeTruthy();
  });
});
