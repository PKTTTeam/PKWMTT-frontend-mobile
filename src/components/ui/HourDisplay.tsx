import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../../styles/ScheduleItemStyles';
import TimeRange from '../ui/TimeRange';
import ActiveBar from '../ui/ActiveBar';
import type { HourDisplayProps } from '../../types/global';

const HourDisplay: React.FC<HourDisplayProps> = ({ startTime, endTime, isActive }) => {
  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme);

  return (
    <View style={styles.ScreenContainer}>
      <ActiveBar isActive={isActive} />
      <View style={styles.timeAndSubject}>
        <TimeRange timeStart={startTime} timeEnd={endTime} />
      </View>
    </View>
  );
};

export default HourDisplay;
