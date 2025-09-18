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
 * Main calculator screen for managing subjects, ECTS points, and grades.
 * Allows adding, removing and calculates weighted average.
 */
function CalculatorScreen() {
  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

  const sbujectInput = useRef<TextInput>(null);
  const ectsInput = useRef<TextInput>(null);

  const [gradeMenuVisible, setGradeMenuVisible] = useState(false);

  const grades = ['5', '4.5', '4', '3.5', '3', '2.5', '2'];

  /**
   * Selects a grade from the dropdown menu.
   * @param item Selected grade value
   */
  const handleSelect = (item: string) => {
    setGrade(item);
    setGradeMenuVisible(false);
  };

  /**
   * Calculates the weighted average grade based on ECTS points.
   * @returns Weighted average as string
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
   * Adds a new subject to the list after validating input fields.
   */
  const addSubject = () => {
    if (!subjectName.trim()) {
      sbujectInput.current?.focus();
      return;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      ectsInput.current?.focus();
      return;
    }

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
        onPress={() => deleteItem(item.key)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.courseItemContainer}>
        <Text
          style={[styles.courseItemText, styles.singleItem, styles.leftText]}
        >
          {item.subjectName}
        </Text>
        <Text
          style={[styles.courseItemText, styles.singleItem, styles.centerText]}
        >
          {item.ects}
        </Text>
        <Text
          style={[styles.courseItemText, styles.singleItem, styles.rightText]}
        >
          {item.grade}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tile}>
        <View style={styles.tileHeader}>
          <MaterialIcons name="add" size={25} color="white" />
          <Text style={styles.tileTitle}>Dodaj Przedmiot</Text>
        </View>

        <Text style={styles.tileInputName}>Nazwa Kursu</Text>
        <TextInput
          ref={sbujectInput}
          style={styles.userInputField}
          placeholder="Matematyka..."
          placeholderTextColor={styles.userInputField.color}
          value={subjectName}
          onChangeText={setSubjectName}
        />

        <Text style={styles.tileInputName}>Ilość ECTS</Text>
        <TextInput
          ref={ectsInput}
          style={styles.userInputField}
          placeholder="10..."
          placeholderTextColor={styles.userInputField.color}
          value={ectsPoints}
          onChangeText={setEctsPoints}
        />

        <Text style={styles.tileInputName}>Ocena</Text>
        <View>
          <TouchableOpacity
            onPress={() => setGradeMenuVisible(!gradeMenuVisible)}
            style={styles.dropdownButton}
          >
            <Text style={styles.dropdownButtonText}>
              {grade ? `Wybrano: ${grade}` : 'Kliknij aby wybrać ocenę'}
            </Text>
          </TouchableOpacity>

          {gradeMenuVisible && (
            <View style={styles.dropdownMenu}>
              <FlatList
                data={grades}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={styles.dropdownOption}
                  >
                    <Text style={styles.dropdownOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={addSubject}>
          <Text style={styles.buttonText}>Dodaj przedmiot</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tile}>
        <View style={styles.tileHeader}>
          <MaterialIcons name="school" size={25} color="white" />
          <Text style={styles.tileTitle}>Twoje kursy</Text>
        </View>

        {subjectList.length === 0 && (
          <Text style={styles.noItemsInfoText}>
            Brak przedmiotów do wyświetlenia
          </Text>
        )}
        <FlatList
          data={subjectList}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>

      <View style={styles.tile}>
        <View style={styles.summaryRow}>
          <MaterialIcons name="calculate" size={30} color="white" />
          <View style={styles.summaryCol}>
            <Text style={styles.tileTitle}>{weightedAverage()}</Text>
            <Text style={styles.tileTitle}>Średnia Ważona</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CalculatorScreen;