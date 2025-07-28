import { View, StyleSheet } from 'react-native';
import { BAR_WIDTH, BAR_HEIGHT } from '../../constants/constants';

interface ActiveBarProps {
  isActive: boolean;
}

const ActiveBar: React.FC<ActiveBarProps> = ({ isActive }) => {
  // eslint-disable-next-line react/self-closing-comp
  return (
    <View
      style={[
        ActiveBarStyles.bar,
        { backgroundColor: isActive ? '#8d95fe' : 'white' },
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
