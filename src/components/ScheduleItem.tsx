import { View, StyleSheet } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import SubjectName from './ui/SubjectName';
import RoomInfo from './ui/RoomInfo';
import TimeRange from './ui/TimeRange';
import LetterIcon from './ui/letterIcon';
import ActiveBar from './ui/ActiveBar';
import type { ScheduleItemProps } from '../types/global';

type Props = ScheduleItemProps & { dimmed?: boolean };

const ScheduleItem: React.FC<Props> = ({
  subject,
  startTime,
  endTime,
  room,
  type,
  bgColor,
  isActive,
  dimmed = false,
}) => {
  return (
    <View style={[globalStyles.ScreenContainer, dimmed && styles.dimmedContainer]}>
      <ActiveBar isActive={isActive} dimmed={dimmed} />

      <View style={globalStyles.timeAndSubject}>
        <TimeRange timeStart={startTime} timeEnd={endTime} dimmed={dimmed} />
        <SubjectName subject={subject} dimmed={dimmed} />
      </View>
      {room && (
        <View style={globalStyles.rightInfo}>
          <View style={globalStyles.iconTextWrapper}>
            <LetterIcon bgColor={bgColor} letter={type} />
            <RoomInfo room={room} dimmed={dimmed} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({
  dimmedContainer: {
    opacity: 0.35,
  },
});
