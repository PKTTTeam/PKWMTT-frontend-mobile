import React from 'react';
import { render } from '@testing-library/react-native';
import CalendarEventsModal from '../src/components/modals/CalendarEventsModal';

const mockEvents = [
  {
    id: '1',
    title: 'Test Event 1',
    time: '10:00',
    description: '',
    color: '#123456',
    examType: '',
  },
  {
    id: '2',
    title: 'Test Event 2',
    time: '12:00',
    description: '',
    color: '#654321',
    examType: '',
  },
];

const defaultProps = {
  visible: true,
  onClose: jest.fn(),
  onAdd: jest.fn(),
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
};

describe('CalendarEventsModal', () => {
  it('renders "Wybierz datę" when no date is selected', () => {
    const { getByText } = render(
      <CalendarEventsModal {...defaultProps} selectedDate="" events={[]} />,
    );
    expect(getByText('Wybierz datę')).toBeTruthy();
  });

  it('renders formatted date when selectedDate is provided', () => {
    const { getByText } = render(
      <CalendarEventsModal
        {...defaultProps}
        selectedDate="2025-08-27"
        events={[]}
      />,
    );
    expect(getByText('27.08')).toBeTruthy();
  });

  it('renders event list items', () => {
    const { getByText } = render(
      <CalendarEventsModal
        {...defaultProps}
        selectedDate="2025-08-27"
        events={mockEvents}
      />,
    );
    expect(getByText('10:00 Test Event 1')).toBeTruthy();
    expect(getByText('12:00 Test Event 2')).toBeTruthy();
  });

  it('renders "Brak wydarzeń" when no events exist', () => {
    const { getByText } = render(
      <CalendarEventsModal
        {...defaultProps}
        selectedDate="2025-08-27"
        events={[]}
      />,
    );
    expect(getByText('Brak wydarzeń')).toBeTruthy();
  });
});
