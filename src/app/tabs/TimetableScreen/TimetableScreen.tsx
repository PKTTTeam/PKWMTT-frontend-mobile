import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
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
import {
  useSettingsStore,
  useSettingsActions,
} from '../../../store/settingsStore';
import { getFullSchedule } from '../../../utils/getFullSchedule.ts';

import ConnectionAlertModal from '../../../components/modals/ConnectionAlertModal.tsx';
import { useTranslation } from 'react-i18next';

const LessonSeparator = () => {
  return <View style={styles.separator} />;
};

const RenderLeftArrow = ({ color, size }: { color: string; size: number }) => (
  <Icon name="arrow-back-ios" color={color} size={size} />
);

const RenderRightArrow = ({ color, size }: { color: string; size: number }) => (
  <Icon name="arrow-forward-ios" color={color} size={size} />
);

const dayNameMap: Record<string, string> = {
  Poniedziałek: 'Monday',
  Wtorek: 'Tuesday',
  Środa: 'Wednesday',
  Czwartek: 'Thursday',
  Piątek: 'Friday',
  Sobota: 'Saturday',
  Niedziela: 'Sunday',
};

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<DaySchedule[]>([]);
  const [aHours, setAHours] = useState<string[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isOddWeek, setIsOddWeek] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { t } = useTranslation();

  //state for error modal
  const error = useSettingsStore(state => state.error);
  const { clearError, setError } = useSettingsActions();

  // Get settings from store
  const groups = useSettingsStore(state => state.groups);
  const loading = useSettingsStore(state => state.loading);
  const showEmptySlots = useSettingsStore(state => state.showEmptySlots);

  const { fetchInitialDeanGroups } = useSettingsActions();

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

  // Initialize dean groups on mount if not loaded
  useEffect(() => {
    if (!groups.dean) {
      fetchInitialDeanGroups();
    }
  }, [groups.dean, fetchInitialDeanGroups]);

  // Check if all required groups are selected
  const areAllGroupsSelected = () => {
    return !!groups.dean;
  };

  useEffect(() => {
    // Only fetch timetable if all groups are selected
    if (!areAllGroupsSelected()) {
      setTimetable([]);
      return;
    }

    async function initialiseData() {
      try {
        if (!groups.dean)
          throw new Error('General group name is required to fetch timetable');
        const [hours, timetableResponse] = await Promise.all([
          getAcademicHours(),
          getTimetableByGroup(
            groups.dean,
            groups.comp || undefined,
            groups.lab || undefined,
            groups.proj || undefined,
          ),
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
          setError(err.message || 'Server error');
          // Server responded with a status outside 2xx
          console.error('Server responded with error:', {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers,
          });
        } else if (err.request) {
          // Request was made but no response received
          setError(err.message || 'No response from server');
          console.error('No response received from server:', err.request);
        } else {
          // Something else went wrong
          setError(err.message || 'Request error');
          console.error('Error setting up request:', err.message);
        }
        setError(err.message || 'Network error');
        // Log full error for debugging
        console.error('Full error object:', err);
      }
    }
    initialiseData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.dean, groups.comp, groups.lab, groups.proj]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Refresh timetable data
      if (!groups.dean)
        throw new Error('General group name is required to fetch timetable');

      const [hours, timetableResponse] = await Promise.all([
        getAcademicHours(),
        getTimetableByGroup(
          groups.dean,
          groups.comp || undefined,
          groups.lab || undefined,
          groups.proj || undefined,
        ),
      ]);

      setAHours(hours);
      setTimetable([...timetableResponse.data]);
    } catch (err: any) {
      console.error('Refresh failed', err);
      setError(err.message || 'Refresh error');
    } finally {
      setRefreshing(false);
    }
  }, [groups.comp, groups.dean, groups.lab, groups.proj, setError]);

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

    const isEmptySlot = !item.name;

    if (isEmptySlot) {
      return (
        <>
          <ScheduleItem
            subject={''}
            startTime={startTime}
            endTime={endTime}
            room={undefined}
            bgColor={''}
            type={''}
            letterColor="white"
            isActive={isActive}
          />
        </>
      );
    }

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
    const lessons = isOddWeek ? currentDay.odd : currentDay.even;
    if (!showEmptySlots) return lessons;

    return getFullSchedule(aHours, lessons);
  };

  const getWeekTypeText = () => {
    return isOddWeek ? t('oddWeek') : t('evenWeek');
  };

  // Show loading state
  if (loading) {
    return (
      <View style={styles.bgContainer}>
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t('groupLoad')}</Text>
          </View>
        </View>
      </View>
    );
  }

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
            {t(
              `dayNames.${
                dayNameMap[timetable[currentDayIndex]?.name] || 'Monday'
              }`,
            )}
          </Text>

          <TouchableOpacity
            style={styles.navButton}
            onPress={navigateToNextDay}
          >
            <RenderRightArrow color="#aeaeaf" size={18} />
          </TouchableOpacity>
        </View>

        {/* Week indicator */}
        <TouchableOpacity
          style={styles.weekIndicator}
          onPress={() => setIsOddWeek(prev => !prev)}
          hitSlop={10}
        >
          <Icon name={'sync-alt'} size={15} color={'white'} />
          <Text style={styles.weekText}>{getWeekTypeText()}</Text>
        </TouchableOpacity>

        {/* Lessons list */}
        {timetable[currentDayIndex] && (
          <FlatList
            key={showEmptySlots ? 'with-empty' : 'without-empty'}
            data={getCurrentDayData()}
            renderItem={renderLesson}
            keyExtractor={item =>
              `${item.rowId}-${item.classroom}-${isOddWeek ? 'odd' : 'even'}`
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={LessonSeparator}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>

      <ConnectionAlertModal
        visible={!!error}
        onRetry={() => {
          clearError();
          onRefresh();
        }}
        onClose={clearError}
      />
    </View>
  );
};

export default TimetableScreen;
