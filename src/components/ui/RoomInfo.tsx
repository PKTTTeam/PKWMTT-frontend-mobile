import { Text } from 'react-native';
import type { RoomInfoProps } from '../../types/global';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  const { t } = useTranslation();
  const ThemeMode = useSettingsStore(state => state.themeMode);
  return (
    <Text
      // eslint-disable-next-line react-native/no-inline-styles
      style={ThemeMode === 'dark' ? { color: 'white' } : { color: 'black' }}
    >
      {t('classroom')}:{room}
    </Text>
  );
};

export default RoomInfo;
