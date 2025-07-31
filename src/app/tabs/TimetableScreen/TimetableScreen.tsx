import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';
import { DaySchedule, TimetableItem } from '../../../types/global';
import {
  getAcademicHours,
  getTimetableByGroup,
} from '../../../services/timetable/TimetableService';

import { getCorrectColor } from '../../../utils/getCorrectColor';
import getCorrectLetter from '../../../utils/getCorrectLetter';
import checkActiveLesson from '../../../services/timetable/checkActiveLesson';
import getCurrentWeekType from '../../../utils/getCurrentWeekType';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles.ts';

const LessonSeparator = () => {
  return <View style={styles.separator} />;
};

const RenderLeftArrow = ({ color, size }: { color: string; size: number }) => (
  <Icon name="arrow-back-ios" color={color} size={size} />
);

const RenderRightArrow = ({ color, size }: { color: string; size: number }) => (
  <Icon name="arrow-forward-ios" color={color} size={size} />
);

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<DaySchedule[]>([]);
  const [aHours, setAHours] = useState<string[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isOddWeek, setIsOddWeek] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Static for early dev
  const groupName = '12K2';
  const filters = { k: 'K04', l: 'L04', p: 'P04' };

  const navigationRef = useRef({
    currentDayIndex,
    isOddWeek,
    timetableLength: 0,
  });

  useEffect(() => {
    navigationRef.current = {
      currentDayIndex,
      isOddWeek,
      timetableLength: timetable.length,
    };
  }, [currentDayIndex, isOddWeek, timetable.length]);

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
        const today = new Date();
        const jsDay = today.getDay();
        const index = jsDay === 0 || jsDay === 6 ? 0 : jsDay - 1;
        setCurrentDayIndex(index);
      } catch (err: any) {
        if (err.response) {
          // Server responded with a status outside 2xx
          console.error('Server responded with error:', {
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
    //we do not want to rerender when isOddWeek changed
  }, [filters.k, filters.l, filters.p]); 

  const navigateToNextDay = () => {
    if (isNavigating) return; // Prevent rapid clicks

    setIsNavigating(true);

    const { currentDayIndex: currentIndex, timetableLength } =
      navigationRef.current;

    if (currentIndex < timetableLength - 1) {
      // Normal navigation within the week
      setCurrentDayIndex(currentIndex + 1);
    } else if (currentIndex === timetableLength - 1) {
      // At the last day (Friday), switch to next week and go to first day
      setIsOddWeek(prev => !prev);
      setCurrentDayIndex(0);
    }

    // Re-enable navigation after a short delay
    setTimeout(() => setIsNavigating(false), 200);
  };

  const navigateToPrevDay = () => {
    if (isNavigating) return; // Prevent rapid clicks

    setIsNavigating(true);

    const { currentDayIndex: currentIndex, timetableLength } =
      navigationRef.current;

    if (currentIndex > 0) {
      // Normal navigation within the week
      setCurrentDayIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      // At the first day (Monday), switch to previous week and go to last day
      setIsOddWeek(prev => !prev);
      setCurrentDayIndex(timetableLength - 1);
    }

    // Re-enable navigation after a short delay
    setTimeout(() => setIsNavigating(false), 200);
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

export default TimetableScreen;
