import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarEventsModal, {
  Event,
} from '../../../components/modals/CalendarEventsModal';
import CreateExamModal from '../../../components/modals/ExamFormModal';
import {
  deleteExam,
  getExamsByGroup,
  getExamTypes,
} from '../../../services/calendar/CalendarService';
import { useSettingsStore } from '../../../store/settingsStore';
import { getExamColor } from '../../../utils/getExamColor';
import '../../../translation/CalendarLocale';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [examModalVisible, setExamModalVisible] = useState(false);
  const [examTypes, setExamTypes] = useState<string[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editingExam, setEditingExam] = useState<Event | null>(null);

  const dgroup = useSettingsStore(state => state.groups.dean);
  const kgroup = useSettingsStore(state => state.groups?.comp);
  const lgroup = useSettingsStore(state => state.groups?.lab);
  const pgroup = useSettingsStore(state => state.groups?.proj);

  const fetchExams = async () => {
    try {
      const exams = await getExamsByGroup();
      const mapped = exams.reduce<Record<string, Event[]>>((acc, exam) => {
        const examDateObj = new Date(exam.date);
        const examDate = examDateObj.toISOString().split('T')[0];
        const examTime = examDateObj.toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        if (!acc[examDate]) acc[examDate] = [];
        acc[examDate].push({
          id: String(exam.examId),
          description: exam.description,
          title: exam.title,
          time: examTime,
          color: getExamColor(exam.examType),
          examType: exam.examType,
        });
        return acc;
      }, {});
      setEvents(mapped);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  useEffect(() => {
    if (dgroup) fetchExams();
  }, [dgroup, kgroup, lgroup, pgroup, examModalVisible]);

  useEffect(() => {
    const fetchExamTypes = async () => {
      const types = await getExamTypes();
      setExamTypes(types.map(t => t.name));
    };
    fetchExamTypes();
  }, []);

  const handleDayPress = (date: { dateString: string }) => {
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <Calendar
          firstDay={1}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ borderRadius: 12 }}
          theme={{
            backgroundColor: '#1e1f1f',
            calendarBackground: '#1e1f1f',
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
          onDayPress={handleDayPress}
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
      </View>

      <CalendarEventsModal
        visible={!!selectedDate}
        onClose={() => setSelectedDate('')}
        selectedDate={selectedDate}
        events={events[selectedDate] || []}
        onAdd={() => {
          setIsUpdate(false);
          setEditingExam(null);
          setExamModalVisible(true);
        }}
        onDelete={async id => {
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
        onUpdate={exam => {
          setIsUpdate(true);
          setEditingExam(exam);
          setExamModalVisible(true);
        }}
      />

      <CreateExamModal
        visible={examModalVisible}
        onClose={() => setExamModalVisible(false)}
        examTypes={examTypes}
        date={selectedDate}
        onCreated={fetchExams}
        updateForm={isUpdate}
        exam={editingExam}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 8,
  },
  calendarWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
});
