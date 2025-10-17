import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActivityLegendModal from './modals/ActivityLegendModal';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../styles/globalTheme/theme'; // ścieżkę dostosuj do swojej struktury

export const ActivityLegend: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme<Theme>();

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <TouchableOpacity
      style={[styles.ActivityTouchable]}
      onPress={openModal}
    >
      <Icon
        name="info-outline"
        color={theme.colors.textPrimary}
        size={25}
        style={styles.ActivityIcon}
      />
      <Text
        style={[styles.ActivityText, { color: theme.colors.textPrimary }]}
      >
        {t('activityLegend')}
      </Text>
      <ActivityLegendModal visible={visible} onClose={closeModal} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ActivityTouchable: {
    marginRight: 20,
    alignItems: 'center',
  },
  ActivityIcon: {
    alignSelf: 'flex-end',
  },
  ActivityText: {
    fontSize: 12,
    textAlign: 'right',
  },
});
