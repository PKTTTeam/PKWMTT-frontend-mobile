import { Text } from 'react-native';
import type { TimeRangeProps } from '../../types/global';

const TimeRange: React.FC<TimeRangeProps> = ({ timeStart, timeEnd }) => {
  return (
    <Text>
      {timeStart}-{timeEnd}
    </Text>
  );
};

export default TimeRange;
