import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActivityLegendModal from './modals/ActivityLegendModal';

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
    color: 'white',
    textAlign: 'right',
  },
});

export const ActivityLegend: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  return (
    <TouchableOpacity style={styles.ActivityTouchable} onPress={openModal}>
      <Icon
        name="info-outline"
        color={'white'}
        size={25}
        style={styles.ActivityIcon}
      />
      <Text style={styles.ActivityText}>Legenda{'\n'}Aktywności</Text>
      <ActivityLegendModal visible={visible} onClose={closeModal} />
    </TouchableOpacity>
  );
};
