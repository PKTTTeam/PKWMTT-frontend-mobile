import { View, StyleSheet } from 'react-native';
import { BAR_WIDTH, BAR_HEIGHT } from '../../constants/constants';

interface ActiveBarProps {
  isActive: boolean;
  dimmed?: boolean;
}

const ActiveBar: React.FC<ActiveBarProps> = ({ isActive, dimmed }) => {
  return (
    // eslint-disable-next-line react/self-closing-comp
    <View
      style={[
        ActiveBarStyles.bar,
        // eslint-disable-next-line react-native/no-inline-styles
        { backgroundColor: isActive ? '#8d95fe' : dimmed ? '#cfd3dc' : 'white' },
      ]}
    ></View>
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

export default ActiveBar;
