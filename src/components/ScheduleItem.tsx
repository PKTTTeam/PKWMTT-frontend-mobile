import { View } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import SubjectName from './ui/SubjectName';
import RoomInfo from './ui/RoomInfo';
import TimeRange from './ui/TimeRange';
import LetterIcon from './ui/LetterIcon';
import ActiveBar from './ui/ActiveBar';
import type { ScheduleItemProps } from '../types/global';

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  subject,
  startTime,
  endTime,
  room,
  type,
  bgColor,
  letterColor,
}) => {
  return (
    <View style={globalStyles.ScreenContainer}>
      <ActiveBar />

      <View style={globalStyles.timeAndSubject}>
        <TimeRange timeStart={startTime} timeEnd={endTime} />
        <SubjectName subject={subject} />
      </View>
      <View style={globalStyles.rightInfo}>
        <RoomInfo room={room} />
        <LetterIcon bgColor={bgColor} letter={type} letterColor={letterColor} />
      </View>
    </View>
  );
};

export default ScheduleItem;
