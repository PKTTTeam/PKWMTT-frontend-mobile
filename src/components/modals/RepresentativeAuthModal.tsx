import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RepresentativeAuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const RepresentativeAuthModal: React.FC<RepresentativeAuthModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [otp, setOtp] = useState('');

  const handleConfirm = () => {
    const otpRegex = /^[A-Z0-9]{6}$/;

    if (!otpRegex.test(otp)) {
      Alert.alert('Błąd', 'Kod musi składać się z 6 znaków (A-Z, 0-9).');
      return;
    }

    onSubmit(otp);
    setOtp('');
    onClose();
  };

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
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={20}
          >
            <Icon name="close" color="white" size={20} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Wprowadź kod OTP</Text>

          {/* OTP Input */}
          <TextInput
            mode="outlined"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
            style={styles.input}
            theme={{ colors: { background: '#2a2b2b', text: 'white' } }}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Potwierdź</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Anuluj</Text>
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
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#2a2b2b',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#555555',
    paddingVertical: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RepresentativeAuthModal;
