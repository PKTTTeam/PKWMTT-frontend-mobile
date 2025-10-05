import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../styles/ScheduleItemStyles';
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
  letterColor,
  isActive,
}) => {
    const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme);
  return (
    <View style={isActive ? styles.ScreenContainer : styles.EmptyScreenContainer}>
      <ActiveBar isActive={isActive} />

      <View style={styles.timeAndSubject}>
        <TimeRange timeStart={startTime} timeEnd={endTime} />
        <SubjectName subject={subject} />
      </View>
      {room && (
        <View style={styles.rightInfo}>
          <LetterIcon
            bgColor={bgColor}
            letter={type}
            letterColor={letterColor}
          />
          <RoomInfo room={room} />
        </View>
      )}
    </View>
  );
};

export default ScheduleItem;
