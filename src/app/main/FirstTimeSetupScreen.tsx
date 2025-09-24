/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
  const [validationErrors, setValidationErrors] = useState<Set<string>>(
    new Set(),
  );

  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options);
  const { fetchDependentGroups, setSetupComplete, fetchInitialDeanGroups } =
    useSettingsActions();

  useEffect(() => {
    // Fetch dean groups when the screen first loads
    fetchInitialDeanGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasLPKGroups =
    options.lab.length > 0 ||
    options.proj.length > 0 ||
    options.comp.length > 0;

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

  const handleContinue = async () => {
    const isValid = validateGroups();

    if (!isValid) {
      return; // Don't proceed if validation fails
    }

    if (!groups.dean) {
      return;
    }

    // Fetch dependent groups
    await fetchDependentGroups(groups.dean);
    setSetupComplete(true);
    // Proceed to main app
    onDone();
  };

  useEffect(() => {
    validateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  // Check if a specific group has validation error
  const hasError = (groupKey: string) => validationErrors.has(groupKey);

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

      {validationErrors.size > 0 && (
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'InterLight',
            marginBottom: 20,
            alignSelf: 'center',
            color: '#ff6b6b',
            textAlign: 'center',
          }}
        >
          Proszę wybrać wszystkie wymagane grupy
        </Text>
      )}

      <View style={{ gap: 10 }}>
        <GroupSelect
          groupTitle="Grupa Dziekańska"
          groupName="GG"
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          hasError={hasError('dean')}
        />
        {groups.dean && (
          <View style={{ marginBottom: 35, gap: 10 }}>
            {options.lab.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - L"
                groupName="L"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                hasError={hasError('lab')}
              />
            )}
            {options.comp.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - K"
                groupName="K"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                hasError={hasError('comp')}
              />
            )}
            {options.proj.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - P"
                groupName="P"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                hasError={hasError('proj')}
              />
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: validationErrors.size === 0 ? '#8d95fe' : '#555',
          paddingVertical: 12,
          borderRadius: 6,
          marginTop: 20,
          alignSelf: 'center',
          width: '60%',
        }}
        onPress={handleContinue}
        disabled={validationErrors.size > 0}
      >
        <Text
          style={{
            color: validationErrors.size === 0 ? 'white' : '#999',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Potwierdź
        </Text>
      </TouchableOpacity>
    </View>
  );
}
