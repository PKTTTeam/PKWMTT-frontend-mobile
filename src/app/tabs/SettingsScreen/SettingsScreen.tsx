import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import SettingsStyles from './SettingsStyles.ts';
import Switch from '../../../components/ui/Switch.tsx';
import { useSettingsStore } from '../../../store/settingsStore.ts';
import RepresentativeAuthModal from '../../../components/modals/RepresentativeAuthModal.tsx';
import GroupCard from '../../../components/GroupCard.tsx';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../../../store/authStore.ts';

const ShowEmptySlotsToggle = () => {
  const showEmptySlots = useSettingsStore(state => state.showEmptySlots);
  const setShowEmptySlots = useSettingsStore(
    state => state.actions.setShowEmptySlots,
  );

  return (
    <Switch
      label="Pokaz wolne godziny"
      value={showEmptySlots}
      onChange={setShowEmptySlots}
    />
  );
};

function SettingsScreen() {
  const options = useSettingsStore(state => state.options);
  const [modalVisible, setModalVisible] = useState(false);
  const repGroup = useAuthStore(state => state.repGroup);
  const role = useAuthStore(state => state.role);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <View style={SettingsStyles.bgContainer}>
      <PaperProvider>
        <FlatList
          data={[]}
          keyExtractor={() => 'dummy'}
          renderItem={() => null}
          ListHeaderComponent={
            <View style={SettingsStyles.container}>
              <Text style={SettingsStyles.labelText}>Grupy Studenckie</Text>
              <View
                style={[
                  SettingsStyles.studentGroups,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                <View style={{ zIndex: 5000 }}>
                  <GroupCard
                    groupTitle="Dziekańska"
                    groupName="GG"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                </View>
                {options.lab.length !== 0 && (
                  <GroupCard
                    groupTitle="Laboratoryjna"
                    groupName="L"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                )}
                {options.comp.length !== 0 && (
                  <GroupCard
                    groupTitle="Komputerowa"
                    groupName="K"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                )}
                {options.proj.length !== 0 && (
                  <GroupCard
                    groupTitle="Projektowa"
                    groupName="P"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                )}
              </View>

              <View style={SettingsStyles.elementsSpacing}>
                <ShowEmptySlotsToggle />
              </View>

              <Text
                style={[
                  SettingsStyles.labelText,
                  SettingsStyles.elementsSpacing,
                ]}
              >
                Autoryzacja
              </Text>

              <View style={SettingsStyles.elementsSpacing}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#8d95fe',
                    paddingVertical: 12,
                    borderRadius: 6,
                    marginRight: 8,
                    marginBottom: 5,
                  }}
                  onPress={() => setModalVisible(true)}
                  disabled={!!repGroup}
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

                {repGroup && role && (
                  <View style={SettingsStyles.elementsSpacing}>
                    <Text style={SettingsStyles.labelText}>
                      Status: {role}, {repGroup}
                    </Text>
                  </View>
                )}
              </View>

              <RepresentativeAuthModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />

              <Toast autoHide position="bottom" />
            </View>
          }
        />
      </PaperProvider>
    </View>
  );
}

export default SettingsScreen;
