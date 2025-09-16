import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import SettingsStyles from './SettingsStyles.ts';

import Switch from '../../../components/ui/Switch.tsx';
import { useSettingsStore } from '../../../store/settingsStore.ts';
import RepresentativeAuthModal from '../../../components/modals/RepresentativeAuthModal.tsx';
import GroupCard from '../../../components/GroupCard.tsx';
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
              <GroupCard groupTitle="Dziekańska" groupName={'GG'} />
              <GroupCard groupTitle="Laboratoryjna" groupName={'L'} />
              <GroupCard groupTitle="Komputerowa" groupName={'K'} />
              <GroupCard groupTitle="Projektowa" groupName={'P'} />
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
              <View style={[SettingsStyles.elementsSpacing]}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#8d95fe',
                    paddingVertical: 12,
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Potwierdź
                  </Text>
                </TouchableOpacity>
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
