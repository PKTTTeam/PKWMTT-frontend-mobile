/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import {
  useSettingsStore,
  useSettingsActions,
} from '../../store/settingsStore';
import GroupSelect from '../../components/ui/GroupSelectDropdown';

export default function FirstTimeSetupScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options);
  const { fetchDependentGroups, setSetupComplete, fetchInitialDeanGroups } =
    useSettingsActions();

  useEffect(() => {
    // Fetch dean groups when the screen first loads
    fetchInitialDeanGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = async () => {
    if (!groups.dean) {
      Alert.alert('Błąd', 'Musisz wybrać grupę dziekańską!');
      return;
    }

    // Fetch dependent groups
    await fetchDependentGroups(groups.dean);
    setSetupComplete(true);
    // Proceed to main app
    onDone();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#181818',
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'InterMedium',
          marginBottom: 10,
          alignSelf: 'center',
          color: 'white',
        }}
      >
        Witaj w PKWMTT!
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'InterLight',
          marginBottom: 10,
          alignSelf: 'center',
          color: '#9c9c9c',
        }}
      >
        Wybierz grupe dziekanska i podgrupy, aby kontynuowac.
      </Text>
      <View style={{ gap: 10 }}>
        <GroupSelect
          groupTitle="Grupa Dziekańska"
          groupName="GG"
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
        {groups.dean && (
          <View style={{ marginBottom: 35, gap: 10 }}>
            {options.lab.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - L"
                groupName="L"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            )}
            {options.comp.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - K"
                groupName="K"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            )}
            {options.proj.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - P"
                groupName="P"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#8d95fe',
          paddingVertical: 12,
          borderRadius: 6,
          marginTop: 20,
          alignSelf: 'center',
          width: '60%',
        }}
        onPress={handleContinue}
      >
        <Text
          style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
        >
          Potwierdź
        </Text>
      </TouchableOpacity>
    </View>
  );
}
