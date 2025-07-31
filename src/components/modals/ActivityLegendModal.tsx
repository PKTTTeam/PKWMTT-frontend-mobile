import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LetterIcon from '../ui/letterIcon';
import { getCorrectColor } from '../../utils/getCorrectColor';
import { ActivityLegendModalProps } from '../../types/global';

const activityTypes = [
  { letter: 'W', label: 'Wykład' },
  { letter: 'Ć', label: 'Ćwiczenia' },
  { letter: 'L', label: 'Laboratorium' },
  { letter: 'K', label: 'Laboratorium Komputerowe' },
  { letter: 'P', label: 'Projekt' },
];

const ActivityLegendModal: React.FC<ActivityLegendModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={20}
          >
            <Icon name="close" color="white" size={12} />
          </TouchableOpacity>
          <Text style={styles.title}>Legenda Aktywności</Text>
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
        </View>
      </View>
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
    marginLeft: 130,
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
