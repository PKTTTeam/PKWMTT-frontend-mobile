import { Text } from 'react-native';
import type { RoomInfoTypes } from '../../types/global';

const RoomInfo: React.FC<RoomInfoTypes> = ({ room }) => {
  return <Text>sala:{room}</Text>;
};

export default RoomInfo;
