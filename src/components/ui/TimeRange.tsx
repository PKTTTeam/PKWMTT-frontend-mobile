import { Text, useWindowDimensions } from 'react-native';
import type { TimeRangeProps } from '../../types/global';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../../styles/ScheduleItemStyles';

const TimeRange: React.FC<TimeRangeProps> = ({ timeStart, timeEnd }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme, isLandscape);

  return (
    <Text style={styles.time}>
      {timeStart}-{timeEnd}
    </Text>
  );
};

export default TimeRange;
