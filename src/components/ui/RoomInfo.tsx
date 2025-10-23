import { Text, StyleSheet } from 'react-native';
import type { RoomInfoProps } from '../../types/global';
import globalStyles from '../../styles/globalStyles';
import { useTranslation } from 'react-i18next';

type Props = RoomInfoProps & { dimmed?: boolean };

const RoomInfo: React.FC<Props> = ({ room, dimmed }) => {
  const { t } = useTranslation();
  return (
    <Text style={[globalStyles.text, dimmed && styles.dimmed]}>
      {t('classroom')}
      {'\n'}
      {room}
    </Text>
  );
};

export default RoomInfo;

const styles = StyleSheet.create({
  dimmed: { color: '#9aa0b0' },
});
