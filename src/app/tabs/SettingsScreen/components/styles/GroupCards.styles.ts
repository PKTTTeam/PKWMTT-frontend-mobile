import { StyleSheet } from 'react-native';

// Wrapper around each GroupCard to provide spacing and a hook for layout tweaks
export const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrappersContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
