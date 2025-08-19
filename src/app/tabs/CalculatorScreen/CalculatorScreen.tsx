import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Work in progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1f1f',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default CalculatorScreen;
