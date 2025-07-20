import { Text } from 'react-native';
import type { TimeRangeProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';

const TimeRange: React.FC<TimeRangeProps> = ({ timeStart, timeEnd }) => {
  return (
    <Text style={globalStyles.time}>
      {timeStart}-{timeEnd}
    </Text>
  );
};

export default TimeRange;
