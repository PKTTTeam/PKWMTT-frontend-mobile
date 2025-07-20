import { StyleSheet } from 'react-native';
import { ICON_SIZE, ICON_RADIUS } from '../constants/constants';

const globalStyles = StyleSheet.create({
  ScreenContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1f1f',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginLeft: 2,
    marginRight: 2,
  },
  text: {
    color: '#FFFFFF',
  },
  timeAndSubject: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 8,
  },
  subject: {
    color: '#e5e5ff',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  time: {
    color: '#e5e5ff',
    fontSize: 16,
    marginBottom: 4,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textIcon: {
    fontWeight: 'bold',
    fontSize: ICON_SIZE * 0.5,
  },
});

export default globalStyles;
