import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  useSettingsStore,
  useSettingsActions,
} from '../../store/settingsStore';
import GroupSelect from '../../components/ui/GroupSelectDropdown';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../styles/globalTheme/theme';

export default function FirstTimeSetupScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createSetupStyles(theme);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(
    new Set(),
  );
  const [showErrors, setShowErrors] = useState(false);

  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options);
  const { fetchDependentGroups, setSetupComplete, fetchInitialDeanGroups } =
    useSettingsActions();

  useEffect(() => {
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
    setShowErrors(true);
    if (!validateGroups()) return;

    await fetchDependentGroups(groups.dean!);
    setSetupComplete(true);
    onDone();
  };

  const hasError = (groupKey: string) => validationErrors.has(groupKey);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcomeText')}</Text>
      <Text style={styles.subtitle}>{t('selectGroupText')}</Text>

      {showErrors && validationErrors.size > 0 && (
        <Text style={styles.errorText}>{t('selectGroupText')}</Text>
      )}

      <View style={styles.dropdownContainer}>
        <GroupSelect
          groupTitle="Grupa Dziekańska"
          groupName="GG"
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          hasError={hasError('dean')}
          isOffline={false}
        />
        {groups.dean && (
          <View style={styles.subGroups}>
            {options.lab.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - L"
                groupName="L"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                hasError={hasError('lab')}
                isOffline={false}
              />
            )}
            {options.comp.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - K"
                groupName="K"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                hasError={hasError('comp')}
                isOffline={false}
              />
            )}
            {options.proj.length !== 0 && (
              <GroupSelect
                groupTitle="Grupa - P"
                groupName="P"
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                hasError={hasError('proj')}
                isOffline={false}
              />
            )}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleContinue}>
        <Text style={styles.confirmButtonText}>{t('confirmButton')}</Text>
      </TouchableOpacity>
    </View>
  );
}

// Themed styles
const createSetupStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.Foreground,
    },
    title: {
      fontSize: 25,
      fontFamily: 'InterMedium',
      marginBottom: 10,
      alignSelf: 'center',
      color: theme.colors.textPrimary,
    },
    subtitle: {
      fontSize: 20,
      fontFamily: 'InterLight',
      marginBottom: 10,
      alignSelf: 'center',
      color: theme.colors.textSecondary,
    },
    errorText: {
      fontSize: 14,
      fontFamily: 'InterLight',
      marginBottom: 20,
      alignSelf: 'center',
      color: theme.colors.error,
      textAlign: 'center',
    },
    dropdownContainer: {
      gap: 10,
      alignItems: 'center',
    },
    subGroups: {
      marginBottom: 35,
      gap: 10,
    },
    confirmButton: {
      backgroundColor: theme.colors.confirmAccent,
      paddingVertical: 12,
      borderRadius: theme.borderRads.m,
      marginTop: 20,
      alignSelf: 'center',
      width: '60%',
    },
    confirmButtonText: {
      color: theme.colors.Foreground,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
