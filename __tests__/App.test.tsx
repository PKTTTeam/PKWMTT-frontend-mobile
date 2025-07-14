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
  expect(getByText('Rozkład zajęć')).toBeTruthy();
  expect(getByText('Kalendarz')).toBeTruthy();
  expect(getByText('Organizacja Roku')).toBeTruthy();
  expect(getByText('Ustawienia')).toBeTruthy();
});
