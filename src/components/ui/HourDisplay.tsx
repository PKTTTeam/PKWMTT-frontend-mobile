import React from 'react';
import { View, StyleSheet } from 'react-native';
import { backgroundColor, useTheme } from '@shopify/restyle';
import { Theme } from '../../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../../styles/ScheduleItemLandscapeStyles';
import TimeRange from '../ui/TimeRange';
import type { HourDisplayProps } from '../../types/global';
import { BAR_WIDTH, BAR_HEIGHT } from '../../constants/constants';

const HourDisplay: React.FC<HourDisplayProps> = ({
  startTime,
  endTime,
  isActive,
}) => {
  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme);

  return (
    <View style={[styles.ScreenContainer, { backgroundColor: 'transparent' }]}>
      <View style={ActiveBarStyles.bar} />
      <View style={styles.timeAndSubject}>
        <TimeRange timeStart={startTime} timeEnd={endTime} />
      </View>
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

export default HourDisplay;
