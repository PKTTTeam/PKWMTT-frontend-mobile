import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { createSettingsStyle } from './SettingsStyles.ts';
import { Theme } from '../../../styles/globalTheme/theme';
import { useSettingsStore } from '../../../store/settingsStore.ts';
import RepresentativeAuthModal from '../../../components/modals/RepresentativeAuthModal.tsx';
import { useAuthStore } from '../../../store/authStore.ts';
import { useTimetableStore } from '../../../store/timetableStore.ts';
import LanguageCard from '../../../components/LanguageCard.tsx';
import { ShowEmptySlotsToggle, ShowLectures, ToggleTheme } from './components/SwitchComponents';
import { ValidationErrors } from './components/ValidationErrors';
import { RepresentativeStatus } from './components/RepresentativeStatus';
import { GroupCards } from './components/GroupCards';

function SettingsScreen() {
  const options = useSettingsStore(state => state.options);
  const groups = useSettingsStore(state => state.groups);
  const [modalVisible, setModalVisible] = useState(false);
  const repGroup = useAuthStore(state => state.repGroup);
  const role = useAuthStore(state => state.role);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isOffline } = useTimetableStore();
  const { t } = useTranslation();

  // Theme and styles
  const theme = useTheme<Theme>();
  const SettingsStyles = useMemo(() => createSettingsStyle(theme), [theme]);

  // Validation logic
  const validationErrors = useMemo(() => {
    const errors = new Set<string>();

    if (!groups.dean) errors.add('dean');

    // Check LPK groups
    const hasLPKGroups = 
      options.lab.length > 0 ||
      options.proj.length > 0 ||
      options.comp.length > 0;

    if (hasLPKGroups) {
      if (options.lab.length > 0 && !groups.lab) errors.add('lab');
      if (options.proj.length > 0 && !groups.proj) errors.add('proj');
      if (options.comp.length > 0 && !groups.comp) errors.add('comp');
    }

    return errors;
  }, [groups, options]);

  const hasError = useCallback(
    (groupKey: string) => validationErrors.has(groupKey),
    [validationErrors],
  );

  // Show success toast when validation passes
  const [wasValid, setWasValid] = useState<boolean | null>(null);
  const isValid = validationErrors.size === 0;

  useEffect(() => {
    if (isValid && wasValid === false) {
      Toast.show({
        type: 'success',
        text1: t('toastSaveMessage1'),
        text2: t('toastSaveMessage2'),
        visibilityTime: 2000,
      });
    }
    setWasValid(isValid);
  }, [isValid, wasValid, t]);

  // Rendered group cards
  const groupCards = useMemo(() => {
    return (
      <GroupCards
        options={options}
        isOffline={isOffline}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        hasError={hasError}
      />
    );
  }, [options, isOffline, activeDropdown, hasError]);

  return (
    <View style={SettingsStyles.bgContainer}>
      <ScrollView>
        <View style={SettingsStyles.container}>
          {/* Student Groups Section */}
          <Text style={SettingsStyles.labelText}>
            {t('studentGroups') || 'Grupy Studenckie'}
          </Text>

          <ValidationErrors hasErrors={validationErrors.size > 0} />

          <View style={[SettingsStyles.studentGroups, SettingsStyles.elementsSpacing]}>
            {groupCards}
          </View>

          {/* Toggles Section */}
          <View style={SettingsStyles.elementsSpacing}>
            <ShowEmptySlotsToggle />
            <ShowLectures />
          </View>

          {/* Appearance Section */}
          <View style={SettingsStyles.elementsSpacing}>
            <Text style={SettingsStyles.labelText}>{t('appApperance')}</Text>
          </View>
          
          <View style={SettingsStyles.elementsSpacing}>
            <LanguageCard
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
            <ToggleTheme />
          </View>

          {/* Representative Section */}
          <View style={SettingsStyles.elementsSpacing}>
            <RepresentativeStatus
              role={role}
              repGroup={repGroup}
              onShowModal={() => setModalVisible(true)}
            />
          </View>

          <RepresentativeAuthModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </ScrollView>
      <Toast autoHide position="bottom" />
    </View>
  );
}

export default SettingsScreen;
