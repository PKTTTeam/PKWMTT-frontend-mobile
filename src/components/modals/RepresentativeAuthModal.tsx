/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { getOtpResponse } from '../../services/settings/SettingsService';
import Toast from 'react-native-toast-message';

import { useAuthStore } from '../../store/authStore';

interface RepresentativeAuthModalProps {
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
  error?: string;
}

const OTP_LENGTH = 6;

const RepresentativeAuthModal: React.FC<RepresentativeAuthModalProps> = ({
  visible,
  onClose,
  loading = false,
  error,
}) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [hasError, setHasError] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const setToken = useAuthStore(state => state.setToken);

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setOtp(Array(OTP_LENGTH).fill(''));
      setHasError(false);
      // Focus first input after a brief delay
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
    }
  }, [visible]);

  // Clear error when user starts typing
  useEffect(() => {
    if (hasError && otp.some(digit => digit !== '')) {
      setHasError(false);
    }
  }, [otp, hasError]);

  const isValidChar = (char: string): boolean => {
    return /^[A-Z0-9]$/i.test(char);
  };

  const handleChange = (value: string, index: number) => {
    const cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (cleanValue.length > 1) {
      // User pasted multiple characters
      const newOtp = [...otp];
      let focusIndex = index;

      // Fill the OTP boxes with the pasted characters
      for (let i = 0; i < cleanValue.length && index + i < OTP_LENGTH; i++) {
        newOtp[index + i] = cleanValue[i];
        focusIndex = index + i;
      }

      setOtp(newOtp);

      // Move focus to the next empty field or the last filled field
      if (focusIndex < OTP_LENGTH - 1) {
        inputsRef.current[focusIndex + 1]?.focus();
      } else {
        inputsRef.current[focusIndex]?.focus();
      }
      return;
    }

    // Single char case
    if (cleanValue && !isValidChar(cleanValue)) return;

    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    if (cleanValue && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const code = otp.join('');
    console.log(code);

    try {
      const res = await getOtpResponse(code);
      console.log(res);
      if (typeof res === 'string') {
        Toast.show({
          type: 'success',
          text1: 'Autoryzacja potwierdzona',
        });
        setToken(res);
      }

      onClose();
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Autoryzacja odrzucona',
      });
      setHasError(true);
      onClose();
    }
  };

  const handleClose = () => {
    setHasError(false);
    onClose();
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Wprowadź kod OTP</Text>

          {(error || hasError) && (
            <Text style={styles.errorText}>
              {error || 'Nieprawidłowy kod OTP. Spróbuj ponownie.'}
            </Text>
          )}

          <View style={styles.otpContainer}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={el => {
                  inputsRef.current[idx] = el;
                }}
                value={digit}
                onChangeText={val => handleChange(val, idx)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, idx)
                }
                style={[
                  styles.otpBox,
                  (hasError || error) && styles.otpBoxError,
                  digit && styles.otpBoxFilled,
                ]}
                keyboardType="default"
                maxLength={idx === 0 ? OTP_LENGTH : 1} // Allow pasting multiple chars in first input
                textAlign="center"
                autoCapitalize="characters"
                placeholder="-"
                placeholderTextColor="#999"
                editable={!loading}
                accessibilityLabel={`OTP digit ${idx + 1}`}
                accessibilityHint="Enter a single character or number"
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              disabled={loading}
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  loading && styles.disabledText,
                ]}
              >
                Anuluj
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                (!isComplete || loading) && styles.disabledButton,
              ]}
              onPress={handleConfirm}
              disabled={!isComplete || loading}
            >
              <Text style={styles.confirmButtonText}>
                {loading ? 'Sprawdzanie...' : 'Potwierdź'}
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxWidth: 400,
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
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 3,
  },
  otpBox: {
    flex: 1, // boxes share available space equally
    maxWidth: 50, // optional: prevent too wide boxes on big screens
    minWidth: 40, // optional: prevent too small boxes
    height: 55,
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#1c1c1c',
  },
  otpBoxFilled: {
    borderColor: '#8d95fe',
    backgroundColor: '#252525',
  },
  otpBoxError: {
    borderColor: '#ff4444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#8d95fe',
    paddingVertical: 14,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledText: {
    color: '#999',
  },
});

export default RepresentativeAuthModal;
