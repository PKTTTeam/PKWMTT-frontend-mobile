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
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../styles/globalTheme/theme';

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

  const { t } = useTranslation();

  const theme = useTheme<Theme>();
  const styles = createRepresentativeAuthModalStyles(theme);

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
          text1: t('toastAuthSuccess'),
        });
        setToken(res);
      }

      onClose();
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: t('toastAuthError'),
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
          <Text style={styles.title}>{t('otpTitle')}</Text>

          {(error || hasError) && (
            <Text style={styles.errorText}>{error || t('otpError')}</Text>
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
                {t('cancelButton')}
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
                {loading ? t('checkingConfirmButton') : t('confirmButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const createRepresentativeAuthModalStyles = (theme: Theme) => {
  const colors = {
    overlayBg: 'rgba(0,0,0,0.5)',
    containerBg: theme.colors.Foreground,
    border: theme.colors.border,

    titleText: theme.colors.textPrimary,
    errorText: theme.colors.error,

    otpBorder: '#444',
    otpFilledBorder: theme.colors.confirmAccent,
    otpBg: theme.colors.otpBg,
    otpFilledBg: theme.colors.otpFilledBg,
    otpText: theme.colors.textPrimary,

    // confirmButtonBg: theme.colors.confirmAccent2,
    confirmButtonBg: theme.colors.selectedAccent,
    confirmButtonText: 'white',

    cancelButtonBg: theme.colors.cancelAccent2,
    cancelButtonText: theme.colors.textPrimary,

    disabledButtonBg: '#9e9e9eff',
    disabledText: '#999',
  };

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.overlayBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '85%',
      maxWidth: 400,
      backgroundColor: colors.containerBg,
      borderRadius: theme.borderRads.m,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.titleText,
      textAlign: 'center',
      marginBottom: 24,
    },
    errorText: {
      color: colors.errorText,
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
      flex: 1,
      maxWidth: 50,
      minWidth: 40,
      height: 55,
      borderWidth: 2,
      borderColor: colors.otpBorder,
      borderRadius: theme.borderRads.s,
      fontSize: 24,
      fontWeight: '600',
      color: colors.otpText,
      backgroundColor: colors.otpBg,
      textAlign: 'center',
    },
    otpBoxFilled: {
      borderColor: colors.otpFilledBorder,
      backgroundColor: colors.otpFilledBg,
    },
    otpBoxError: {
      borderColor: colors.errorText,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 10,
    },
    confirmButton: {
      flex: 1,
      backgroundColor: colors.confirmButtonBg,
      paddingVertical: 14,
      borderRadius: theme.borderRads.m,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    confirmButtonText: {
      color: colors.confirmButtonText,
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center',
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.cancelButtonBg,
      paddingVertical: 14,
      borderRadius: theme.borderRads.m,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      color: colors.cancelButtonText,
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center',
    },
    disabledButton: {
      backgroundColor: colors.disabledButtonBg,
    },
    disabledText: {
      color: colors.disabledText,
    },
  });
};

export default RepresentativeAuthModal;
