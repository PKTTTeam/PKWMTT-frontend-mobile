import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { DropdownMenuProps } from '../../types/uiTypes/DropdownMenuTypes.ts';
import MenuStyles from '../../styles/uiStyles/DropdownMenuStyles.ts';

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  width,
  height,
  listPosUp,
}) => {
  const [visible, setVisible] = useState(false);

  const DATA = [
    { id: '1', title: 'Option 1' },
    { id: '2', title: 'Option 2' },
    { id: '3', title: 'Option 3' },
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePress = (item: { id: string; title: string }) => {
    setSelectedId(item.id);
    console.log('Selected:', item.title);
  };

  return (
    <View style={[{ width: width ?? 85, height: height ?? 40 }]}>
      <TouchableOpacity
        style={[MenuStyles.button, MenuStyles.buttonSizes]}
        onPress={() => setVisible(!visible)}
      >
        <Text style={MenuStyles.groupSelectText}>
          {selectedId
            ? DATA.find(item => item.id === selectedId)?.title
            : 'none'}
        </Text>
      </TouchableOpacity>
      {visible && (
        <View
          style={[
            MenuStyles.modal,
            MenuStyles.list,
            // Ternary operator have to be used here to position the dropdown menu according to the  listPosUp value
            // eslint-disable-next-line react-native/no-inline-styles
            {
              top: listPosUp === true ? '-400%' : '100%',
            },
          ]}
        >
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handlePress(item);
                  setVisible(false);
                }}
                style={MenuStyles.option}
              >
                <Text style={[MenuStyles.groupSelectText]}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropdownMenu;
