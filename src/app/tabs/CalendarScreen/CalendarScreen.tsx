import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
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
import { setCalendarLocale } from '../../../utils/setCalendarLocale';
import i18n from '../../../../i18n';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import createCalendarStyles from './CalendarStyles';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [examModalVisible, setExamModalVisible] = useState(false);
  const [examTypes, setExamTypes] = useState<string[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editingExam, setEditingExam] = useState<Event | null>(null);
  const [calendarKey, setCalendarKey] = useState(0);

  const dgroup = useSettingsStore(state => state.groups.dean);
  const kgroup = useSettingsStore(state => state.groups?.comp);
  const lgroup = useSettingsStore(state => state.groups?.lab);
  const pgroup = useSettingsStore(state => state.groups?.proj);

  // style initialization
  const theme = useTheme<Theme>();
  const styles = createCalendarStyles(theme);

  useEffect(() => {
    // apply calendar locale on language change
    setCalendarLocale();
    setCalendarKey(prev => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

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
          key={calendarKey}
          firstDay={1}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ borderRadius: 12 }}
          theme={{
            // must be inline – Calendar theme prop incompatible with custom Theme type
            backgroundColor: theme.colors.Foreground,
            calendarBackground: theme.colors.Foreground,
            textSectionTitleColor: theme.colors.textSecondary,
            selectedDayBackgroundColor: theme.colors.selectedAccent,
            selectedDayTextColor: theme.colors.themeOpposite,
            todayTextColor: theme.colors.selectedAccent,
            dayTextColor: theme.colors.textPrimary,
            textDisabledColor: theme.colors.textDisabled,
            arrowColor: theme.colors.selectedAccent,
            monthTextColor: theme.colors.textPrimary,
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
