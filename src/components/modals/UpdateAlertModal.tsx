import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UpdateAlertModalProps {
  visible: boolean;
  currentVersion: string;
  latestVersion: string;
  onClose: () => void;
}

const UpdateAlertModal: React.FC<UpdateAlertModalProps> = ({
  visible,
  currentVersion,
  latestVersion,
  onClose,
}) => {
  const { t } = useTranslation();

  //   const handleUpdate = async () => {
  //     const response: string = await apiFetch('apk/download');
  //     console.log(response);
  //   };

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
            <Icon name="close" color="white" size={16} />
          </TouchableOpacity>

          <Icon
            name="system-update"
            size={40}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.title}>{t('updateAvailable')}</Text>
          <Text style={styles.message}>
            {t('updateMessage', { currentVersion, latestVersion })}
          </Text>

          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>{t('updateButton')}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>{t('closeButton')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1e1f1f',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  updateButton: {
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#555555',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdateAlertModal;
