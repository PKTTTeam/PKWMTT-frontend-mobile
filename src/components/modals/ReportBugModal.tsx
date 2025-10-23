import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import { reportBug } from '../../services/settings/SettingsService.ts';

interface ReportBugModalProps {
  visible: boolean;
  onClose: () => void;
}

const ReportBugModal: React.FC<ReportBugModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) setDescription('');
  }, [visible]);

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleSubmit = async () => {
    const body = description.trim();
    if (!body) {
      Toast.show({ type: 'error', text1: t('error') || 'Error', text2: t('enterBugDescription') || 'Please describe the issue.' });
      return;
    }
    try {
      setLoading(true);
      await reportBug(body);
      Toast.show({ type: 'success', text1: t('success') || 'Success', text2: t('bugReportSuccess') || 'Thanks! Your report was sent.' });
      onClose();
    } catch (e: any) {
      Toast.show({ type: 'error', text1: t('error') || 'Error', text2: e?.message || t('bugReportError') || 'Could not send the report.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={handleClose}>
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>{t('reportBug') || 'Report a bug'}</Text>
            <Text style={styles.subtitle}>
              {t('reportBugDescription') || 'Describe the problem you encountered.'}
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder={t('bugPlaceholder') || 'What happened? Steps to reproduce, expected vs actual...'}
              placeholderTextColor="#999"
              style={styles.input}
              multiline
              numberOfLines={5}
              editable={!loading}
              textAlignVertical="top"
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>{t('cancel') || 'Cancel'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonLoading]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>{t('submit') || 'Submit'}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#1e1f1f',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2a2b2f',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3a3b3f',
    minHeight: 120,
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#555555',
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    borderRadius: 6,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonLoading: {
    backgroundColor: '#6f76ff',
    opacity: 0.9,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReportBugModal;
