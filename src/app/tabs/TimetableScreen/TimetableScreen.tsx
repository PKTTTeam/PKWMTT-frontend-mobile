import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TimetableScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Timetable</Text>
      <Icon name="schedule" size={30} color={'blue'} />
    </View>
  );
};

export default TimetableScreen;
