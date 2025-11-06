import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import GroupCard from '../../../../components/GroupCard.tsx';
import type { GroupKey } from '../../../../store/settingsStoreTypes.d.ts';

// Group cards configuration
const GROUP_CONFIGS = [
  { key: 'dean' as GroupKey, name: 'GG', titleKey: 'deanGroup' },
  { key: 'lab' as GroupKey, name: 'L', titleKey: 'labGroup' },
  { key: 'comp' as GroupKey, name: 'K', titleKey: 'compGroup' },
  { key: 'proj' as GroupKey, name: 'P', titleKey: 'projGroup' },
] as const;

interface GroupCardsProps {
  options: Record<GroupKey, string[]>;
  isOffline: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (value: string | null) => void;
  hasError: (groupKey: string) => boolean;
}

export const GroupCards = ({ 
  options, 
  isOffline, 
  activeDropdown, 
  setActiveDropdown, 
  hasError 
}: GroupCardsProps) => {
  const { t } = useTranslation();

  // Rendered group cards
  const groupCards = useMemo(() => {
    return GROUP_CONFIGS.map(({ key, name, titleKey }) => {
      // Show dean group always, others only if they have options
      if (key !== 'dean' && options[key].length === 0) return null;

      return (
        <GroupCard
          key={key}
          isOffline={isOffline}
          groupTitle={t(titleKey)}
          groupName={name}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          hasError={hasError(key)}
        />
      );
    }).filter(Boolean);
  }, [options, isOffline, t, activeDropdown, setActiveDropdown, hasError]);

  return (
    <View style={{ zIndex: 5000 }}>
      {groupCards}
    </View>
  );
};