import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GroupSelectStyles from '../../styles/uiStyles/GroupSelectStyles';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface Props {
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
}

const LanguageDropdown: React.FC<Props> = ({
  activeDropdown,
  setActiveDropdown,
}) => {
  const key = 'language';

  const [value, setValue] = useState(i18next.language);
  const [items, setItems] = useState([
    { label: 'Polski', value: 'pl' },
    { label: 'English', value: 'en' },
  ]);

  useEffect(() => {
    setValue(i18next.language);
  }, []);

  const open = activeDropdown === key;
  const { t } = useTranslation();

  return (
    <View style={GroupSelectStyles.menuContainer}>
      <Text style={GroupSelectStyles.text}>{t('language')}</Text>

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
        placeholder="Wybierz język"
        dropDownContainerStyle={{
          backgroundColor: '#222',
          borderColor: '#666',
        }}
        containerStyle={{ width: 180 }}
        style={{
          backgroundColor: '#222',
          borderColor: '#666',
          borderWidth: 1,
          zIndex: 1000,
        }}
        textStyle={{ color: 'white' }}
        searchTextInputStyle={{ color: 'white' }}
        searchContainerStyle={{ backgroundColor: '#222' }}
      />
    </View>
  );
};

export default React.memo(LanguageDropdown);
