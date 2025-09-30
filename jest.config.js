module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|react-native-vector-icons|react-native-switch-toggle|react-native-calendars|react-native-swipe-gestures|@react-native-community/datetimepicker|react-native-toast-message|react-native-dropdown-picker)/)',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    '^react-i18next$': '<rootDir>/__mocks__/react-i18next.ts',
    '^react-native-localize$': '<rootDir>/__mocks__/react-native-localize.ts',
    '^.+/i18n$': '<rootDir>/__mocks__/i18n.ts',
    '^react-native-device-info$':
      '<rootDir>/__mocks__/react-native-device-info.ts',
    '^vexo-analytics$': '<rootDir>/__mocks__/vexo-analytics.ts',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
