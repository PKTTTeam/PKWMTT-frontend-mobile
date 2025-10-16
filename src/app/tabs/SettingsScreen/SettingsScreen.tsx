import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { createSettingsStyle } from './SettingsStyles.ts';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import Switch from '../../../components/ui/Switch.tsx';
import { useSettingsStore } from '../../../store/settingsStore.ts';
import RepresentativeAuthModal from '../../../components/modals/RepresentativeAuthModal.tsx';
import GroupCard from '../../../components/GroupCard.tsx';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../../../store/authStore.ts';
import { useTranslation } from 'react-i18next';

import LanguageCard from '../../../components/LanguageCard.tsx';
import { t } from 'i18next';

const ShowEmptySlotsToggle = () => {
  const showEmptySlots = useSettingsStore(state => state.showEmptySlots);
  const setShowEmptySlots = useSettingsStore(
    state => state.actions.setShowEmptySlots,
  );
  const { t } = useTranslation();

  return (
    <Switch
      label={t('freeHoursText')}
      value={showEmptySlots}
      onChange={setShowEmptySlots}
    />
  );
};

const ToggleTheme = () => {
  const currentTheme = useSettingsStore(state => state.themeMode);
  const toggleTheme = useSettingsStore(state => state.actions.toggleMode);

  return (
    <Switch
      label={t('toggleThemeText')}
      value={currentTheme === 'dark'}
      onChange={toggleTheme}
    />
  );
};

const ShowLectures = () => {
  const hideLectures = useSettingsStore(state => state.hideLectures);
  const setHideLectures = useSettingsStore(
    state => state.actions.setHideLectures,
  );
  const { t } = useTranslation();

  return (
    <Switch
      label={t('showLectures')}
      value={hideLectures}
      onChange={setHideLectures}
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

  // theme initialization
  const theme = useTheme<Theme>();
  const SettingsStyles = createSettingsStyle(theme);

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

  const hasError = (groupKey: string) => validationErrors.has(groupKey);

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    validateGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
      return;
    }

    const isValid = validateGroups();

    if (isValid && !wasValid) {
      Toast.show({
        type: 'success',
        text1: t('toastSaveMessage1'),
        text2: t('toastSaveMessage2'),
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
      <FlatList
        data={[]}
        keyExtractor={() => 'dummy'}
        renderItem={() => null}
        ListHeaderComponent={
          <View style={SettingsStyles.container}>
            <Text style={SettingsStyles.labelText}>
              {t('studentGroups') || 'Grupy Studenckie'}
            </Text>

            {validationErrors.size > 0 && (
              <Text
                style={[
                  SettingsStyles.labelText,
                  { color: '#ff6b6b', fontSize: 14, marginBottom: 10 },
                ]}
              >
                {t('selectRequiredGroups') ||
                  'Proszę wybrać wszystkie wymagane grupy'}
              </Text>
            )}

            {/* Student group dropdowns */}
            <View
              style={[
                SettingsStyles.studentGroups,
                SettingsStyles.elementsSpacing,
              ]}
            >
              <View style={{ zIndex: 5000 }}>
                <GroupCard
                  groupTitle={t('deanGroup')}
                  groupName="GG"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('dean')}
                />
              </View>
              {options.lab.length !== 0 && (
                <GroupCard
                  groupTitle={t('labGroup')}
                  groupName="L"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('lab')}
                />
              )}
              {options.comp.length !== 0 && (
                <GroupCard
                  groupTitle={t('compGroup')}
                  groupName="K"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('comp')}
                />
              )}
              {options.proj.length !== 0 && (
                <GroupCard
                  groupTitle={t('projGroup')}
                  groupName="P"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('proj')}
                />
              )}
            </View>

            {/* Toggle and language dropdown */}
            <View style={SettingsStyles.elementsSpacing}>
              <ShowEmptySlotsToggle />
              <ShowLectures />
            </View>
            {/* Theme toggle */}
            <View style={SettingsStyles.elementsSpacing}>
              <ToggleTheme />
            </View>
            <View style={SettingsStyles.elementsSpacing}>
              <Text style={SettingsStyles.labelText}>{t('appApperance')}</Text>
            </View>
            <View style={SettingsStyles.elementsSpacing}>
              <LanguageCard
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </View>

            {/* Rep auth */}
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
                    {t('confirmRepStatus') || 'Potwierdź status starosty'}
                  </Text>
                </TouchableOpacity>
              )}

              {repGroup && role && (
                <View style={SettingsStyles.elementsSpacing}>
                  <Text style={SettingsStyles.labelText}>
                    {t('repOfGroup', { group: repGroup }) ||
                      `Starosta grupy ${repGroup}`}
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
      <Toast autoHide position="bottom" />
    </View>
  );
}

export default SettingsScreen;
