import React from 'react';
import { View, Text } from 'react-native';
import {
  LucideFlaskConical,
  LucideUsers,
  LucideMonitor,
  LucideFolder,
} from 'lucide-react-native';
import GroupSelectDropdown from './ui/GroupSelectDropdown';
import { StyleSheet } from 'react-native';
import type { ReactElement } from 'react';
import { GroupSelectTypes } from '../types/uiTypes/GroupSelectTypes';

const GroupCardStyles = StyleSheet.create({
  card: {
    width: 350,
    padding: 20,
    borderRadius: 12,
    margin: 6,
    borderWidth: 1,
    borderColor: '#2e2e2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  icon: {
    padding: 10,
    borderRadius: 10,
  },
  dropdownContainer: {
    marginLeft: 'auto',
  },
  // Color variants
  GG: { backgroundColor: '#059669' }, // green
  L: { backgroundColor: '#dc2626' }, // red
  K: { backgroundColor: '#ea580c' }, // orange
  P: { backgroundColor: '#4b5563' }, // gray
});

const iconMap: Record<string, ReactElement> = {
  GG: <LucideUsers size={20} color="white" />,
  L: <LucideFlaskConical size={20} color="white" />,
  K: <LucideMonitor size={20} color="white" />,
  P: <LucideFolder size={20} color="white" />,
};

const GroupCard: React.FC<GroupSelectTypes> = ({
  groupTitle,
  groupName,
  activeDropdown,
  setActiveDropdown,
}) => {
  return (
    <View style={[GroupCardStyles.card]}>
      <View style={GroupCardStyles.header}>
        <View style={GroupCardStyles.leftSection}>
          <View style={[GroupCardStyles[groupName], GroupCardStyles.icon]}>
            {iconMap[groupName]}
          </View>
          <Text style={GroupCardStyles.label} numberOfLines={1}>
            {groupTitle}
          </Text>
        </View>
        <View style={GroupCardStyles.dropdownContainer}>
          <GroupSelectDropdown
            groupTitle={''}
            groupName={groupName}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </View>
      </View>
    </View>
  );
};

export default GroupCard;
