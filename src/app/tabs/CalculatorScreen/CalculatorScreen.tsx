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

type CalcItem = {
  key: string;
  subjectName: string;
  ects: string;
  grade: string;
};

/**
 * Main calculator screen for managing subjects, ECTS points, and grades.
 * Allows adding, removing, and listing subjects, and calculates weighted average.
 */
function CalculatorScreen() {
  const { t } = useTranslation();

  // State for subject list and input fields
  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

  // Refs for input fields
  const ectsInput = useRef<TextInput>(null);
  const gradeInput = useRef<TextInput>(null);

  // Error states for validation
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [ectsError, setEctsError] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);

  // Popup menu visibility
  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);

  // Focus states for input styling
  const [ectsFocused, setEctsFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);

  // Selection for batch delete
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Unicode icons for selection
  const iconCheck = '\u2713';
  const iconSquare = '\u25A0';

  // Get dean group from settings store
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

  /**
   * Calculates the average grade for all subjects.
   * @returns {string} Average grade as string with 2 decimals.
   */
  const averageGrade = () => {
    if (subjectList.length === 0) return '0.00';
    const total = subjectList.reduce(
      (sum, item) => sum + parseFloat(item.grade),
      0,
    );
    return (total / subjectList.length).toFixed(2);
  };

  /**
   * Calculates the total ECTS points for all subjects.
   * @returns {number} Total ECTS points.
   */
  const totalEcts = () => {
    if (subjectList.length === 0) return 0;
    return subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0);
  };

  /**
   * Calculates the weighted average grade based on ECTS points.
   * @returns {string} Weighted average as string with 2 decimals.
   */
  const weightedAverage = () => {
    if (subjectList.length === 0) return '0.00';
    const totalWeightedGrades = subjectList.reduce(
      (sum, item) => sum + parseFloat(item.grade) * parseInt(item.ects, 10),
      0,
    );
    const totalEctsPoints = totalEcts();
    return (totalWeightedGrades / totalEctsPoints).toFixed(2);
  };

  /**
   * Resets input fields and closes the popup menu.
   */
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

  /**
   * Validates and adds a new subject to the list.
   * @returns {void}
   */
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

  /**
   * Selects/deselects an item for batch actions.
   * @param {string} key - Subject key to select/deselect
   */
  const selectItem = (key: string) => {
    setSelectedItems(
      selectedItems.includes(key)
        ? selectedItems.filter(k => k !== key)
        : [...selectedItems, key],
    );
  };

  /**
   * Selects/deselects all items.
   */
  const selectAllItems = () => {
    setSelectedItems(
      selectedItems.length === subjectList.length
        ? []
        : subjectList.map(item => item.key),
    );
  };

  /**
   * Deletes all selected items.
   */
  const deleteSelectedItems = () => {
    setSelectedItems([]);
    setSubjectList(
      subjectList.filter(item => !selectedItems.includes(item.key)),
    );
  };

  /**
   * Returns icon for selection state.
   * @returns {string} Icon character
   */
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

  /**
   * Renders a single subject item.
   * @param {{ item: CalcItem }} param0 - Subject item to render
   * @returns {JSX.Element}
   */
  const renderItem = ({ item }: { item: CalcItem }) => {
    const isSelected = selectedItems.includes(item.key);
    return (
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
          <Text style={[styles.bottomMenu, styles.singleItem, styles.leftText]}>
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

      {/* Empty list info */}
      {subjectList.length === 0 && (
        <View style={styles.noItemsInfo}>
          <Text style={styles.noItemsInfoText}>
            {t('noItemsAddedInfoText')}
          </Text>
          <Text style={styles.noItemsInfoText}>{t('noItemsInfoText')}</Text>
        </View>
      )}

      {/* Subject list */}
      <FlatList
        data={subjectList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />

      {/* Summary row */}
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

      {/* Batch delete or add button */}
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
