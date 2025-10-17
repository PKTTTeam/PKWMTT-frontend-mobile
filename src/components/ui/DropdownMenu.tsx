import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { DropdownMenuProps } from '../../types/uiTypes/DropdownMenuTypes';
import MenuStyles from '../../styles/uiStyles/DropdownMenuStyles';

const ITEM_HEIGHT = 45;
const MAX_LIST_HEIGHT = 200;

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
  placeholder,
}) => {
  const listHeight = Math.min(items.length * ITEM_HEIGHT, MAX_LIST_HEIGHT);

  return (
    <View style={[{ width: width ?? 130, height: height ?? 40 }]}>
      <TouchableOpacity
        style={[MenuStyles.button, MenuStyles.buttonSizes]}
        onPress={() => (isOpen ? onClose() : onOpen())}
      >
        {selectedValue ? (
          <Text style={MenuStyles.groupSelectText}>{selectedValue}</Text>
        ) : (
          <Text style={MenuStyles.placeholderText}>{placeholder}</Text>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            MenuStyles.modal,
            MenuStyles.list,
            {
              top: listPosUp ? -listHeight : height ?? 40,
              height: listHeight,
            },
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={item => item}
            style={{ flexGrow: 0 }}
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

// Memoize to prevent unnecessary re-renders
  export default React.memo(DropdownMenu);
