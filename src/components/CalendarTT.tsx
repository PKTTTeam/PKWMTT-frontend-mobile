import { Calendar } from 'react-native-calendars';
const CalendarTT = () => {
  return (
    <Calendar
      // Month selector style is not built-in, so you'll handle this outside the Calendar or use custom header

      theme={{
        backgroundColor: '#121212', // dark background
        calendarBackground: '#121212',
        textSectionTitleColor: '#A9A9A9', // color for day labels (Pn, Wt, etc)
        selectedDayBackgroundColor: '#7B79FF', // light purple for selected day circle
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#7B79FF',
        dayTextColor: '#FFFFFF',
        textDisabledColor: '#555555',
        arrowColor: '#7B79FF',
        monthTextColor: '#FFFFFF',
        textDayFontWeight: '400',
        textMonthFontWeight: '600',
        textDayHeaderFontWeight: '600',
        textDayFontSize: 14,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
      }}
      // markingType='multi-dot' can be used to display dots in different colors below days
      markingType={'multi-dot'}
      markedDates={{
        '2025-01-15': {
          selected: true,
          selectedColor: '#7B79FF',
          dots: [
            { key: 'work', color: '#4CAF50' }, // green dot
            { key: 'exam', color: '#FF5722' }, // orange/red dot
          ],
        },
        '2025-01-20': {
          dots: [
            { key: 'work', color: '#4CAF50' },
            { key: 'exam', color: '#FF5722' },
          ],
        },
      }}
      firstDay={1}
    />
  );
};

export default CalendarTT;
