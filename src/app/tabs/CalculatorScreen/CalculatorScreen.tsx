import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import styles from './CalculatorStyles';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { getSubjectList } from '../../../services/calculator/CalculatorService';
import { useSettingsStore } from '../../../store/settingsStore';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import createCalculatorStyles from './CalculatorStyles';

type CalcItem = {
  key: string;
  subjectName: string;
  ects: string;
  grade: string;
};

function CalculatorScreen() {
  const theme = useTheme();
  const styles = createCalculatorStyles(theme as Theme);
  const { t } = useTranslation();

  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

  const ectsInput = useRef<TextInput>(null);
  const gradeInput = useRef<TextInput>(null);

  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [ectsError, setEctsError] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);

  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);
  const [ectsFocused, setEctsFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const iconCheck = '\u2713';
  const iconSquare = '\u25A0';

  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const deanGroup = useSettingsStore(state => state.groups.dean);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);

  const [itemBeingEdited, setItemBeingEdited] = useState<CalcItem | null>(null);

  const fetchSubjectList = React.useCallback(async () => {
    if (!deanGroup) return;
    try {
      const response = await getSubjectList(deanGroup.toString());
      return response;
    } catch (error) {
      console.error('Error fetching subject list:', error);
    }
  }, [deanGroup]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetchSubjectList();
      if (response) setAllSubjects(response);
    };
    fetchSubjects();
  }, [deanGroup, fetchSubjectList]);

  const STORAGE_KEY = '@calculator_subject_list';

  const saveSubjectList = async (list: CalcItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('Błąd zapisu listy przedmiotów:', error);
    }
  };

  const loadSubjectList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) setSubjectList(JSON.parse(jsonValue));
    } catch (error) {
      console.error('Błąd odczytu listy przedmiotów:', error);
    }
  };

  useEffect(() => {
    loadSubjectList();
  }, []);
  useEffect(() => {
    saveSubjectList(subjectList);
  }, [subjectList]);

  const averageGrade = () =>
    subjectList.length === 0
      ? '0.00'
      : (
          subjectList.reduce((sum, item) => sum + parseFloat(item.grade), 0) /
          subjectList.length
        ).toFixed(2);

  const totalEcts = () =>
    subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0);

  const weightedAverage = () =>
    subjectList.length === 0
      ? '0.00'
      : (
          subjectList.reduce(
            (sum, item) =>
              sum + parseFloat(item.grade) * parseInt(item.ects, 10),
            0,
          ) / totalEcts()
        ).toFixed(2);

  const resetPopupFields = () => {
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);
    setItemBeingEdited(null);
    setEctsFocused(false);
    setGradeFocused(false);
  };

  const handleCancel = () => {
    resetPopupFields();
    setPopUpMenuVisible(false);
  };

  const validate = () => {
    let hasError = false;
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);

    if (!subjectName.trim()) {
      setSubjectError(t('addSubjectErrorText'));
      hasError = true;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      setEctsError(t('addECTSErrorText'));
      hasError = true;
    }

    const gradeRegex = /^(2(\.0)?|2\.5|3(\.0)?|3\.5|4(\.0)?|4\.5|5(\.0)?)$/;
    if (!gradeRegex.test(grade)) {
      setGradeError(t('addGradeErrorText'));
      hasError = true;
    }

    return !hasError;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    if (itemBeingEdited) {
      setSubjectList(list =>
        list.map(i =>
          i.key === itemBeingEdited.key
            ? { ...i, subjectName, ects: ectsPoints, grade }
            : i,
        ),
      );
    } else {
      setSubjectList([
        ...subjectList,
        {
          key: uuid.v4().toString(),
          subjectName,
          ects: ectsPoints,
          grade,
        },
      ]);
    }

    handleCancel();
  };

  const openAddMenu = () => {
    resetPopupFields();
    setPopUpMenuVisible(true);
  };

  const openEditMenu = (item: CalcItem) => {
    setItemBeingEdited(item);
    setSubjectName(item.subjectName);
    setEctsPoints(item.ects);
    setGrade(item.grade);
    setPopUpMenuVisible(true);
  };

  const selectItem = (key: string) =>
    setSelectedItems(
      selectedItems.includes(key)
        ? selectedItems.filter(k => k !== key)
        : [...selectedItems, key],
    );

  const selectAllItems = () =>
    setSelectedItems(
      selectedItems.length === subjectList.length
        ? []
        : subjectList.map(i => i.key),
    );

  const deleteSelectedItems = () => {
    setSubjectList(subjectList.filter(i => !selectedItems.includes(i.key)));
    setSelectedItems([]);
  };

  const changeSelectedItemsIcon = () =>
    selectedItems.length === subjectList.length && selectedItems.length > 0
      ? iconCheck
      : selectedItems.length > 0
      ? iconSquare
      : '';

  const renderItem = ({ item }: { item: CalcItem }) => {
    const isSelected = selectedItems.includes(item.key);
    return (
      <TouchableOpacity onPress={() => openEditMenu(item)}>
        <View style={styles.rootItemContainer}>
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={() => selectItem(item.key)}
          >
            <Text style={styles.deleteButtonText}>
              {isSelected ? iconCheck : ''}
            </Text>
          </TouchableOpacity>
          <View style={styles.itemContainer}>
            <Text
              style={[styles.bottomMenu, styles.singleItem, styles.leftText]}
            >
              {item.subjectName}
            </Text>
            <Text
              style={[styles.bottomMenu, styles.singleItem, styles.centerText]}
            >
              {item.ects}
            </Text>
            <Text
              style={[styles.bottomMenu, styles.singleItem, styles.rightText]}
            >
              {item.grade}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRootItemContainer}>
        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={selectAllItems}
        >
          <Text style={styles.deleteButtonText}>
            {changeSelectedItemsIcon()}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.bottomMenu,
              styles.singleItemHeader,
              styles.leftText,
            ]}
          >
            {t('subjectName')}
          </Text>
          <Text
            style={[
              styles.bottomMenu,
              styles.singleItemHeader,
              styles.centerText,
            ]}
          >
            ECTS
          </Text>
          <Text
            style={[
              styles.bottomMenu,
              styles.singleItemHeader,
              styles.rightText,
            ]}
          >
            {t('gradeName')}
          </Text>
        </View>
      </View>

      {subjectList.length === 0 && (
        <View style={styles.noItemsInfo}>
          <Text style={styles.noItemsInfoText}>
            {t('noItemsAddedInfoText')}
          </Text>
          <Text style={styles.noItemsInfoText}>{t('noItemsInfoText')}</Text>
        </View>
      )}

      <FlatList
        data={subjectList}
        renderItem={renderItem}
        keyExtractor={i => i.key}
      />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summarySpacer}>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            {t('gradeAverage').replace(' ', '\n')}
          </Text>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            {t('ectsSum').replace(' ', '\n')}
          </Text>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            {t('weightedAverage').replace(' ', '\n')}
          </Text>
        </View>
        <View style={styles.summarySpacer}>
          <Text
            style={[styles.bottomMenu, styles.singleItem, styles.centerText]}
          >
            {averageGrade()}
          </Text>
          <Text
            style={[styles.bottomMenu, styles.singleItem, styles.centerText]}
          >
            {totalEcts()}
          </Text>
          <Text
            style={[styles.bottomMenu, styles.singleItem, styles.centerText]}
          >
            {weightedAverage()}
          </Text>
        </View>
      </View>

      {/* Batch delete / Add button */}
      {selectedItems.length > 0 ? (
        <View style={styles.removeCourseMenuBtn}>
          <TouchableOpacity onPress={deleteSelectedItems}>
            <View style={styles.removeButtonContents}>
              <MaterialIcons name="delete" size={24} color="#fff" />
              <Text style={styles.removeCourseMenuBtnText}>
                {t('removeCourseMenuBtnText')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.addCourseMenuBtn}>
          <TouchableOpacity onPress={openAddMenu}>
            <Text style={styles.addCourseMenuBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add/Edit popup */}
      {popUpMenuVisible && (
        <View style={styles.overlayContainer}>
          <View style={styles.popUpMenu}>
            <Text style={styles.overlayLabel}>
              {itemBeingEdited ? t('editSubject') : t('addSubject')}
            </Text>
            <Text style={styles.Label}>
              {itemBeingEdited ? t('editSubjectText') : t('addSubjectText')}
            </Text>

            {/* Subject */}
            <Text
              style={
                subjectError ? styles.overlayLabelErr : styles.overlayLabel
              }
            >
              {t('subjectName')}
            </Text>
            <View style={styles.Label}>
              <View
                style={
                  subjectError
                    ? styles.subjectSelectError
                    : styles.subjectSelect
                }
              >
                <DropdownMenu
                  items={allSubjects}
                  selectedValue={subjectName}
                  onSelect={setSubjectName}
                  isOpen={subjectDropdownOpen}
                  onOpen={() => setSubjectDropdownOpen(true)}
                  onClose={() => setSubjectDropdownOpen(false)}
                  placeholder={t('placeholderCalc')}
                />
              </View>
            </View>
            {subjectError && (
              <Text style={styles.inputErrorFeed}>{subjectError}</Text>
            )}

            {/* ECTS */}
            <Text
              style={ectsError ? styles.overlayLabelErr : styles.overlayLabel}
            >
              {t('ECTSVal')}
            </Text>
            <TextInput
              ref={ectsInput}
              style={
                ectsError && ectsFocused
                  ? styles.userInputFocusedError
                  : ectsError
                  ? styles.invalidUserInput
                  : ectsFocused
                  ? styles.userInputFocused
                  : styles.userInput
              }
              placeholder={t('placeholderCalc2')}
              placeholderTextColor={'#a1a1a1'}
              value={ectsPoints}
              onChangeText={setEctsPoints}
              keyboardType="numeric"
              onFocus={() => setEctsFocused(true)}
              onBlur={() => setEctsFocused(false)}
            />
            {ectsError && (
              <Text style={styles.inputErrorFeed}>{ectsError}</Text>
            )}

            {/* GRADE */}
            <Text
              style={gradeError ? styles.overlayLabelErr : styles.overlayLabel}
            >
              {t('gradeName')}
            </Text>
            <TextInput
              ref={gradeInput}
              style={
                gradeError && gradeFocused
                  ? styles.userInputFocusedError
                  : gradeError
                  ? styles.invalidUserInput
                  : gradeFocused
                  ? styles.userInputFocused
                  : styles.userInput
              }
              placeholder="np. 4"
              placeholderTextColor={'#a1a1a1'}
              value={grade}
              onChangeText={setGrade}
              keyboardType="numeric"
              onFocus={() => setGradeFocused(true)}
              onBlur={() => setGradeFocused(false)}
            />
            {gradeError && (
              <Text style={styles.inputErrorFeed}>{gradeError}</Text>
            )}

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>{t('confirmButton')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>{t('cancelButton')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default CalculatorScreen;
