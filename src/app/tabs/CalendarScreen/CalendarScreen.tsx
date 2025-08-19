import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarTT from '../../../components/CalendarTT';

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <CalendarTT />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 16,
  },
});

export default CalendarScreen;
