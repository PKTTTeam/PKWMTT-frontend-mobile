import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const DropdownMenu = () => {
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(!visible)}
      >
        <Text>{selectedId ? parseInt(selectedId.toString(), 10) : 'Select an option'}</Text>
      </TouchableOpacity>
      {visible && (
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {handlePress(item); setVisible(!visible);}} style={styles.option}>
              <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    margin: 32,
    alignItems: 'center',
  },
  button: {
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 8,
    width: 200,
  },
  option: {
    padding: 12,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
  },
});
