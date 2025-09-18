import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarEvents from '../../../components/CalendarEvents';
import {
  deleteExam,
  getExamsByGroup,
  getExamTypes,
} from '../../../services/calendar/CalendarService';
import { useSettingsStore } from '../../../store/settingsStore';
import CreateExamModal from '../../../components/modals/ExamFormModal';

type Event = {
  id: string;
  title: string;
  description: string;
  time: string;
  color: string;
};

// '2025-08-27': [
//   {
//     id: '1',
//     title: 'Zaliczenie Mechaniki Ogólnej',
//     time: '11:00',
//     color: '#227338',
//   },
//   {
//     id: '2',
//     title: 'Egzamin z Sieci Komputerowych',
//     time: '13:00',
//     color: '#a6561e',
//   },
// ],

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [examTypes, setExamTypes] = useState<string[]>([]);
  const [events, setEvents] = useState<Record<string, Event[]>>({});

  const groups = useSettingsStore(state => state.groups.dean);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const exams = await getExamsByGroup(); // backend response

        const mapped: Record<string, Event[]> = exams.reduce(
          (acc: Record<string, Event[]>, exam) => {
            const examDate = exam.date.split('T')[0]; // "YYYY-MM-DD"
            const examTime = exam.date.split('T')[1]?.substring(0, 5) || '';

            if (!acc[examDate]) acc[examDate] = [];
            acc[examDate].push({
              id: String(exam.examId),
              description: exam.description,
              title: exam.title,
              time: examTime,
              color: '#7B79FF', // optional: color by examType
            });

            return acc;
          },
          {},
        );

        setEvents(mapped);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    if (groups) fetchExams();
  }, [groups]);

  useEffect(() => {
    const fetchExamTypes = async () => {
      const types = await getExamTypes();
      setExamTypes(types);
    };
    fetchExamTypes();
  }, []);

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
          onAdd={() => setModalVisible(true)}
          onDelete={async (id: number) => {
            await deleteExam(id);
            setEvents(prev => {
              const updated = { ...prev };
              if (updated[selectedDate]) {
                updated[selectedDate] = updated[selectedDate].filter(
                  e => Number(e.id) !== id,
                );
              }
              return updated;
            });
          }}
        />
      </View>
      <CreateExamModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        examTypes={examTypes}
        date={selectedDate}
      />
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
