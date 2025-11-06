import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

interface RepresentativeStatusProps {
  role: any;
  repGroup: any;
  onShowModal: () => void;
}

export const RepresentativeStatus = ({ 
  role, 
  repGroup, 
  onShowModal 
}: RepresentativeStatusProps) => {
  const { t } = useTranslation();

  if (role && repGroup) {
    return (
      <Text style={{ marginBottom: 10 }}>
        {t('repOfGroup', { group: repGroup }) || `Starosta grupy ${repGroup}`}
      </Text>
    );
  }

  if (!role) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#8d95fe',
          paddingVertical: 12,
          borderRadius: 6,
          marginRight: 8,
          marginBottom: 5,
        }}
        onPress={onShowModal}
        disabled={!!repGroup}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {t('confirmRepStatus') || 'Potwierdź status starosty'}
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};