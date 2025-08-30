import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
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

function CalculatorScreen() {
  const [subjectList, setSubjectList] = useState<CalcItem[]>([
  ]);

  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

  const sbujectInput = useRef<TextInput>(null);
  const ectsInput = useRef<TextInput>(null);
  const gradeInput= useRef<TextInput>(null);

  const averageGrade = () => {
    if (subjectList.length === 0) return 0;
    const total = subjectList.reduce((sum, item) => sum + parseFloat(item.grade), 0);
    return (total / subjectList.length).toFixed(2);
  }

  const totalEcts = () => {
    if (subjectList.length === 0) return 0;
    const total = subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0);
    return total;
  }

  const weightedAverage = () => {
    if (subjectList.length === 0) return 0;
    const totalWeightedGrades = subjectList.reduce((sum, item) => sum + (parseFloat(item.grade) * parseInt(item.ects, 10)), 0);
    const totalEctsPoints = subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0);
    return (totalWeightedGrades / totalEctsPoints).toFixed(2);
  }

  const addSubject = () => {

    if (!subjectName.trim()) {
      // subjectName validation
      sbujectInput.current?.focus();
      return;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      ectsInput.current?.focus();

      // alert('ECTS musi być liczbą całkowitą większą od 0');
      return;
    }

    const gradeFloat = parseFloat(grade);
    if (isNaN(gradeFloat) || gradeFloat < 0) {
      gradeInput.current?.focus();
      // alert('Ocena musi być liczbą większą lub równą 0');
      return;
    }

    const decimalPart = grade.includes('.') ? grade.split('.')[1] : '';
    if (decimalPart.length > 2) {
      gradeInput.current?.focus();
      // alert('Ocena może mieć maksymalnie 2 miejsca po przecinku');
      return;
    }

    // if (!subjectName || !ectsPoints || !grade) return;


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

  const deleteItem = (key: string) => {
    setSubjectList(subjectList.filter(item => item.key !== key));
  };

  const renderItem = ({ item }: { item: CalcItem }) => (
    <View style={styles.rootItemContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={deleteItem.bind(null, item.key)}
      >
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={[styles.text, styles.singleItem]}>{item.subjectName}</Text>
        <Text style={[styles.text, styles.singleItem]}>{item.ects}</Text>
        <Text style={[styles.text, styles.singleItem]}>{item.grade}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Nazwa</Text>
        <Text style={styles.text}>Wartość ECTS</Text>
        <Text style={styles.text}>Ocena</Text>
      </View>

      <FlatList
        data={subjectList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      
      <View>
        <View style={styles.summaryContainer}>
          <Text style={styles.text}>Średnia ocen {averageGrade()}</Text>
          <Text style={styles.text}>Suma ECTS {totalEcts()}</Text>
          <Text style={styles.text}>Średnia ważona  {weightedAverage()}</Text>
        </View>
      </View>

      <View style={styles.bottomMenu}>
        <TextInput
          ref={sbujectInput}
          style={styles.userInput}
          placeholder="nazwa..."
          value={subjectName}
          onChangeText={setSubjectName}
        />
        <TextInput
          ref={ectsInput}
          style={styles.userInput}
          placeholder="ilość ECTS..."
          value={ectsPoints}
          onChangeText={setEctsPoints}
        />
        <TextInput
          ref={gradeInput}

          style={styles.userInput}
          placeholder="ocena..."
          value={grade}
          onChangeText={setGrade}
        />
        <Button title="Dodaj" onPress={addSubject} />
        {/* <Button title="Usuń" onPress={} /> */}
      </View>
    </View>
  );
}

export default CalculatorScreen;
