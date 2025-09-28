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

  /**
   * Removes a subject from the list by key.
   * @param key Subject key to remove
   */
  const deleteItem = (key: string) => {
    setSubjectList(subjectList.filter(item => item.key !== key));
  };

  /**
   * Renders a single subject item in the list.
   */
  const renderItem = ({ item }: { item: CalcItem }) => (
    <View style={styles.rootItemContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteItem.bind(null, item.key)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={[styles.bottomMenu, styles.singleItem, styles.leftText]}>
          {item.subjectName}
        </Text>
        <Text style={[styles.bottomMenu, styles.singleItem, styles.centerText]}>
          {item.ects}
        </Text>
        <Text style={[styles.bottomMenu, styles.singleItem, styles.rightText]}>
          {item.grade}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.bottomMenu}>Nazwa</Text>
        <Text style={styles.bottomMenu}>Wartość ECTS</Text>
        <Text style={styles.bottomMenu}>Ocena</Text>
      </View>

      {subjectList.length === 0 && (
        <View style={styles.noItemsInfo}>
          <Text style={styles.noItemsInfoText}>
            Brak przedmiotów do wyświetlenia
          </Text>
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
              style={subjectError ? styles.invalidUserInput : styles.userInput}
              placeholder="np. Mechanika"
              placeholderTextColor={'#a1a1a1'}
              value={subjectName}
              onChangeText={setSubjectName}
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
              style={ectsError ? styles.invalidUserInput : styles.userInput}
              placeholder="np. 6"
              placeholderTextColor={'#a1a1a1'}
              value={ectsPoints}
              onChangeText={setEctsPoints}
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
              style={gradeError ? styles.invalidUserInput : styles.userInput}
              placeholder="np. 4"
              placeholderTextColor={'#a1a1a1'}
              value={grade}
              onChangeText={setGrade}
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
      <View style={styles.addCourseMenuBtn}>
        <TouchableOpacity
          onPress={() => setPopUpMenuVisible(!popUpMenuVisible)}
        >
          <Text style={styles.addCourseMenuBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CalculatorScreen;
