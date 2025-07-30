import React from 'react';
import { View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import GlobalStyles from '../../../styles/globalStyles.ts';
import SettingsStyles from './SettingsStyles.ts';

import GroupSelect from '../../../components/ui/GroupSelect.tsx';
import Switch from '../../../components/ui/Switch.tsx';

function SettingsScreen() {
  return (
    <>
      <PaperProvider>
        <View style={SettingsStyles.bgContainer}>
          <View style={SettingsStyles.container}>
            <Text style={SettingsStyles.labelText}>Grupy Studenckie</Text>
            <View
              style={[
                SettingsStyles.studentGroups,
                SettingsStyles.elementsSpacing,
              ]}
            >
              <GroupSelect groupName="Dziekańska" />
              <GroupSelect groupName="Laboratoryjna" />
              <GroupSelect groupName="Komputerowa" />
            </View>
            <View
              style={[
                SettingsStyles.studentGroups,
                SettingsStyles.elementsSpacing,
              ]}
            >
              <GroupSelect groupName="Projektowa" />
              <GroupSelect groupName="Ćwiczeniowa" />
            </View>
            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
            >
              Powiadomienia
            </Text>
            <View>
              <View style={SettingsStyles.notifications}>
                <Switch label="Egzamin" />
                <Switch label="Kolokwium" />
              </View>
              <View
                style={[
                  SettingsStyles.notifications,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                <Switch label="Zalcizenie" />
                <View style={SettingsStyles.elementsSpacing}>
                  <Switch label="Projekt       " />
                </View>
              </View>
              <View
                style={[
                  SettingsStyles.notificationsMid,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                <Switch label="Aktualziacje rozkładu" />
                <View style={SettingsStyles.groupsContainer}>
                  <Text style={GlobalStyles.text}>Przypomnij przed</Text>
                  <GroupSelect groupName="" />
                </View>
              </View>
            </View>
            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
            >
              Wygląd Aplikacji
            </Text>
            <View style={SettingsStyles.elementsSpacing}>
              <Switch label="Tryb ciemny" />
            </View>
            <View style={SettingsStyles.elementsSpacing}>
              <Switch label="Czcionka powiększona" />
            </View>
            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
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

export default SettingsScreen;
