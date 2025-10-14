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
    borderRadius: 15,
    padding: 3,
  },
  switchCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default SwitchStyles;
