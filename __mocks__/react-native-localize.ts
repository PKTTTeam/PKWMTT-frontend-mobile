export const getLocales = () => [
  {
    countryCode: 'PL',
    languageTag: 'pl-PL',
    languageCode: 'pl',
    isRTL: false,
  },
];

export const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

export const getCalendar = () => 'gregorian';
export const getCountry = () => 'PL';
export const getTimeZone = () => 'Europe/Warsaw';
export const uses24HourClock = () => true;
export const usesMetricSystem = () => true;
export const findBestAvailableLanguage = () => ({
  languageTag: 'pl-PL',
  isRTL: false,
});
