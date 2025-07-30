import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DropdownMenu from './DropdownMenu';

const GroupSelect = (Props: { groupName: string; listPosUp?: boolean }) => {
  return (
    <View style={styles.menuContainer}>
      {Props.groupName === '' ? (
        <DropdownMenu listPosUp={Props.listPosUp} />
      ) : (
        <>
          <Text style={styles.text}>{Props.groupName}</Text>
          <DropdownMenu listPosUp={Props.listPosUp} />
        </>
      )}
      ;
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
  },
  menuContainer: {
    alignItems: 'center',
  },
});

export default GroupSelect;
