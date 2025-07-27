import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import styles from '../../../styles/globalStyles.ts';
import DropdownMenu from '../../../components/ui/DropdownMenu.tsx';

function SettingsScreen() {
  return (
    <>
      {/* <View style={[styles.ScreenContainer]}> */}
      <PaperProvider>
        <View style={stylesC.bgContainer}>
          <View style={stylesC.container}>
            {/* Main contents */}
            <Text style={styles.text}>Settings</Text>
            <DropdownMenu />
          </View>
        </View>
      </PaperProvider>
    </>
  );
}

// Copy from TimetableScreen.tsx styles
const stylesC = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: '#181818',
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1f1f',
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
  },
  weekIndicator: {
    alignItems: 'center',
    marginBottom: 16,
  },
  weekText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '200',
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayTitle: {
    color: '#e5e5ff',
    fontSize: 30,
    fontFamily: 'InterSemiBold',
    textAlign: 'center',
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SettingsScreen;
