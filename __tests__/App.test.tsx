import React from 'react';
import App from '../App';
import TabNavigator from '../src/app/tabs/tabNavigator';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

test('renders App component without crash', () => {
  render(<App />);
});

test('TabNavigator contains expected tabs', () => {
  const { getByText } = render(
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>,
  );
  expect(getByText('Rozkład zajęć') || getByText('Timetable')).toBeTruthy();
  expect(getByText('Kalendarz') || getByText('Calendar')).toBeTruthy();
  expect(
    getByText('Kalkulator ETCS') || getByText('Calculator ETCS'),
  ).toBeTruthy();
  expect(getByText('Ustawienia') || getByText('Settings')).toBeTruthy();
});
