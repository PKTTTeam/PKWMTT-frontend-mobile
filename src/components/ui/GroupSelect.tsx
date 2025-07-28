import React from 'react';
import { View, Text } from 'react-native';

import DropdownMenu from './DropdownMenu';

const GroupSelect = (Props: { groupName: string, listPosUp: boolean}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      {Props.groupName === '' ? (
        <DropdownMenu listPosUp={Props.listPosUp} />
      ) : (
        <>
          <Text style={{ color: 'white' }}>{Props.groupName}</Text>
          <DropdownMenu listPosUp={Props.listPosUp}/>
        </>
      )}
      ;
    </View>
  );
};

export default GroupSelect;
