import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LessonSeparator from './LessonSeparator';
import HourDisplay from '../../../../components/ui/HourDisplay';
import ScheduleItemLandscape from '../../../../components/ScheduleItemLandscape';
import { getFullSchedule } from '../../../../utils/getFullSchedule';
import { getCorrectColor } from '../../../../utils/getCorrectColor';
import getCorrectLetter from '../../../../utils/getCorrectLetter';
import checkActiveLesson from '../../../../services/timetable/checkActiveLesson';
import { TimetableItem } from '../../../../types/global';
import { useTranslation } from 'react-i18next';

const dayNameMap: Record<string, string> = {
  Poniedziałek: 'Monday',
  Wtorek: 'Tuesday',
  Środa: 'Wednesday',
  Czwartek: 'Thursday',
  Piątek: 'Friday',
  Sobota: 'Saturday',
  Niedziela: 'Sunday',
};

interface LandscapeViewProps {
  theme: any;
  styles: any;
  timetable: any[];
  academicHours: string[];
  isOddWeek: boolean;
  setIsOddWeek: React.Dispatch<React.SetStateAction<boolean>>;
}

const LandscapeView: React.FC<LandscapeViewProps> = ({
  theme,
  styles,
  timetable,
  academicHours,
  isOddWeek,
  setIsOddWeek,
}) => {
  const { t } = useTranslation();

  const getWeekTypeText = () => {
    return isOddWeek ? t('oddWeek') : t('evenWeek');
  };

  const renderLesson = (item: TimetableItem, currentDay: string) => {
    const isActive = checkActiveLesson(
      item,
      academicHours,
      currentDay,
      isOddWeek,
    );
    const isEmptySlot = !item.name;
    if (isEmptySlot) {
      return (
        <ScheduleItemLandscape
          subject={''}
          room={undefined}
          bgColor={''}
          type={''}
          letterColor="white"
          isActive={isActive}
        />
      );
    }
    return (
      <ScheduleItemLandscape
        subject={item.name}
        room={item.classroom}
        bgColor={getCorrectColor(getCorrectLetter(item.type))}
        type={getCorrectLetter(item.type)}
        letterColor="white"
        isActive={isActive}
      />
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', marginLeft: 12 }}>
        {/* Hours column */}
        <View style={{ marginRight: 10, marginTop: 10 }}>
          <TouchableOpacity
            style={styles.weekIndicator}
            onPress={() => setIsOddWeek(prev => !prev)}
            hitSlop={15}
          >
            <Icon name={'sync-alt'} size={15} color={theme.colors.themeOpposite} />
            <Text style={styles.weekText}>{getWeekTypeText()}</Text>
          </TouchableOpacity>

          {academicHours.map((hour, index) => {
            const [startTime, endTime] = hour.split('-').map(s => s.trim());
            return (
              <View key={index} style={{ paddingVertical: 3, gap: 5 }}>
                <HourDisplay startTime={startTime} endTime={endTime} isActive={false} />
                {index < academicHours.length - 1 && <LessonSeparator />}
              </View>
            );
          })}
        </View>

        {/* Days columns */}
        {timetable.map(day => {
          const lessons = isOddWeek ? day.odd : day.even;
          const fullLessons = getFullSchedule(academicHours, lessons);
          return (
            <View key={day.name} style={{ marginRight: 10, width: '16%', marginTop: 10 }}>
              <Text style={[styles.dayTitleLandscape, { textAlign: 'center' }]}>
                {t(`dayNames.${dayNameMap[day.name]}`)}
              </Text>
              {fullLessons.map((lesson, index) => (
                <View key={`${lesson.rowId}-${lesson.classroom}`} style={{ paddingVertical: 3, gap: 5 }}>
                  {renderLesson(lesson, day.name)}
                  {index < fullLessons.length - 1 && <LessonSeparator />}
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LandscapeView;
