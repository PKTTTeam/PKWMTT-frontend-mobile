// components/ui/GroupSelectDropdown.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import DropdownMenu from './DropdownMenu';
import GroupSelectStyles from '../../styles/uiStyles/GroupSelectStyles';
import { GroupSelectTypes } from '../../types/uiTypes/GroupSelectTypes';
import {
  useSettingsStore,
  useSettingsActions,
  GroupName,
  GroupKey,
} from '../../store/settingsStore';

const groupKeyMap: Record<GroupName, GroupKey> = {
  Dziekańska: 'dean',
  Komputerowa: 'comp',
  Laboratoryjna: 'lab',
  Projektowa: 'proj',
} as const;

const GroupSelectDropdown: React.FC<GroupSelectTypes> = ({
  groupName,
  listPosUp,
}) => {
  const key = groupKeyMap[groupName];
  const { fetchInitialDeanGroups, setActiveDropdown } = useSettingsActions();
  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options[key]);
  const activeDropdown = useSettingsStore(state => state.activeDropdown);
  const setGroup = useSettingsActions().setGroup;

  // Only fetch initial dean groups once on mount if this is the dean dropdown
  useEffect(() => {
    if (key === 'dean' && !groups.dean) {
      fetchInitialDeanGroups();
    }
  }, [key, groups.dean, fetchInitialDeanGroups]);

  const handleOpen = () => setActiveDropdown(key);

  const handleClose = () => setActiveDropdown(null);

  return (
    <View style={GroupSelectStyles.menuContainer}>
      <Text style={GroupSelectStyles.text}>{groupName}</Text>
      <DropdownMenu
        listPosUp={listPosUp}
        items={options || []}
        selectedValue={groups[key]}
        onSelect={value => setGroup(key, value)}
        isOpen={activeDropdown === key}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </View>
  );
};

export default GroupSelectDropdown;
