import React from 'react';
import { View, Text } from 'react-native';

import DropdownMenu from './DropdownMenu';
import GroupSelectStyles from '../../styles/uiStyles/GroupSelectStyles';
import { GroupSelectTypes } from '../../types/uiTypes/GroupSelectTypes';

const GroupSelect: React.FC<GroupSelectTypes> = ({ groupName, listPosUp }) => {
  return (
    <View style={GroupSelectStyles.menuContainer}>
      {groupName === '' ? (
        <DropdownMenu listPosUp={listPosUp} />
      ) : (
        <>
          <Text style={GroupSelectStyles.text}>{groupName}</Text>
          <DropdownMenu listPosUp={listPosUp} />
        </>
      )}
    </View>
  );
};

export default GroupSelect;
