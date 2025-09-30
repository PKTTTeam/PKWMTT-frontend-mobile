import { LocaleConfig } from 'react-native-calendars';
import i18next from 'i18next';

export const setCalendarLocale = () => {
  const calendarScreen = i18next.t('calendarScreen', {
    returnObjects: true,
  }) as any;

  LocaleConfig.locales[i18next.language] = {
    monthNames: calendarScreen.monthNames,
    monthNamesShort: calendarScreen.monthNamesShort,
    dayNames: calendarScreen.dayNames,
    dayNamesShort: calendarScreen.dayNamesShort,
    today: calendarScreen.today,
  };

  LocaleConfig.defaultLocale = i18next.language;
};
