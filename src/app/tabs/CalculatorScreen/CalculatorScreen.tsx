import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
// import styles from './CalculatorStyles';
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';
import { getSubjectList } from '../../../services/calculator/CalculatorService';
import { useSettingsStore } from '../../../store/settingsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import createCalculatorStyles from './styles/CalculatorScreen.styles.ts';
import HeaderRow from './components/HeaderRow';
import SummaryPanel from './components/SummaryPanel';
import BatchActions from './components/BatchActions';
import PopupForm from './components/PopupForm';
import { CalcItem } from './types';
import SubjectsList from './components/SubjectsList';

function CalculatorScreen() {
  const theme = useTheme();
  const styles = createCalculatorStyles(theme as Theme);
  const { t } = useTranslation();

  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

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

  // renderItem now lives inside SubjectsList

  return (
    <View style={styles.container}>
      {/* Header row */}
      <HeaderRow
        subjectLabel={t('subjectName')}
        gradeLabel={t('gradeName')}
        onToggleSelectAll={selectAllItems}
        selectedIcon={changeSelectedItemsIcon()}
      />

      {subjectList.length === 0 && (
        <View style={styles.noItemsInfo}>
          <Text style={styles.noItemsInfoText}>
            {t('noItemsAddedInfoText')}
          </Text>
          <Text style={styles.noItemsInfoText}>{t('noItemsInfoText')}</Text>
        </View>
      )}

      <SubjectsList
        data={subjectList}
        selectedItems={selectedItems}
        onToggleSelect={selectItem}
        onPressItem={openEditMenu}
        checkedIcon={iconCheck}
      />

      {/* Summary */}
      <SummaryPanel
        gradeAverageLabel={t('gradeAverage').replace(' ', '\n')}
        ectsSumLabel={t('ectsSum').replace(' ', '\n')}
        weightedAverageLabel={t('weightedAverage').replace(' ', '\n')}
        averageGrade={averageGrade()}
        totalEcts={totalEcts()}
        weightedAverage={weightedAverage()}
      />

      {/* Batch delete / Add button */}
      <BatchActions
        hasSelection={selectedItems.length > 0}
        onDelete={deleteSelectedItems}
        onAdd={openAddMenu}
        removeCourseLabel={t('removeCourseMenuBtnText')}
      />

      {/* Add/Edit popup */}
      <PopupForm
        isVisible={popUpMenuVisible}
        titleLabel={itemBeingEdited ? t('editSubject') : t('addSubject')}
        helperLabel={
          itemBeingEdited ? t('editSubjectText') : t('addSubjectText')
        }
        subjectFieldLabel={t('subjectName')}
        subjectPlaceholder={t('placeholderCalc')}
        ectsLabel={t('ECTSVal')}
        ectsPlaceholder={t('placeholderCalc2')}
        gradeLabel={t('gradeName')}
        gradePlaceholder={'np. 4'}
        confirmLabel={t('confirmButton')}
        cancelLabel={t('cancelButton')}
        subjectError={subjectError}
        ectsError={ectsError}
        gradeError={gradeError}
        subjectName={subjectName}
        ectsPoints={ectsPoints}
        grade={grade}
        onChangeSubject={setSubjectName}
        onChangeEcts={setEctsPoints}
        onChangeGrade={setGrade}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        allSubjects={allSubjects}
        subjectDropdownOpen={subjectDropdownOpen}
        onOpenSubjectDropdown={() => setSubjectDropdownOpen(true)}
        onCloseSubjectDropdown={() => setSubjectDropdownOpen(false)}
        ectsFocused={ectsFocused}
        gradeFocused={gradeFocused}
        setEctsFocused={setEctsFocused}
        setGradeFocused={setGradeFocused}
      />
    </View>
  );
}

export default CalculatorScreen;
