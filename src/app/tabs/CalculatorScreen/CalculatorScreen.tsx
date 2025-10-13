import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './CalculatorStyles';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { getSubjectList } from '../../../services/calculator/CalculatorService';
import { useSettingsStore } from '../../../store/settingsStore';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CalcItem = {
  key: string;
  subjectName: string;
  ects: string;
  grade: string;
};

function CalculatorScreen() {
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

  const fetchSubjectList = React.useCallback(async () => {
    if (!deanGroup) {
      console.warn('Dean group was not choosed.');
      return;
    }
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
      if (response) {
        setAllSubjects(response);
      }
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
      if (jsonValue != null) {
        setSubjectList(JSON.parse(jsonValue));
      }
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

  const averageGrade = () => {
    if (subjectList.length === 0) return '0.00';
    const total = subjectList.reduce(
      (sum, item) => sum + parseFloat(item.grade),
      0,
    );
    return (total / subjectList.length).toFixed(2);
  };

  const totalEcts = () => {
    if (subjectList.length === 0) return 0;
    return subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0);
  };

  const weightedAverage = () => {
    if (subjectList.length === 0) return '0.00';
    const totalWeightedGrades = subjectList.reduce(
      (sum, item) => sum + parseFloat(item.grade) * parseInt(item.ects, 10),
      0,
    );
    const totalEctsPoints = totalEcts();
    return (totalWeightedGrades / totalEctsPoints).toFixed(2);
  };

  const handleCancel = () => {
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);
    setPopUpMenuVisible(false);
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
    setEctsFocused(false);
    setGradeFocused(false);
  };

  const addSubject = () => {
    let hasError = false;
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);

    if (!subjectName.trim()) {
      setSubjectError('Wybierz przedmiot');
      hasError = true;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      setEctsError('Podaj poprawną wartość ECTS');
      hasError = true;
    }

    const gradeRegex = /^(2(\.0)?|2\.5|3(\.0)?|3\.5|4(\.0)?|4\.5|5(\.0)?)$/;
    if (!gradeRegex.test(grade)) {
      setGradeError('Podaj poprawną ocenę');
      hasError = true;
    }

    if (hasError) return;

    const newItem: CalcItem = {
      key: uuid.v4().toString(),
      subjectName,
      ects: ectsPoints,
      grade,
    };
    setSubjectList([...subjectList, newItem]);
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
    setPopUpMenuVisible(false);
  };

  const selectItem = (key: string) => {
    setSelectedItems(
      selectedItems.includes(key)
        ? selectedItems.filter(k => k !== key)
        : [...selectedItems, key],
    );
  };

  const selectAllItems = () => {
    setSelectedItems(
      selectedItems.length === subjectList.length
        ? []
        : subjectList.map(item => item.key),
    );
  };

  const deleteSelectedItems = () => {
    setSelectedItems([]);
    setSubjectList(
      subjectList.filter(item => !selectedItems.includes(item.key)),
    );
  };

  const changeSelectedItemsIcon = () => {
    if (
      selectedItems.length === subjectList.length &&
      selectedItems.length > 0
    ) {
      return iconCheck;
    } else if (
      selectedItems.length < subjectList.length &&
      selectedItems.length > 0
    ) {
      return iconSquare;
    } else {
      return '';
    }
  };

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState<CalcItem | null>(null);

  const openEditMenu = (item: CalcItem) => {
    setItemBeingEdited(item);
    setSubjectName(item.subjectName);
    setEctsPoints(item.ects);
    setGrade(item.grade);
    setEditModalVisible(true);
  };

  const handleEditConfirm = () => {
    if (!itemBeingEdited) return;

    let hasError = false;
    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);

    if (!subjectName.trim()) {
      setSubjectError('Wybierz przedmiot');
      hasError = true;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      setEctsError('Podaj poprawną wartość ECTS');
      hasError = true;
    }

    const gradeRegex = /^(2(\.0)?|2\.5|3(\.0)?|3\.5|4(\.0)?|4\.5|5(\.0)?)$/;
    if (!gradeRegex.test(grade)) {
      setGradeError('Podaj poprawną ocenę');
      hasError = true;
    }

    if (hasError) return;

    const updatedList = subjectList.map(subj =>
      subj.key === itemBeingEdited.key
        ? { ...subj, subjectName, ects: ectsPoints, grade }
        : subj,
    );
    setSubjectList(updatedList);

    setEditModalVisible(false);
    setItemBeingEdited(null);
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setItemBeingEdited(null);
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
  };

  const renderItem = ({ item }: { item: CalcItem }) => {
    const isSelected = selectedItems.includes(item.key);
    return (
      <TouchableOpacity onPress={() => openEditMenu(item)}>
        <View style={styles.rootItemContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
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
      {/* Header row with select all */}
      <View style={styles.headerRootItemContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={selectAllItems}>
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

      <View style={styles.summaryContainer}>
        <View style={styles.summarySpacer}>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            {t('gradeAverage')}
          </Text>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            {t('ectsSum')}
          </Text>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            {t('weightedAverage')}
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

      {/* Popup for adding subject */}
      {popUpMenuVisible && (
        <View style={styles.overlayContainer}>
          <View style={styles.popUpMenu}>
            <Text style={styles.overlayLabel}>{t('addSubject')}</Text>
            <Text style={styles.Label}>{t('addSubjectText')}</Text>

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

            <TouchableOpacity style={styles.confirmButton} onPress={addSubject}>
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
          <TouchableOpacity
            onPress={() => setPopUpMenuVisible(!popUpMenuVisible)}
          >
            <Text style={styles.addCourseMenuBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Popup for editing subject */}
      {editModalVisible && (
        <View style={styles.overlayContainer}>
          <View style={styles.popUpMenu}>
            <Text style={styles.overlayLabel}>{t('editSubject')}</Text>
            <Text style={styles.Label}>{t('editSubjectText')}</Text>

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
              onPress={handleEditConfirm}
            >
              <Text style={styles.buttonText}>{t('saveChanges')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleEditCancel}
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
