import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { DropdownMenuProps } from '../../types/uiTypes/DropdownMenuTypes';
import MenuStyles from '../../styles/uiStyles/DropdownMenuStyles';

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  width,
  height,
  listPosUp,
  items,
  selectedValue,
  onSelect,
  isOpen,
  onOpen,
  onClose,
}) => {

  return (
    <View style={[{ width: width ?? 85, height: height ?? 40 }]}>
      <TouchableOpacity
        style={[MenuStyles.button, MenuStyles.buttonSizes]}

        onPress={() => (isOpen ? onClose() : onOpen())}

      >
        <Text style={MenuStyles.groupSelectText}>
          {selectedValue || 'none'}
        </Text>
      </TouchableOpacity>

      {isOpen && (

        <View
          style={[
            MenuStyles.modal,
            MenuStyles.list,
            /* eslint-disable-next-line react-native/no-inline-styles */
            {
              top: listPosUp ? '-400%' : '100%',
            },
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {

                  onSelect(item);
                  onClose();

                }}
                style={MenuStyles.option}
              >
                <Text style={MenuStyles.groupSelectText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropdownMenu;
