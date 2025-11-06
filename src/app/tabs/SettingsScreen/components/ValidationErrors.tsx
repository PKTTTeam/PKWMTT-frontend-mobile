import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ValidationErrorsProps {
  hasErrors: boolean;
}

export const ValidationErrors = ({ hasErrors }: ValidationErrorsProps) => {
  const { t } = useTranslation();
  
  if (!hasErrors) return null;

  return (
    <Text style={{ color: '#ff6b6b', fontSize: 14, marginBottom: 10 }}>
      {t('selectRequiredGroups') || 'Proszę wybrać wszystkie wymagane grupy'}
    </Text>
  );
};