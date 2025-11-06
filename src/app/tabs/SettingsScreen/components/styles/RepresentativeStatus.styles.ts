import { StyleSheet } from 'react-native';

// Styles extracted from RepresentativeStatus component to keep JSX clean.
// Button/colors could later be themed via a central design system.
export const styles = StyleSheet.create({
  statusText: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;