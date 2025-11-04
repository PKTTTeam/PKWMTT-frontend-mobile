import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';
import ScheduleItemLandscape from '../../../components/ScheduleItemLandscape';
import HourDisplay from '../../../components/ui/HourDisplay';
import { TimetableItem } from '../../../types/global';
import {
  getAcademicHours,
  getTimetableByGroup,
} from '../../../services/timetable/TimetableService';

import { getCorrectColor } from '../../../utils/getCorrectColor';
import getCorrectLetter from '../../../utils/getCorrectLetter';
import checkActiveLesson from '../../../services/timetable/checkActiveLesson';
import getCurrentWeekType from '../../../utils/getCurrentWeekType';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import { createTimetableStyles } from './timetableStyles.ts';

import {
  useSettingsStore,
  useSettingsActions,
} from '../../../store/settingsStore';
import { useTimetableStore } from '../../../store/timetableStore.ts';

import { getFullSchedule } from '../../../utils/getFullSchedule.ts';

import ConnectionAlertModal from '../../../components/modals/ConnectionAlertModal.tsx';
import { useTranslation } from 'react-i18next';
import LessonSeparator from './LessonSeparator.tsx';
import LessonSeparatorLandscape from './LessonSeparatorLandscape.tsx';

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
  //cache results
  const { timetable, academicHours, actions } = useTimetableStore();
  const { setTimetable, setAcademicHours, markOffline } = actions;

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
  const hideLectures = useSettingsStore(state => state.hideLectures);

  const { fetchInitialDeanGroups } = useSettingsActions();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

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
        setAcademicHours(hours);
        setTimetable(timetableResponse.data);
        setIsOddWeek(getCurrentWeekType());
        const today = new Date();
        const jsDay = today.getDay();
        const index = jsDay === 0 || jsDay === 6 ? 0 : jsDay - 1;
        setCurrentDayIndex(index);
        markOffline(false);
      } catch (err: any) {
        markOffline(true);
        if (err.response) {
          setError(err.message || 'Server error');
          // Server responded with a status outside 2xx
          console.error('Server responded with error:', {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers,
          });
        }
      }
    }
    initialiseData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.dean, groups.comp, groups.lab, groups.proj]);

  const theme = useTheme<Theme>();
  const styles = createTimetableStyles(theme);

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

      setAcademicHours(hours);
      setTimetable([...timetableResponse.data]);
      markOffline(false);
    } catch (err: any) {
      markOffline(true);
      console.error('Refresh failed', err);
      setError(err.message || 'Refresh error');
    } finally {
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (!academicHours || academicHours.length === 0) {
      console.warn('aHours is not ready yet');
      return null;
    }

    const hourString = academicHours[item.rowId];
    if (!hourString) {
      console.warn(`No hour found for rowId ${item.rowId}`);
    }

    const [startTime = '??', endTime = '??'] =
      hourString?.split('-').map(s => s.trim()) ?? [];

    const isActive = checkActiveLesson(
      item,
      academicHours,
      timetable[currentDayIndex]?.name,
      isOddWeek,
    );

    const isEmptySlot = !item.name;

    if (isLandscape && isEmptySlot) {
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

    if (isLandscape) {
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
    }

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
    let lessons = isOddWeek ? currentDay.odd : currentDay.even;

    if (hideLectures) {
      lessons = lessons.filter(item => item.type !== 'LECTURE');
    }
    if (!showEmptySlots) return lessons;

    return getFullSchedule(academicHours, lessons);
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
      {!isLandscape && (
        <View style={styles.container}>
          {/* Navigation header */}
          <View style={styles.navigationHeader}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={navigateToPrevDay}
            >
              <RenderLeftArrow color={theme.colors.navButtonIcon} size={18} />
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
              <RenderRightArrow color={theme.colors.navButtonIcon} size={18} />
            </TouchableOpacity>
          </View>

          {/* Week indicator */}
          <TouchableOpacity
            style={styles.weekIndicator}
            onPress={() => setIsOddWeek(prev => !prev)}
            hitSlop={15}
          >
            <Icon
              name={'sync-alt'}
              size={15}
              color={theme.colors.themeOpposite}
            />
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
      )}
      {/* TODO: aplikacja MOŻE crashowac po przejściu do innego taba */}
      {/* TODO: Wystylowanie tabeli */}
      {isLandscape && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              {/* kolumna godzin */}
              <View style={{ marginRight: 20 }}>
                {/* TODO: niedziałający button (mały boszar, histlop nie pomaga) */}
                {/* <TouchableOpacity
                  style={styles.weekIndicator}
                  onPress={() => setIsOddWeek(prev => !prev)}
                  hitSlop={50}
                >
                  <Icon
                    name={'sync-alt'}
                    size={40}
                    color={theme.colors.themeOpposite}
                  />
                </TouchableOpacity> */}
                <Text style={[styles.dayTitle, { textAlign: 'center' }]}>
                  {isOddWeek ? t('oddWeek') : t('evenWeek')}
                </Text>

                {academicHours.map((hour, index) => {
                  const [startTime, endTime] = hour
                    .split('-')
                    .map(s => s.trim());
                  return (
                    <View key={index} style={{ paddingVertical: 3, gap: 5 }}>
                      <HourDisplay
                        startTime={startTime}
                        endTime={endTime}
                        isActive={false}
                      />
                      {index < academicHours.length - 1 && <LessonSeparator />}
                    </View>
                  );
                })}
              </View>

              {/* Kolumny dni */}
              {timetable.map(day => {
                const lessons = isOddWeek ? day.odd : day.even;
                const fullLessons = getFullSchedule(academicHours, lessons);

                return (
                  <View key={day.name} style={{ marginRight: 10 }}>
                    <Text style={[styles.dayTitle, { textAlign: 'center' }]}>
                      {t(`dayNames.${dayNameMap[day.name]}`)}
                    </Text>

                    {/* Lekcje */}
                    {fullLessons.map((lesson, index) => (
                      <View
                        key={`${lesson.rowId}-${lesson.classroom}`}
                        style={{ paddingVertical: 3, gap: 5 }}
                      >
                        {renderLesson({ item: lesson })}
                        {index < fullLessons.length - 1 && <LessonSeparator />}
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </ScrollView>
      )}

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
