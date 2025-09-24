import React, { useState, useEffect } from 'react';
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
  const groups = useSettingsStore(state => state.groups);
  const [modalVisible, setModalVisible] = useState(false);
  const repGroup = useAuthStore(state => state.repGroup);
  const role = useAuthStore(state => state.role);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(
    new Set(),
  );
  const [wasValid, setWasValid] = useState(false);

  // Check if LPK groups are present
  const hasLPKGroups =
    options.lab.length > 0 ||
    options.proj.length > 0 ||
    options.comp.length > 0;

  // Validate groups and update error state
  const validateGroups = () => {
    const errors = new Set<string>();

    if (!groups.dean) errors.add('dean');

    if (hasLPKGroups) {
      if (options.lab.length > 0 && !groups.lab) errors.add('lab');
      if (options.proj.length > 0 && !groups.proj) errors.add('proj');
      if (options.comp.length > 0 && !groups.comp) errors.add('comp');
    }

    setValidationErrors(errors);
    return errors.size === 0;
  };

  // Check if a specific group has validation error
  const hasError = (groupKey: string) => validationErrors.has(groupKey);

  // Validate when groups change
  const [didMount, setDidMount] = useState(false);

  // Run once on mount just to set validation state
  useEffect(() => {
    validateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run later when groups/options actually change
  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
      return;
    }

    const isValid = validateGroups();

    if (isValid && !wasValid) {
      Toast.show({
        type: 'success',
        text1: 'Zapisano',
        text2: 'Ustawienia grup zostały zapisane',
        visibilityTime: 2000,
      });
      setWasValid(true);
    } else if (!isValid && wasValid) {
      setWasValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, options]);

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

              {validationErrors.size > 0 && (
                <Text
                  style={[
                    SettingsStyles.labelText,
                    { color: '#ff6b6b', fontSize: 14, marginBottom: 10 },
                  ]}
                >
                  Proszę wybrać wszystkie wymagane grupy
                </Text>
              )}

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
                    hasError={hasError('dean')}
                  />
                </View>
                {options.lab.length !== 0 && (
                  <GroupCard
                    groupTitle="Laboratoryjna"
                    groupName="L"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    hasError={hasError('lab')}
                  />
                )}
                {options.comp.length !== 0 && (
                  <GroupCard
                    groupTitle="Komputerowa"
                    groupName="K"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    hasError={hasError('comp')}
                  />
                )}
                {options.proj.length !== 0 && (
                  <GroupCard
                    groupTitle="Projektowa"
                    groupName="P"
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    hasError={hasError('proj')}
                  />
                )}
              </View>

              <View style={SettingsStyles.elementsSpacing}>
                <ShowEmptySlotsToggle />
              </View>

              <View style={SettingsStyles.elementsSpacing}>
                {!role && (
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
                      Potwierdź status starosty
                    </Text>
                  </TouchableOpacity>
                )}

                {repGroup && role && (
                  <View style={SettingsStyles.elementsSpacing}>
                    <Text style={SettingsStyles.labelText}>
                      Starosta grupy {repGroup}
                    </Text>
                  </View>
                )}
              </View>

              <RepresentativeAuthModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
            </View>
          }
        />
      </PaperProvider>
      <Toast autoHide position="bottom" />
    </View>
  );
}

export default SettingsScreen;
