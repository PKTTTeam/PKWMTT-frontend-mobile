import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GroupSelectStyles from '../../styles/uiStyles/GroupSelectStyles';
import {
  useSettingsStore,
  useSettingsActions,
} from '../../store/settingsStore';
import type { GroupKey, GroupName } from '../../store/settingsStoreTypes';

interface Props {
  groupTitle: string;
  groupName: GroupName;
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
}

const groupKeyMap: Record<GroupName, GroupKey> = {
  GG: 'dean',
  K: 'comp',
  L: 'lab',
  P: 'proj',
} as const;

const GroupSelectDropdown: React.FC<Props> = ({
  groupTitle,
  groupName,
  activeDropdown,
  setActiveDropdown,
}) => {
  const key = groupKeyMap[groupName];
  const { fetchInitialDeanGroups } = useSettingsActions();
  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options[key]);
  const setGroup = useSettingsActions().setGroup;

  const [value, setValue] = useState(groups[key] || '');
  const [items, setItems] = useState(
    (options || []).map(opt => ({ label: opt, value: opt })),
  );

  useEffect(() => {
    setItems((options || []).map(opt => ({ label: opt, value: opt })));
  }, [options]);

  useEffect(() => {
    if (key === 'dean' && (!options || options.length === 0)) {
      fetchInitialDeanGroups();
    }
  }, [key, options, fetchInitialDeanGroups]);

  useEffect(() => {
    setValue(groups[key] || '');
  }, [groups, key]);

  const open = activeDropdown === key;

  return (
    <View style={GroupSelectStyles.menuContainer}>
      {groupTitle && <Text style={GroupSelectStyles.text}>{groupTitle}</Text>}

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={openValue => {
          const isOpen =
            typeof openValue === 'function' ? openValue(open) : openValue;
          if (isOpen) {
            setActiveDropdown(key); // open this dropdown
          } else {
            setActiveDropdown(null); // close all
          }
        }}
        setValue={val => {
          const newValue = typeof val === 'function' ? val(value) : val;
          setValue(newValue);
          setGroup(key, newValue);
        }}
        setItems={setItems}
        placeholder="Wybierz grupę"
        searchable
        searchPlaceholder="Szukaj..."
        dropDownContainerStyle={{
          backgroundColor: '#222',
          borderColor: '#666',
        }}
        containerStyle={{ width: 130 }}
        style={{ backgroundColor: '#222', borderColor: '#666', zIndex: 1000 }}
        textStyle={{ color: 'white' }}
        searchTextInputStyle={{ color: 'white' }}
        searchContainerStyle={{ backgroundColor: '#222' }}
      />
    </View>
  );
};

export default React.memo(GroupSelectDropdown);
