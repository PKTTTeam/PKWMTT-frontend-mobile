import React, { useState, useRef } from 'react';
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

type CalcItem = {
  key: string;
  subjectName: string;
  ects: string;
  grade: string;
};

/**
 * CalculatorScreen allows users to add, view, and remove subjects with ECTS and grades.
 * It calculates average grade, total ECTS, and weighted average.
 */
function CalculatorScreen() {
  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

  const sbujectInput = useRef<TextInput>(null);
  const ectsInput = useRef<TextInput>(null);
  const gradeInput = useRef<TextInput>(null);

  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [ectsError, setEctsError] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);

  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);

  const iconCheck = '\u2713';
  const iconSquare = '\u25A0';

  const [SubjectFocused, setSubjectFocused] = useState(false);
  const [ectsFocused, setEctsFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);

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
    const total = subjectList.reduce(
      (sum, item) => sum + parseInt(item.ects, 10),
      0,
    );
    return total;
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
    const totalEctsPoints = subjectList.reduce(
      (sum, item) => sum + parseInt(item.ects, 10),
      0,
    );
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
    setSubjectFocused(false);
    setEctsFocused(false);
    setGradeFocused(false);
  };

  /**
   * Adds a new subject to the list after validating input fields.
   */
  const addSubject = () => {
    let hasError = false;

    setSubjectError(null);
    setEctsError(null);
    setGradeError(null);

    if (!subjectName.trim()) {
      setSubjectError('Nazwa przedmiotu jest wymagana');
      hasError = true;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      setEctsError('Podaj prawidłową wartość ECTS');
      hasError = true;
    }

    const gradeFloat = parseFloat(grade);
    if (isNaN(gradeFloat) || gradeFloat < 0) {
      setGradeError('Podaj prawidłową wartość ECTS');
      hasError = true;
    }

    const decimalPart = grade.includes('.') ? grade.split('.')[1] : '';
    if (decimalPart.length > 1) {
      setGradeError('Podaj prawidłową ocenę');
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
   * Removes a subject from the list by key.
   * @param key Subject key to remove
   */

  const deleteSelectedItems = () => {
    setSelectedItems([]);
    setSubjectList(
      subjectList.filter(item => !selectedItems.includes(item.key)),
    );
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectItem = (key: string) => {
    if (selectedItems.includes(key)) {
      setSelectedItems(selectedItems.filter(k => k !== key));
    } else {
      setSelectedItems([...selectedItems, key]);
    }
  };

  const selectAllItems = () => {
    if (selectedItems.length === subjectList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(subjectList.map(item => item.key));
    }
  };

  /**
   * Renders a single subject item in the list.
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
      <View style={styles.headerRootItemContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => selectAllItems()}
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
            Nazwa
          </Text>
          <Text
            style={[
              styles.bottomMenu,
              styles.singleItemHeader,
              styles.centerText,
            ]}
          >
            Wartość ECTS
          </Text>
          <Text
            style={[
              styles.bottomMenu,
              styles.singleItemHeader,
              styles.rightText,
            ]}
          >
            Ocena
          </Text>
        </View>
      </View>

      {subjectList.length === 0 && (
        <View style={styles.noItemsInfo}>
          <Text style={styles.noItemsInfoText}>
            Brak przedmiotów do wyświetlenia
          </Text>
        </View>
      )}

      {/* DEBUG */}
      {/* DEBUG */}

      {/* <Text style={styles.inputErrorFeed}>{selectedItems}</Text> */}

      {/* DEBUG */}
      {/* DEBUG */}

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
            Średnia ocen
          </Text>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            Suma ECTS
          </Text>
          <Text
            style={[styles.countersText, styles.singleItem, styles.centerText]}
          >
            Średnia ważona
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

      {popUpMenuVisible && (
        <View style={styles.overlayContainer}>
          <View style={styles.popUpMenu}>
            <Text style={styles.overlayLabel}>Dodaj przedmiot</Text>
            <Text style={styles.grayLabel}>
              Podaj nazwę przedmiotu, wartość ECTS oraz ocenę.
            </Text>
            <Text
              style={
                subjectError ? styles.overlayLabelErr : styles.overlayLabel
              }
            >
              Nazwa
            </Text>
            <TextInput
              ref={sbujectInput}
              style={
                SubjectFocused && subjectError
                  ? styles.userInputFocusedError
                  : subjectError
                  ? styles.invalidUserInput
                  : SubjectFocused
                  ? styles.userInputFocused
                  : styles.userInput
              }
              placeholder="np. Mechanika"
              placeholderTextColor={'#a1a1a1'}
              value={subjectName}
              onChangeText={setSubjectName}
              onFocus={() => setSubjectFocused(true)}
              onBlur={() => setSubjectFocused(false)}
            />
            {subjectError && (
              <Text style={styles.inputErrorFeed}>{subjectError}</Text>
            )}

            <Text
              style={ectsError ? styles.overlayLabelErr : styles.overlayLabel}
            >
              Wartość ECTS
            </Text>
            <TextInput
              ref={ectsInput}
              style={
                ectsFocused && ectsError
                  ? styles.userInputFocusedError
                  : ectsError
                  ? styles.invalidUserInput
                  : ectsFocused
                  ? styles.userInputFocused
                  : styles.userInput
              }
              placeholder="np. 6"
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
              Ocena
            </Text>
            <TextInput
              ref={gradeInput}
              style={
                gradeFocused && gradeError
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
              <Text style={styles.buttonText}>Potwierdź</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {selectedItems.length > 0 ? (
        <View style={styles.removeCourseMenuBtn}>
          <TouchableOpacity onPress={() => deleteSelectedItems()}>
            <View style={styles.removeButtonContents}>
              <MaterialIcons name="delete" size={24} color="#fff" />
              <Text style={styles.removeCourseMenuBtnText}>
                usuń zaznaczone
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
