import { View, StyleSheet } from 'react-native';
import { BAR_WIDTH, BAR_HEIGHT } from '../../constants/constants';

const ActiveBar = () => {
  // eslint-disable-next-line react/self-closing-comp
  return <View style={ActiveBarStyles.bar}></View>;
};

const ActiveBarStyles = StyleSheet.create({
  bar: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    backgroundColor: '#8d95fe', //for now static
    borderRadius: BAR_WIDTH / 2,
    marginVertical: 4,
  },
});

export default ActiveBar;
