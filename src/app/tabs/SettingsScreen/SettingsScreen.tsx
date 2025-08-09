import React from 'react';
import { View, Text, FlatList } from 'react-native';

import GlobalStyles from '../../../styles/globalStyles.ts';
import SettingsStyles from './SettingsStyles.ts';

import GroupSelect from '../../../components/ui/GroupSelectDropdown.tsx';
import Switch from '../../../components/ui/Switch.tsx';

const settingsData = [
  {
    key: 'groups',
    render: () => (
      <>
        <Text style={SettingsStyles.labelText}>Grupy Studenckie</Text>
        <View
          style={[SettingsStyles.studentGroups, SettingsStyles.elementsSpacing]}
        >
          <GroupSelect groupName="Dziekańska" />
          <GroupSelect groupName="Laboratoryjna" />
          <GroupSelect groupName="Komputerowa" />
        </View>
        <View
          style={[SettingsStyles.studentGroups, SettingsStyles.elementsSpacing]}
        >
          <GroupSelect groupName="Projektowa" />
          <GroupSelect groupName="Ćwiczeniowa" />
        </View>
      </>
    ),
  },
  {
    key: 'notifications',
    render: () => (
      <>
        <Text
          style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
        >
          Powiadomienia
        </Text>
        <View style={SettingsStyles.notificationsContainer}>
          <View style={[SettingsStyles.notifications]}>
            <Switch label="Egzamin" />
            <Switch label="Kolokwium" />
          </View>
          <View
            style={[
              SettingsStyles.notifications,
              SettingsStyles.elementsSpacing,
            ]}
          >
            <Switch label="Zaliczenie" />
            <Switch label="Projekt" />
          </View>
        </View>
        <View
          style={[
            SettingsStyles.notificationsMid,
            SettingsStyles.elementsSpacing,
          ]}
        >
          <Switch label="Aktualizacje rozkładu" />
          <View style={SettingsStyles.groupsContainer}>
            <Text style={GlobalStyles.whiteText}>Przypomnij przed</Text>
            <GroupSelect groupName="" />
          </View>
        </View>
      </>
    ),
  },
  {
    key: 'appearance',
    render: () => (
      <>
        <Text
          style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
        >
          Wygląd Aplikacji
        </Text>
        <View style={SettingsStyles.notificationsMid}>
          <View style={SettingsStyles.elementsSpacing}>
            <Switch label="Tryb ciemny" />
          </View>
          <View style={SettingsStyles.elementsSpacing}>
            <Switch label="Czcionka powiększona" />
          </View>
        </View>
      </>
    ),
  },
  {
    key: 'language',
    render: () => (
      <>
        <Text
          style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
        >
          Język Aplikacji
        </Text>
        <GroupSelect groupName="" listPosUp={true} />
      </>
    ),
  },
];

function SettingsScreen() {
  return (
    <View style={SettingsStyles.bgContainer}>
      <FlatList
        contentContainerStyle={SettingsStyles.container}
        data={settingsData}
        renderItem={({ item }) => <View>{item.render()}</View>}
        keyExtractor={item => item.key}
      />
    </View>
  );
}

export default SettingsScreen;
