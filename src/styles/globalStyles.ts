import { StyleSheet } from 'react-native';
import { ICON_SIZE, ICON_RADIUS } from '../constants/constants';

const globalStyles = StyleSheet.create({
  ScreenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1f1f',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  text: {
    color: '#e5e5ff',
    fontSize: 14,
  },
  timeAndSubject: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 8,
  },
  subject: {
    color: '#e5e5ff',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
  },
  time: {
    color: '#e5e5ff',
    fontSize: 14,
    marginBottom: 4,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  textIcon: {
    fontWeight: 'bold',
    fontSize: ICON_SIZE * 0.5,
  },
  iconFixed: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default globalStyles;
