import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimeRange from '../../../components/ui/TimeRange';
import RoomInfo from '../../../components/ui/RoomInfo';

const TimetableScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Timetable</Text>
      <Icon name="schedule" size={30} color={'blue'} />
      <TimeRange timeStart={'12:30'} timeEnd={'14:30'} />
      <RoomInfo room={'J207'} />
    </View>
  );
};

export default TimetableScreen;
