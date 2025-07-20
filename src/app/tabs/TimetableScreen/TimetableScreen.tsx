import React from 'react';
import { View } from 'react-native';
import ScheduleItem from '../../../components/ScheduleItem';

const TimetableScreen = () => {
  return (
    <View style={{ backgroundColor: '#181818', flex: 1 }}>
      <ScheduleItem
        subject="Programowanie niskopoziomowe"
        startTime="12:30"
        endTime="14:30"
        room="J207"
        type="W"
        bgColor="red"
        letterColor="white"
      />
    </View>
  );
};

export default TimetableScreen;
