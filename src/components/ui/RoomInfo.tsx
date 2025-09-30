import { Text } from 'react-native';
import type { RoomInfoProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';
import { useTranslation } from 'react-i18next';

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  const { t } = useTranslation();
  return (
    <Text style={globalStyles.text}>
      {t('classroom')}:{room}
    </Text>
  );
};

export default RoomInfo;
