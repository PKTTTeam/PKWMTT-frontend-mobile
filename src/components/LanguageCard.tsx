import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../styles/globalTheme/theme';

interface Props {
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
}

const createLanguageCardStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    card: {
      width: 350,
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.Background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    label: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '500',
    },
    dropdownContainer: {
      marginLeft: 'auto',
    },
    dropdown: {
      backgroundColor: colors.Foreground,
      borderColor: colors.border,
      borderWidth: 1,
      zIndex: 1000,
    },
    dropDownContainer: {
      backgroundColor: colors.Foreground,
      borderColor: colors.border,
    },
    container: {
      width: 130,
    },
    textStyle: {
      color: colors.textPrimary,
    },
    searchTextInput: {
      color: colors.textPrimary,
    },
    searchContainer: {
      backgroundColor: colors.Foreground,
    },
  });
};

const LanguageCard: React.FC<Props> = ({
  activeDropdown,
  setActiveDropdown,
}) => {
  const theme = useTheme<Theme>();
  const styles = createLanguageCardStyles(theme);

  const key = 'language';
  const [value, setValue] = useState(i18next.language);
  const [items, setItems] = useState([
    { label: 'Polski', value: 'pl' },
    { label: 'English', value: 'en' },
  ]);

  const open = activeDropdown === key;
  const { t } = useTranslation();

  useEffect(() => {
    setValue(i18next.language);
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.label}>{t('language')}</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={openValue => {
              const isOpen =
                typeof openValue === 'function' ? openValue(open) : openValue;
              setActiveDropdown(isOpen ? key : null);
            }}
            setValue={val => {
              const newValue = typeof val === 'function' ? val(value) : val;
              setValue(newValue);
              i18next.changeLanguage(newValue);
            }}
            setItems={setItems}
            placeholder={t('selectLanguage') || 'Select language'}
            dropDownContainerStyle={styles.dropDownContainer}
            containerStyle={styles.container}
            style={styles.dropdown}
            textStyle={styles.textStyle}
            searchTextInputStyle={styles.searchTextInput}
            searchContainerStyle={styles.searchContainer}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(LanguageCard);
