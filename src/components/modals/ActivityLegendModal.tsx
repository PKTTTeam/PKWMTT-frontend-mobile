import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LetterIcon from '../ui/letterIcon';
import { getCorrectColor } from '../../utils/getCorrectColor';
import { ActivityLegendModalProps } from '../../types/global';
import { useTranslation } from 'react-i18next';

const activityTypes = [
  { letter: 'W', label: 'Wykład' },
  { letter: 'Ć', label: 'Ćwiczenia' },
  { letter: 'L', label: 'Laboratorium' },
  { letter: 'K', label: 'Laboratorium Komputerowe' },
  { letter: 'P', label: 'Projekt' },
  { letter: 'S', label: 'Seminarium' },
  { letter: 'I', label: 'Inne' },
];

const ActivityLegendModal: React.FC<ActivityLegendModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={20}
          >
            <Icon name="close" color="white" size={12} />
          </TouchableOpacity>
          <Text style={styles.title}>{t('activityLegendText')}</Text>
          <View style={styles.items}>
            {activityTypes.map(({ letter, label }) => (
              <View key={letter} style={styles.itemRow}>
                <LetterIcon
                  bgColor={getCorrectColor(letter)}
                  letter={letter}
                  letterColor="white"
                />
                <Text style={styles.itemText}>{label}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1e1f1f',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    color: 'white',
  },
  title: {
    fontSize: 15,
    marginBottom: 12,
    color: 'white',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  items: {
    width: '100%',
    marginTop: 10,
    marginLeft: '50%',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  itemText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
  },
});

export default ActivityLegendModal;
