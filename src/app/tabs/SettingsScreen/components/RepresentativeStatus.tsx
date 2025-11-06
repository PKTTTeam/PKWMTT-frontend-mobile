import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styles } from './styles/RepresentativeStatus.styles.ts';

/**
 * Renders the representative section on the Settings screen.
 *
 * - If the user is already a representative and has a group assigned, we show an info text.
 * - If the user is not a representative, we show an action button that opens a modal
 *   to confirm representative status.
 */
interface RepresentativeStatusProps {
  /** Truthy value when the current user is a representative. */
  role: unknown;
  /** Name of the group the user represents (when applicable). */
  repGroup: unknown;
  /** Handler to open the representative confirmation modal. */
  onShowModal: () => void;
}

export const RepresentativeStatus = ({ 
  role, 
  repGroup, 
  onShowModal 
}: RepresentativeStatusProps) => {
  const { t } = useTranslation();

  // Already a representative of some group -> render info text
  if (role && repGroup) {
    return (
      <Text style={styles.statusText}>
        {t('repOfGroup', { group: repGroup }) || `Starosta grupy ${repGroup}`}
      </Text>
    );
  }

  // Not a representative -> show call-to-action button
  if (!role) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onShowModal}
        disabled={!!repGroup}
      >
        <Text style={styles.buttonText}>
          {t('confirmRepStatus') || 'Potwierdź status starosty'}
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};