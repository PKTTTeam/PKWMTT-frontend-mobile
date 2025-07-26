import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import { LetterIconProps } from '../../types/global';

const LetterIcon: React.FC<LetterIconProps> = ({
  bgColor,
  letter,
  letterColor,
}) => {
  return (
    <View style={[globalStyles.icon, { backgroundColor: bgColor }]}>
      <Text style={[globalStyles.text, { color: letterColor }]}>{letter}</Text>
    </View>
  );
};

export default LetterIcon;
