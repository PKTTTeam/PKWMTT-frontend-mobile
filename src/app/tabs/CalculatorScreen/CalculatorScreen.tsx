import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { getSubjectList } from '../../../services/calculator/CalculatorService';
import { useSettingsStore } from '../../../store/settingsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubjectPopup from './SubjectPopup';
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
  const { t } = useTranslation();
  const deanGroup = useSettingsStore(state => state.groups.dean);
  const STORAGE_KEY = '@calculator_subject_list';

  // --- STATES ---
  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState<CalcItem | null>(null);
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [ectsError, setEctsError] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [ectsFocused, setEctsFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);

  const iconCheck = '\u2713';
  const iconSquare = '\u25A0';

  const theme = useTheme<Theme>();
  const styles = createCalculatorStyles(theme);

  // --- FETCH & STORAGE ---
  const fetchSubjectList = useCallback(async () => {
    if (!deanGroup) return console.warn('Dean group was not choosed.');
    try {
      const response = await getSubjectList(deanGroup.toString());
      return response;
    } catch (error) {
      console.error('Error fetching subject list:', error);
    }
  }, [deanGroup]);

  useEffect(() => {
    fetchSubjectList().then(res => res && setAllSubjects(res));
  }, [fetchSubjectList]);

  const saveSubjectList = async (list: CalcItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('Błąd zapisu listy przedmiotów:', error);
    }
  };
  const loadSubjectList = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setSubjectList(JSON.parse(json));
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

  const totalEcts = () =>
    subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0);
  const averageGrade = () =>
    subjectList.length === 0
      ? '0.00'
      : (
          subjectList.reduce((sum, i) => sum + parseFloat(i.grade), 0) /
          subjectList.length
        ).toFixed(2);
  const weightedAverage = () =>
    subjectList.length === 0
      ? '0.00'
      : (
          subjectList.reduce(
            (sum, i) => sum + parseFloat(i.grade) * parseInt(i.ects, 10),
            0,
          ) / totalEcts()
        ).toFixed(2);

  const resetForm = () => {
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
    setEctsFocused(false);
    setGradeFocused(false);
  };

  const validateForm = () => {
    let hasError = false;
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);
    if (!subjectName.trim()) {
      setSubjectError(t('addSubjectErrorText'));
      hasError = true;
    }
    if (!ectsPoints || parseInt(ectsPoints, 10) <= 0) {
      setEctsError(t('addECTSErrorText'));
      hasError = true;
    }
    if (!/^(2(\.0)?|2\.5|3(\.0)?|3\.5|4(\.0)?|4\.5|5(\.0)?)$/.test(grade)) {
      setGradeError(t('addGradeErrorText'));
      hasError = true;
    }
    return !hasError;
  };

  const handleAddOrEdit = () => {
    if (!validateForm()) return;
    const newItem: CalcItem = {
      key: itemBeingEdited ? itemBeingEdited.key : uuid.v4().toString(),
      subjectName,
      ects: ectsPoints,
      grade,
    };
    setSubjectList(
      itemBeingEdited
        ? subjectList.map(i => (i.key === newItem.key ? newItem : i))
        : [...subjectList, newItem],
    );
    resetForm();
    setPopUpMenuVisible(false);
    setEditModalVisible(false);
    setItemBeingEdited(null);
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

  const openEditMenu = (item: CalcItem) => {
    setItemBeingEdited(item);
    setSubjectName(item.subjectName);
    setEctsPoints(item.ects);
    setGrade(item.grade);
    setEditModalVisible(true);
  };

  const renderItem = ({ item }: { item: CalcItem }) => {
    const isSelected = selectedItems.includes(item.key);
    return (
      <TouchableOpacity onPress={() => openEditMenu(item)}>
        <View style={styles.rootItemContainer}>
          <TouchableOpacity
            style={            selectedItems.length > 0
              ? styles.deleteButtonSelected
              : styles.deleteButtonContainer}
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
      {/** Header */}
      <View style={styles.headerRootItemContainer}>
        <TouchableOpacity
          style={
            selectedItems.length > 0
              ? styles.deleteButtonSelected
              : styles.deleteButtonContainer
          }
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
        keyExtractor={item => item.key}
      />

      {/** Summary */}
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

      {/** Popups */}
      {(popUpMenuVisible || editModalVisible) && (
        <SubjectPopup
          subjectName={subjectName}
          setSubjectName={setSubjectName}
          ectsPoints={ectsPoints}
          setEctsPoints={setEctsPoints}
          grade={grade}
          setGrade={setGrade}
          subjectError={subjectError}
          ectsError={ectsError}
          gradeError={gradeError}
          ectsFocused={ectsFocused}
          gradeFocused={gradeFocused}
          setEctsFocused={setEctsFocused}
          setGradeFocused={setGradeFocused}
          allSubjects={allSubjects}
          subjectDropdownOpen={subjectDropdownOpen}
          setSubjectDropdownOpen={setSubjectDropdownOpen}
          onConfirm={handleAddOrEdit}
          onCancel={() => {
            resetForm();
            setPopUpMenuVisible(false);
            setEditModalVisible(false);
          }}
          title={editModalVisible ? t('editSubject') : t('addSubject')}
          subtitle={
            editModalVisible ? t('editSubjectText') : t('addSubjectText')
          }
        />
      )}

      {/** Footer buttons */}
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
          <TouchableOpacity
            onPress={() => setPopUpMenuVisible(!popUpMenuVisible)}
          >
            <Text style={styles.addCourseMenuBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default CalculatorScreen;
