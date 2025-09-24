import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface Props {
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
}

const LanguageCard: React.FC<Props> = ({
  activeDropdown,
  setActiveDropdown,
}) => {
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
            containerStyle={{ width: 130 }}
            style={styles.dropdown}
            textStyle={{ color: 'white' }}
            searchTextInputStyle={{ color: 'white' }}
            searchContainerStyle={{ backgroundColor: '#222' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2e2e2e',
    backgroundColor: '#1f1f1f',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownContainer: {
    marginLeft: 'auto',
  },
  dropdown: {
    backgroundColor: '#222',
    borderColor: '#666',
    borderWidth: 1,
    zIndex: 1000,
  },
  dropDownContainer: {
    backgroundColor: '#222',
    borderColor: '#666',
  },
});

export default React.memo(LanguageCard);
