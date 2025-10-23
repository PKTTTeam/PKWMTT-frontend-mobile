import { Text, StyleSheet } from 'react-native';
import type { TimeRangeProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';

type Props = TimeRangeProps & { dimmed?: boolean };

const TimeRange: React.FC<Props> = ({ timeStart, timeEnd, dimmed }) => {
  return <Text style={[globalStyles.time, dimmed && styles.dimmed]}>{timeStart}-{timeEnd}</Text>;
};

export default TimeRange;

const styles = StyleSheet.create({
  dimmed: { color: '#9aa0b0' },
});
