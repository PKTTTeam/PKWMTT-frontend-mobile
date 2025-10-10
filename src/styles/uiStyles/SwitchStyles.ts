import { StyleSheet } from 'react-native';

const SwitchStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1f1f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 25,
    padding: 3,
    justifyContent: 'center',
  },
  switchCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 4,
  },
});

export default SwitchStyles;
