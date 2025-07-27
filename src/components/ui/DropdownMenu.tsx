import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Text, Provider } from 'react-native-paper';

import Styles from '../../styles/globalStyles.ts';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const DropdownMenu = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    closeMenu();
  };

  return (
    <>
      <Provider>
        <View>
          <Text style={Styles.text}>Gender</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button mode="outlined" onPress={openMenu}>
                {selected
                  ? OPTIONS.find(o => o.value === selected)?.label
                  : 'Select Gender'}
              </Button>
            }
          >
            {OPTIONS.map(option => (
              <Menu.Item
                key={option.value}
                onPress={() => handleSelect(option.value)}
                title={option.label}
              />
            ))}
          </Menu>
        </View>
      </Provider>
    </>
  );
};

export default DropdownMenu;
