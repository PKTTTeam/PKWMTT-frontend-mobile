import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

interface RepresentativeAuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const OTP_LENGTH = 6;

const RepresentativeAuthModal: React.FC<RepresentativeAuthModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[A-Z0-9]?$/.test(value.toUpperCase())) return;

    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) inputsRef.current[index + 1].focus();
    if (!value && index > 0) inputsRef.current[index - 1].focus();
  };

  const handleConfirm = () => {
    const code = otp.join('');
    onSubmit(code);
    setOtp(Array(OTP_LENGTH).fill(''));
    onClose();
  };

  const isComplete = otp.every(d => d !== '');

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Wprowadź kod OTP</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={el => {
                  inputsRef.current[idx] = el!;
                }}
                value={digit}
                onChangeText={val => handleChange(val, idx)}
                style={[
                  styles.otpBox,
                  digit === '' && isComplete === false ? {} : {},
                  !digit && isComplete === false ? styles.otpBoxError : {},
                ]}
                keyboardType="default"
                maxLength={1}
                textAlign="center"
                autoCapitalize="characters"
                placeholder="-"
                placeholderTextColor="#999"
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !isComplete && styles.disabledButton,
              ]}
              onPress={handleConfirm}
              disabled={!isComplete}
            >
              <Text style={styles.confirmButtonText}>Potwierdź</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#1e1f1f',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#1c1c1c',
  },
  otpBoxError: {
    borderColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RepresentativeAuthModal;
