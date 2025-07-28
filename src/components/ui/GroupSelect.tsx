import React from 'react';
import { View, Text } from 'react-native';

import DropdownMenu from './DropdownMenu';

const GroupSelect = (Props : {groupName: string}) => {
  return (
    <View style={{alignItems: 'center'}}>
    <Text style={{ color: 'white'}}>{Props.groupName}</Text>
      <DropdownMenu />
    </View>
  );
}

export default GroupSelect;