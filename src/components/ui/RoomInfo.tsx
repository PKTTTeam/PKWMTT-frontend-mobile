import { Text, useWindowDimensions } from 'react-native';
import type { RoomInfoProps } from '../../types/global';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  const { t } = useTranslation();
  const ThemeMode = useSettingsStore(state => state.themeMode);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Text
      // eslint-disable-next-line react-native/no-inline-styles
      style={[
        ThemeMode === 'dark' ? { color: 'white' } : { color: 'black' },
        isLandscape ? { fontSize: 10, color: 'gray' } : { fontSize: 16 },
      ]}
    >
      {t('classroom')}
      {'\n'}
      {room}
    </Text>
  );
};

export default RoomInfo;
