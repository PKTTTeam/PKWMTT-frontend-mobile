import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import SettingsStyles from './SettingsStyles.ts';

import GroupSelect from '../../../components/ui/GroupSelectDropdown.tsx';
import Switch from '../../../components/ui/Switch.tsx';
import { useSettingsStore } from '../../../store/settingsStore.ts';
import RepresentativeAuthModal from '../../../components/modals/RepresentativeAuthModal.tsx';
const ShowEmptySlotsToggle = () => {
  const showEmptySlots = useSettingsStore(state => state.showEmptySlots);
  const setShowEmptySlots = useSettingsStore(
    state => state.actions.setShowEmptySlots,
  );

  return (
    <Switch
      label="Pokaz pelen plan"
      value={showEmptySlots}
      onChange={setShowEmptySlots}
    />
  );
};
function SettingsScreen() {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalVisible, setModalVisible] = useState(false);
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
            <View style={SettingsStyles.elementsSpacing}>
              {ShowEmptySlotsToggle()}
            </View>

            <Text
              style={[SettingsStyles.labelText, SettingsStyles.elementsSpacing]}
            >
              Autentykacja
            </Text>
            <View>
              <View
                style={[
                  SettingsStyles.notificationsMid,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                <View style={SettingsStyles.elementsSpacing}>
                  <Button
                    title="Zweryfikuj status starosty"
                    onPress={() => setModalVisible(true)}
                  />
                </View>
              </View>
            </View>
            <RepresentativeAuthModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSubmit={() => null}
            />
          </View>
        </View>
      </PaperProvider>
    </>
  );
}

export default SettingsScreen;
