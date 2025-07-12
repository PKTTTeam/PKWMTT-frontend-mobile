/**
 * @format
 */

import React from 'react';
import App from '../App';
import TabNavigator from '../src/app/tabs/tabNavigator';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

test('renders without crash', () => {
  render(<App />);
  render(
    <NavigationContainer>
      <TabNavigator />;
    </NavigationContainer>,
  );
});
