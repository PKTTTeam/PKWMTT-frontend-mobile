import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarEvents from '../../../components/CalendarEvents';
import { getExamsByGroup } from '../../../services/calendar/CalendarService';

type Event = {
  id: string;
  title: string;
  time: string;
  color: string;
};

export default function CalendarScreen() {
  useEffect(() => {
    getExamsByGroup();
  }, []);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events] = useState<Record<string, Event[]>>({
    '2025-08-27': [
      {
        id: '1',
        title: 'Zaliczenie Mechaniki Ogólnej',
        time: '11:00',
        color: '#227338',
      },
      {
        id: '2',
        title: 'Egzamin z Sieci Komputerowych',
        time: '13:00',
        color: '#a6561e',
      },
    ],
  });

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          firstDay={1}
          theme={{
            backgroundColor: '#181818',
            calendarBackground: '#181818',
            textSectionTitleColor: '#A9A9A9',
            selectedDayBackgroundColor: '#7B79FF',
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
            textMonthFontSize: 14,
            textDayHeaderFontSize: 12,
          }}
          markingType={'multi-dot'}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            ...Object.fromEntries(
              Object.entries(events).map(([date, eventList]) => [
                date,
                {
                  dots: eventList.map(e => ({ key: e.id, color: e.color })),
                  selected: date === selectedDate,
                  selectedColor: date === selectedDate ? '#4F46E5' : undefined,
                },
              ]),
            ),
            ...(selectedDate && !events[selectedDate]
              ? {
                  [selectedDate]: {
                    selected: true,
                    selectedColor: '#4F46E5',
                    selectedTextColor: '#ffffff',
                  },
                }
              : {}),
          }}
        />

        <CalendarEvents
          selectedDate={selectedDate}
          events={events[selectedDate] || []}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 16,
  },
  calendarContainer: {
    backgroundColor: '#181818',
    borderRadius: 8,
    marginBottom: 16,
  },
});
