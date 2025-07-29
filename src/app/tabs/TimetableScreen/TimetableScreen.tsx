import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';
import { DaySchedule, TimetableItem } from '../../../types/global';
import {
  getAcademicHours,
  getTimetableByGroup,
} from '../../../services/TimetableService';
import { getCorrectColor } from '../../../utils/getCorrectColor';
import getCorrectLetter from '../../../utils/getCorrectLetter';
import checkActiveLesson from '../../../utils/checkActiveLesson';
import getCurrentWeekType from '../../../utils/getCurrentWeekType';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LessonSeparator = () => {
  return <View style={styles.separator} />;
};

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<DaySchedule[]>([]);
  const [aHours, setAHours] = useState<string[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isOddWeek, setIsOddWeek] = useState(true);

  // Static for early dev
  const groupName = '12K1';
  const filters = { k: 'K01', l: 'L01', p: 'P01' };

  useEffect(() => {
    async function initialiseData() {
      try {
        const [hours, timetableResponse] = await Promise.all([
          getAcademicHours(),
          getTimetableByGroup(groupName, filters.k, filters.l, filters.p),
        ]);

        setAHours(hours);
        setTimetable(timetableResponse.data);

        setIsOddWeek(getCurrentWeekType());
        console.log(isOddWeek);
        const today = new Date();
        const jsDay = today.getDay();
        const index = jsDay === 0 || jsDay === 6 ? 0 : jsDay - 1;
        setCurrentDayIndex(index);
      } catch (err: any) {
        if (err.response) {
          // Server responded with a status outside 2xx
          console.error('📡 Server responded with error:', {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers,
          });
        } else if (err.request) {
          // Request was made but no response received
          console.error('No response received from server:', err.request);
        } else {
          // Something else went wrong
          console.error('Error setting up request:', err.message);
        }

        // Log full error for debugging
        console.error('Full error object:', err);
      }
    }
    initialiseData();
  }, [filters.k, filters.l, filters.p, isOddWeek]);

  const navigateToNextDay = () => {
    if (currentDayIndex < timetable.length - 1) {
      // Normal navigation within the week
      setCurrentDayIndex(prev => prev + 1);
    } else if (currentDayIndex === timetable.length - 1) {
      // At the last day (Friday), switch to next week and go to first day
      setIsOddWeek(prev => !prev);
      setCurrentDayIndex(0);
    }
  };

  const navigateToPrevDay = () => {
    if (currentDayIndex > 0) {
      // Normal navigation within the week
      setCurrentDayIndex(prev => prev - 1);
    } else if (currentDayIndex === 0) {
      // At the first day (Monday), switch to previous week and go to last day
      setIsOddWeek(prev => !prev);
      setCurrentDayIndex(timetable.length - 1);
    }
  };

  const renderLesson = ({ item }: { item: TimetableItem }) => {
    if (!item || typeof item.rowId !== 'number') {
      console.warn('Invalid lesson item:', item);
      return null;
    }

    if (!aHours || aHours.length === 0) {
      console.warn('aHours is not ready yet');
      return null;
    }

    const hourString = aHours[item.rowId];
    if (!hourString) {
      console.warn(`No hour found for rowId ${item.rowId}`);
    }

    const [startTime = '??', endTime = '??'] =
      hourString?.split('-').map(s => s.trim()) ?? [];

    const isActive = checkActiveLesson(
      item,
      aHours,
      timetable[currentDayIndex]?.name,
      isOddWeek,
    );
    return (
      <>
        <ScheduleItem
          subject={item.name}
          startTime={startTime}
          endTime={endTime}
          room={item.classroom}
          bgColor={getCorrectColor(getCorrectLetter(item.type))}
          type={getCorrectLetter(item.type)}
          letterColor="white"
          isActive={isActive}
        />
      </>
    );
  };

  const getCurrentDayData = () => {
    const currentDay = timetable[currentDayIndex];
    if (!currentDay) return [];
    return isOddWeek ? currentDay.odd : currentDay.even;
  };

  const getWeekTypeText = () => {
    return isOddWeek ? 'N' : 'P';
  };

  const RenderLeftArrow = ({
    color,
    size,
  }: {
    color: string;
    size: number;
  }) => <Icon name="arrow-back-ios" color={color} size={size} />;

  const RenderRightArrow = ({
    color,
    size,
  }: {
    color: string;
    size: number;
  }) => <Icon name="arrow-forward-ios" color={color} size={size} />;

  return (
    <View style={styles.bgContainer}>
      <View style={styles.container}>
        {/* Navigation header */}
        <View style={styles.navigationHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={navigateToPrevDay}
          >
            <RenderLeftArrow color="#aeaeaf" size={18} />
          </TouchableOpacity>

          <Text style={styles.dayTitle}>
            {timetable[currentDayIndex]?.name || ''}
          </Text>

          <TouchableOpacity
            style={styles.navButton}
            onPress={navigateToNextDay}
          >
            <RenderRightArrow color="#aeaeaf" size={18} />
          </TouchableOpacity>
        </View>

        {/* Week indicator */}
        <View style={styles.weekIndicator}>
          <Text style={styles.weekText}>{getWeekTypeText()}</Text>
        </View>

        {/* Lessons list */}
        {timetable[currentDayIndex] && (
          <FlatList
            data={getCurrentDayData()}
            renderItem={renderLesson}
            keyExtractor={item =>
              `${item.rowId}-${item.classroom}-${isOddWeek ? 'odd' : 'even'}`
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={LessonSeparator}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: '#181818',
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1f1f',
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
  },
  weekIndicator: {
    alignItems: 'center',
  },
  weekText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '200',
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayTitle: {
    color: '#e5e5ff',
    fontSize: 30,
    fontFamily: 'InterSemiBold',
    textAlign: 'center',
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#3A3A3A', // subtle dark gray line
    marginVertical: 0,
    opacity: 0.8,
  },
});

export default TimetableScreen;
