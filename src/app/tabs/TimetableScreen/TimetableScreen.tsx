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

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<DaySchedule[]>([]);
  const [aHours, setAHours] = useState<string[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isOddWeek, setIsOddWeek] = useState(true);

  // Static for early dev
  const groupName = '12K1';
  const filters = { k: 'K01', l: 'L01', p: 'P01' };

  useEffect(() => {
    async function fetchHours() {
      try {
        const response = await getAcademicHours();
        setAHours(response);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchTimetable() {
      try {
        const response = await getTimetableByGroup(
          groupName,
          filters.k,
          filters.l,
          filters.p,
        );
        setTimetable(response.data);
      } catch (err) {
        console.log(`${err}`);
      }
    }
    fetchHours();
    fetchTimetable();
  }, []);

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

  return (
    <View style={styles.bgContainer}>
      <View style={styles.container}>
        {/* Navigation header */}
        <View style={styles.navigationHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={navigateToPrevDay}
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.dayTitle}>
            {timetable[currentDayIndex]?.name || ''}
          </Text>

          <TouchableOpacity
            style={styles.navButton}
            onPress={navigateToNextDay}
          >
            <Text style={styles.navButtonText}>→</Text>
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
    marginBottom: 16,
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
});

export default TimetableScreen;
