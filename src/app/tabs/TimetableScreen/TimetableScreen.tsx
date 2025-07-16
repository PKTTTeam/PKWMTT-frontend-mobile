import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimeRange from '../../../components/ui/TimeRange';
import RoomInfo from '../../../components/ui/RoomInfo';
import globalStyles from '../../../styles/globalStyles';
import LetterIcon from '../../../components/ui/letterIcon';

const TimetableScreen = () => {
  return (
    <View style={globalStyles.ScreenContainer}>
      <Text style={globalStyles.text}>Timetable</Text>
      <Icon name="schedule" size={30} color={'blue'} />
      <TimeRange timeStart={'12:30'} timeEnd={'14:30'} />
      <RoomInfo room={'J207'} />
      <LetterIcon />
    </View>
  );
};

export default TimetableScreen;
