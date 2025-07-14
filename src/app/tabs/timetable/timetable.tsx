import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LetterIcon from '../../../components/ui/letterIcon';

const Timetable = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Timetable</Text>
      <Icon name="schedule" size={30} color={'blue'} />
      <LetterIcon color='black' letter='X' letterColor='red'/>
    </View>
  );
};

export default Timetable;
