import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';
import { DaySchedule, TimetableItem } from '../../../types/global';
import { getTimetableByGroup } from '../../../services/TimetableService';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<DaySchedule[]>([]);
  //static for early dev
  const groupName = '12K2';
  const filters = { k: 'K04', l: 'L04', p: 'P04' };

  useEffect(() => {
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

    fetchTimetable();
  }, []);

  const renderLesson = ({ item }: { item: TimetableItem }) => {
    return (
      <ScheduleItem
        subject={item.name}
        startTime="12"
        endTime="12"
        room={item.classroom}
        bgColor="blue"
        type={item.type.slice(0, 1)}
        letterColor="white"
      />
    );
  };

  const renderDay = ({ item }: { item: DaySchedule }) => {
    return (
      <View style={{ marginBottom: 16 }}>
        <Text>{item.name}</Text>

        <FlatList
          data={item.odd}
          renderItem={renderLesson}
          keyExtractor={l => `${l.rowId}-${l.classroom}`}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: '#181818', flex: 1 }}>
      <FlatList
        data={timetable}
        renderItem={renderDay}
        keyExtractor={d => d.name}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

export default TimetableScreen;
