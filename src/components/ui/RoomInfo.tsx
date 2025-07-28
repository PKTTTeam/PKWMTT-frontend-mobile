import { Text } from 'react-native';
import type { RoomInfoProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  return <Text style={globalStyles.text}>sala:{room}</Text>;
};

export default RoomInfo;
