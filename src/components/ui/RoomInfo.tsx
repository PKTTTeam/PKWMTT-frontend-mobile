import { Text } from 'react-native';
import type { RoomInfoTypes } from '../../types/global';
import globalStyles from '../../styles/globalStyles';

const RoomInfo: React.FC<RoomInfoTypes> = ({ room }) => {
  return <Text style={globalStyles.text}>sala:{room}</Text>;
};

export default RoomInfo;
