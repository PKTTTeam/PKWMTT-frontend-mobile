import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const iconSize = (width + height) * 0.018;
const iconRadius = iconSize / 2;

const globalStyles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  text: {
    color: '#FFFFFF',
  },
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {
    fontWeight: 'bold',
    fontSize: iconSize * 0.5,
  },
});

export default globalStyles;
