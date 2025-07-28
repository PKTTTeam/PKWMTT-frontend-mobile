import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// import styles from '../../../styles/globalStyles.ts';
// import DropdownMenu from '../../../components/ui/DropdownMenu.tsx';
import GroupSelect from '../../../components/ui/GroupSelect.tsx';
import Switch from '../../../components/ui/Switch.tsx';

function SettingsScreen() {
  return (
    <>
      {/* <View style={[styles.ScreenContainer]}> */}
      <PaperProvider>
        <View style={stylesC.bgContainer}>
          <View style={stylesC.container}>
            {/* Main contents */}
            <Text style={settingsStyles.labelText}>Grupy Studenckie</Text>
            <View style={[settingsStyles.studentGroups, { marginBottom: 16 }]}>
              <GroupSelect groupName="Dziekańska" />
              <GroupSelect groupName="Laboratoryjna" />
              <GroupSelect groupName="Komputerowa" />
            </View>
            <View style={[settingsStyles.studentGroups]}>
              <GroupSelect groupName="Projektowa" />
              <GroupSelect groupName="Ćwiczeniowa" />
            </View>
            <Text
              style={[
                settingsStyles.labelText,
                { marginBottom: 16, marginTop: 16 },
              ]}
            >
              Powiadomienia
            </Text>
            <View>
              <View style={settingsStyles.notifications}>
                <Switch label="Egzamin" />
                <Switch label="Kolokwium" />
              </View>
              <View style={[settingsStyles.notifications, { marginTop: 12 }]}>
                <Switch label="Zalcizenie" />
                <Switch label="Projekt       " />
              </View>
              <View style={[settingsStyles.notifications, { marginTop: 12 }]}>
                <Switch label="Aktualziacje rozkładu" />
              </View>
            </View>
          </View>
        </View>
      </PaperProvider>
    </>
  );
}

const settingsStyles = StyleSheet.create({
  
  labelText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentGroups: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  notifications: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40, // horizontal spacing between columns
    flexWrap: 'wrap',
  },
});

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
