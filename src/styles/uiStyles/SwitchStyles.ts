
import { StyleSheet } from 'react-native';

const SwitchStyles = StyleSheet.create({
      contentConainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchContainer: {
    width: 70,
    height: 30,
    borderRadius: 25,
    padding: 5,
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});

export default SwitchStyles;