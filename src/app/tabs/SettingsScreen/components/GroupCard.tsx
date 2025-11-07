import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  LucideFlaskConical,
  LucideUsers,
  LucideMonitor,
  LucideFolder,
} from 'lucide-react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../../../styles/globalTheme/theme';
import GroupSelect from '../../../../components/ui/GroupSelectModal';
import type { ReactElement } from 'react';
import { GroupSelectTypes } from '../../../../types/uiTypes/GroupSelectTypes';

const createGroupCardStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingHorizontal: 15,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#2e2e2e',

      zIndex: 1000,
    },
    label: {
      flex: 1,
      color: colors.textPrimary,
      fontSize: 15,
      fontWeight: '500',
      height: '100%',
      textAlign: 'center',
    },
    leftSection: {
      display: 'flex',
      width: '60%',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      padding: 10,
      borderRadius: 10,
    },
    dropdownContainer: {
      height: 40,
      width: '35%',
    },
    GG: { backgroundColor: '#059669' }, // green
    L: { backgroundColor: '#dc2626' }, // red
    K: { backgroundColor: '#ea580c' }, // orange
    P: { backgroundColor: '#4b5563' }, // gray
  });
};

const iconMap: Record<string, ReactElement> = {
  GG: <LucideUsers size={20} color={'white'} />,
  L: <LucideFlaskConical size={20} color="white" />,
  K: <LucideMonitor size={20} color="white" />,
  P: <LucideFolder size={20} color="white" />,
};

const GroupCard: React.FC<GroupSelectTypes> = ({
  groupTitle,
  groupName,
  activeDropdown,
  setActiveDropdown,
  hasError,
  isOffline,
}) => {
  const theme = useTheme<Theme>();
  const styles = createGroupCardStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={[styles[groupName], styles.icon]}>
          {iconMap[groupName]}
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {groupTitle}
        </Text>
      </View>
      <View style={styles.dropdownContainer}>
        <GroupSelect
          isOffline={isOffline}
          groupTitle={''}
          groupName={groupName}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          hasError={hasError}
        />
      </View>
    </View>
  );
};

export default GroupCard;
