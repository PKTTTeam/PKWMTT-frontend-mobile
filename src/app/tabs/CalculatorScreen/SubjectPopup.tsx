import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import { createCalculatorStyles } from './CalculatorStyles';
import { Theme } from '../../../styles/globalTheme/theme';
import { useTheme } from '@shopify/restyle';

type Props = {
  subjectName: string;
  setSubjectName: (value: string) => void;
  ectsPoints: string;
  setEctsPoints: (value: string) => void;
  grade: string;
  setGrade: (value: string) => void;
  subjectError: string | null;
  ectsError: string | null;
  gradeError: string | null;
  ectsFocused: boolean;
  gradeFocused: boolean;
  setEctsFocused: (v: boolean) => void;
  setGradeFocused: (v: boolean) => void;
  allSubjects: string[];
  subjectDropdownOpen: boolean;
  setSubjectDropdownOpen: (v: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  subtitle: string;
};

const SubjectPopup: React.FC<Props> = ({
  subjectName,
  setSubjectName,
  ectsPoints,
  setEctsPoints,
  grade,
  setGrade,
  subjectError,
  ectsError,
  gradeError,
  ectsFocused,
  gradeFocused,
  setEctsFocused,
  setGradeFocused,
  allSubjects,
  subjectDropdownOpen,
  setSubjectDropdownOpen,
  onConfirm,
  onCancel,
  title,
  subtitle,
}) => {
  const theme = useTheme<Theme>();
  const styles = createCalculatorStyles(theme);

  const ectsInput = useRef<TextInput>(null);
  const gradeInput = useRef<TextInput>(null);

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.popUpMenu}>
        <Text style={styles.overlayLabel}>{title}</Text>
        <Text style={styles.Label}>{subtitle}</Text>

        <Text
          style={subjectError ? styles.overlayLabelErr : styles.overlayLabel}
        >
          Subject
        </Text>
        <View>
          <View
            style={
              // subjectError ? styles.subjectSelectError : styles.subjectSelect
              subjectError ? styles.inputErrorFeed : styles.userInput
            }
          >
            <DropdownMenu
              items={allSubjects}
              selectedValue={subjectName}
              onSelect={setSubjectName}
              isOpen={subjectDropdownOpen}
              onOpen={() => setSubjectDropdownOpen(true)}
              onClose={() => setSubjectDropdownOpen(false)}
              placeholder="Select subject"
            />
          </View>
        </View>
        {subjectError && (
          <Text style={styles.inputErrorFeed}>{subjectError}</Text>
        )}

        <Text style={ectsError ? styles.overlayLabelErr : styles.overlayLabel}>
          ECTS
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
          placeholder="ECTS points"
          value={ectsPoints}
          onChangeText={setEctsPoints}
          keyboardType="numeric"
          onFocus={() => setEctsFocused(true)}
          onBlur={() => setEctsFocused(false)}
        />
        {ectsError && <Text style={styles.inputErrorFeed}>{ectsError}</Text>}

        <Text style={gradeError ? styles.overlayLabelErr : styles.overlayLabel}>
          Grade
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
          placeholder="e.g. 4"
          value={grade}
          onChangeText={setGrade}
          keyboardType="numeric"
          onFocus={() => setGradeFocused(true)}
          onBlur={() => setGradeFocused(false)}
        />
        {gradeError && <Text style={styles.inputErrorFeed}>{gradeError}</Text>}

        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubjectPopup;
