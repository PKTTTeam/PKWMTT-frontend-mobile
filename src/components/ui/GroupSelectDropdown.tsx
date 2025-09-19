import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import DropdownMenu from './DropdownMenu';
import GroupSelectStyles from '../../styles/uiStyles/GroupSelectStyles';
import { GroupSelectTypes } from '../../types/uiTypes/GroupSelectTypes';
import {
  useSettingsStore,
  useSettingsActions,
} from '../../store/settingsStore';
import type { GroupKey, GroupName } from '../../store/settingsStoreTypes';
//GG - general group

const groupKeyMap: Record<GroupName, GroupKey> = {
  GG: 'dean',
  K: 'comp',
  L: 'lab',
  P: 'proj',
} as const;

const GroupSelectDropdown: React.FC<GroupSelectTypes> = ({
  groupTitle,
  groupName,
  listPosUp,
}) => {
  const key = groupKeyMap[groupName as GroupName];
  const { fetchInitialDeanGroups, setActiveDropdown } = useSettingsActions();
  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options[key]);
  const activeDropdown = useSettingsStore(state => state.activeDropdown);
  const setGroup = useSettingsActions().setGroup;

  const dropdownItems = React.useMemo(() => options || [], [options]);

  useEffect(() => {
    if (key === 'dean' && (!options || options.length === 0)) {
      fetchInitialDeanGroups();
    }
  }, [key, options, fetchInitialDeanGroups]);

  const handleOpen = () => setActiveDropdown(key);
  const handleClose = () => setActiveDropdown(null);

  return (
    <View style={GroupSelectStyles.menuContainer}>
      {groupTitle && <Text style={GroupSelectStyles.text}>{groupTitle}</Text>}
      <DropdownMenu
        listPosUp={listPosUp}
        items={dropdownItems}
        selectedValue={groups[key]}
        onSelect={value => setGroup(key, value)}
        isOpen={activeDropdown === key}
        onOpen={handleOpen}
        onClose={handleClose}
        placeholder="Wybierz grupe"
      />
    </View>
  );
};

export default React.memo(GroupSelectDropdown);
