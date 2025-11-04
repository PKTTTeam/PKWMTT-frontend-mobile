import { View, StyleSheet } from 'react-native';
import React from 'react';
import { backgroundColor, useTheme } from '@shopify/restyle';
import { Theme } from '../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../styles/ScheduleItemLandscapeStyles';
import SubjectName from './ui/SubjectName';
import RoomInfo from './ui/RoomInfo';
// import TimeRange from './ui/TimeRange';
import LetterIcon from './ui/letterIcon';
import ActiveBar from './ui/ActiveBar';
import type { ScheduleItemLandscapeProps } from '../types/global';
import { BAR_WIDTH, BAR_HEIGHT } from './../constants/constants';

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
    <View
      style={[
        styles.ScreenContainer,
        !room
          ? { backgroundColor: 'transparent' }
          : // jeśli jest aktywne — lekko przezroczysty akcent
          isActive
          ? { backgroundColor: theme.colors.confirmAccent + '7e' }
          : // w innym przypadku zostaje domyślny kolor tła ze styles
            {},
      ]}
    >
      {/* <ActiveBar isActive={isActive} /> */}
      <View style={ActiveBarStyles.bar} />
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

const ActiveBarStyles = StyleSheet.create({
  bar: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: BAR_WIDTH / 2,
    marginVertical: 4,
  },
});

export default ScheduleItemLandscape;
