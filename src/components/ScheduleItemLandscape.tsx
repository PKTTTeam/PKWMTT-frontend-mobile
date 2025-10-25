import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../styles/ScheduleItemStyles';
import SubjectName from './ui/SubjectName';
import RoomInfo from './ui/RoomInfo';
// import TimeRange from './ui/TimeRange';
import LetterIcon from './ui/letterIcon';
import ActiveBar from './ui/ActiveBar';
import type { ScheduleItemLandscapeProps } from '../types/global';

const ScheduleItemLandscape: React.FC<ScheduleItemLandscapeProps> = ({
  subject,
  room,
  type,
  bgColor,
  isActive,
}) => {
  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme);

  return (
    <View style={styles.ScreenContainer}>
      <ActiveBar isActive={isActive} />

      <View style={styles.timeAndSubject}>
        <SubjectName subject={subject} />
      </View>
      {room && (
        <View style={styles.rightInfo}>
          <LetterIcon bgColor={bgColor} letter={type} />
          <RoomInfo room={room} />
        </View>
      )}
    </View>
  );
};

export default ScheduleItemLandscape;
