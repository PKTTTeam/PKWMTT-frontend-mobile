import { View, Text } from 'react-native';
import TimeRange from '../../../components/ui/TimeRange';
import RoomInfo from '../../../components/ui/RoomInfo';
import globalStyles from '../../../styles/globalStyles';
import LetterIcon from '../../../components/ui/LetterIcon';
import SubjectName from '../../../components/ui/SubjectName';

const TimetableScreen = () => {
  return (
    <View style={globalStyles.ScreenContainer}>
      <Text style={globalStyles.text}>Timetable</Text>
      <SubjectName subject="Programowanie niskopoziomowe" />
      <TimeRange timeStart={'12:30'} timeEnd={'14:30'} />
      <RoomInfo room={'J207'} />
      <LetterIcon bgColor="red" letter="W" letterColor="white" />
    </View>
  );
};

export default TimetableScreen;
