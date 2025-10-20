import { Text } from 'react-native';
import type { TimeRangeProps } from '../../types/global';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../../styles/ScheduleItemStyles';

const TimeRange: React.FC<TimeRangeProps> = ({ timeStart, timeEnd }) => {
  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme);
  return (
    <Text style={styles.time}>
      {timeStart}-{timeEnd}
    </Text>
  );
};

export default TimeRange;
