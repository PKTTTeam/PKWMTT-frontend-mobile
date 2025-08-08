import React from 'react';
import { View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import SettingsStyles from './SettingsStyles.ts';

import GroupSelect from '../../../components/ui/GroupSelectDropdown.tsx';
import Switch from '../../../components/ui/Switch.tsx';
import { useSettingsStore } from '../../../store/settingsStore.ts';

const ShowEmptySlotsToggle = () => {
  const showEmptySlots = useSettingsStore(state => state.showEmptySlots);
  const setShowEmptySlots = useSettingsStore(
    state => state.actions.setShowEmptySlots,
  );
};

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
            </View>
            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
            >
              Powiadomienia
            </Text>
            <View>
              <View style={SettingsStyles.notifications}>
                <Switch label="Egzamin" value={false} onChange={() => null} />
                <Switch label="Kolokwium" value={false} onChange={() => null} />
              </View>
              <View
                style={[
                  SettingsStyles.notifications,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                <Switch
                  label="Zaliczenie"
                  value={false}
                  onChange={() => null}
                />
                <View style={SettingsStyles.elementsSpacing}>
                  <Switch
                    label="Projekt       "
                    value={false}
                    onChange={() => null}
                  />
                </View>
              </View>
              <View
                style={[
                  SettingsStyles.notificationsMid,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                <Switch
                  label="Aktualizacje rozkładu"
                  value={false}
                  onChange={() => null}
                />
                <Switch label="Pokaz pelen plan" />
              </View>
            </View>
            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
            >
              Wygląd Aplikacji
            </Text>
            <View style={SettingsStyles.elementsSpacing}>
              <Switch label="Tryb ciemny" value={false} onChange={() => null} />
            </View>
            <View style={SettingsStyles.elementsSpacing}>
              <Switch
                label="Czcionka powiększona"
                value={false}
                onChange={() => null}
              />
            </View>
            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
            >
              Język Aplikacji
            </Text>
          </View>
        </View>
      </PaperProvider>
    </>
  );
}

export default SettingsScreen;
