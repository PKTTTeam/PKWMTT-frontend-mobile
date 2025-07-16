import { View, Text, StyleSheet } from 'react-native';

// used for size references
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const iconSize = (width + height) * 0.018; // Reference size

const LetterIcon = ({ color = 'black', letter = 'W', letterColor = 'white'}) => {
  return (
    <View style={[styles.icon, { backgroundColor: color }]}>
      <Text style={[styles.text, {color: letterColor }]}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: iconSize,
    height: iconSize,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: iconSize * 0.5,
  },
});

export default LetterIcon;
