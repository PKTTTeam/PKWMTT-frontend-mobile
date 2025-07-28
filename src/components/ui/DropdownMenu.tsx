import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';


const DropdownMenu = (Props : {width: number, height: number}) => {
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
    <View style={[{ width: Props.width ?? 85, height: Props.height ?? 40 }]}>
      <TouchableOpacity
      style={[styles.button, { width: '100%', height: '100%' }]}
      onPress={() => setVisible(!visible)}
      >
      <Text style={styles.groupSelectText}>
        {selectedId
        ? DATA.find(item => item.id === selectedId)?.title
        : 'none'}
      </Text>
      </TouchableOpacity>
      {visible && (
      <View style={[styles.modal, { width: '100%', height: '400%', position: 'absolute', zIndex: 100 , top: '100%'}]}>
        <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
            handlePress(item);
            setVisible(false);
          }}
          style={styles.option}
          >
          <Text style={[styles.groupSelectText]}>{item.title}</Text>
          </TouchableOpacity>
        )}
        />
      </View>
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
  groupSelectText: {
    color: 'white',
    fontSize: 12,
  }
});
