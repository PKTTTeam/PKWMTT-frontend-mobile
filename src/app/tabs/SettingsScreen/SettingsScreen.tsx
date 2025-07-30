import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import GlobalStyles from '../../../styles/globalStyles.ts';
// import DropdownMenu from '../../../components/ui/DropdownMenu.tsx';
import GroupSelect from '../../../components/ui/GroupSelect.tsx';
import Switch from '../../../components/ui/Switch.tsx';

function SettingsScreen() {
  return (
    <> 
      <PaperProvider>
        <View style={settingsStyles.bgContainer}>
          <View style={settingsStyles.container}>
            <Text style={settingsStyles.labelText}>Grupy Studenckie</Text>
            <View
              style={[
                settingsStyles.studentGroups,
                settingsStyles.elementsSpacing,
              ]}
            >
              <GroupSelect groupName="Dziekańska" />
              <GroupSelect groupName="Laboratoryjna" />
              <GroupSelect groupName="Komputerowa" />
            </View>
            <View
              style={[
                settingsStyles.studentGroups,
                settingsStyles.elementsSpacing,
              ]}
            >
              <GroupSelect groupName="Projektowa" />
              <GroupSelect groupName="Ćwiczeniowa" />
            </View>
            <Text
              style={[settingsStyles.labelText, settingsStyles.elementsSpacing]}
            >
              Powiadomienia
            </Text>
            <View>
              <View style={settingsStyles.notifications}>
                <Switch label="Egzamin" />
                <Switch label="Kolokwium" />
              </View>
              <View
                style={[
                  settingsStyles.notifications,
                  settingsStyles.elementsSpacing,
                ]}
              >
                <Switch label="Zalcizenie" />
                <View style={settingsStyles.elementsSpacing}>
                  <Switch label="Projekt       " />
                </View>
              </View>
              <View
                style={[
                  settingsStyles.notificationsMid,
                  settingsStyles.elementsSpacing,
                ]}
              >
                <Switch label="Aktualziacje rozkładu" />
                <View style={settingsStyles.groupsContainer}>
                  <Text style={GlobalStyles.text}>Przypomnij przed</Text>
                  <GroupSelect groupName="" />
                </View>
              </View>
            </View>
            <Text
              style={[settingsStyles.labelText, settingsStyles.elementsSpacing]}
            >
              Wygląd Aplikacji
            </Text>
            <View style={settingsStyles.elementsSpacing}>
              <Switch label="Tryb ciemny" />
            </View>
            <View style={settingsStyles.elementsSpacing}>
              <Switch label="Czcionka powiększona" />
            </View>
            <Text
              style={[settingsStyles.labelText, settingsStyles.elementsSpacing]}
            >
              Język Aplikacji
            </Text>
            <GroupSelect groupName="" listPosUp={true} />
          </View>
        </View>
      </PaperProvider>
    </>
  );
}

const settingsStyles = StyleSheet.create({
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
  groupsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  elementsSpacing: {
    marginTop: 10,
  },
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
    gap: 40,
    flexWrap: 'wrap',
  },
  notificationsMid: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
});


export default SettingsScreen;
