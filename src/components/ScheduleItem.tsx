import { View } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import SubjectName from './ui/SubjectName';
import RoomInfo from './ui/RoomInfo';
import TimeRange from './ui/TimeRange';
import LetterIcon from './ui/letterIcon';
import ActiveBar from './ui/ActiveBar';
import type { ScheduleItemProps } from '../types/global';

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  subject,
  startTime,
  endTime,
  room,
  type,
  bgColor,
  isActive,
}) => {
  return (
    <View style={globalStyles.ScreenContainer}>
      <ActiveBar isActive={isActive} />

      <View style={globalStyles.timeAndSubject}>
        <TimeRange timeStart={startTime} timeEnd={endTime} />
        <SubjectName subject={subject} />
      </View>
      {room && (
        <View style={globalStyles.rightInfo}>
          <LetterIcon bgColor={bgColor} letter={type} />
          <RoomInfo room={room} />
        </View>
      )}
    </View>
  );
};

export default ScheduleItem;
