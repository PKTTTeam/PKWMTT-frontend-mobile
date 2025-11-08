import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DropdownMenu from '../../../../components/ui/DropdownMenu';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createPopupFormStyles } from './styles/PopupForm.styles.ts';

interface PopupFormProps {
  isVisible: boolean;
  titleLabel: string;
  helperLabel: string;
  subjectFieldLabel: string;
  subjectPlaceholder: string;
  ectsLabel: string;
  ectsPlaceholder: string;
  gradeLabel: string;
  gradePlaceholder: string;
  confirmLabel: string;
  cancelLabel: string;
  subjectError: string | null;
  ectsError: string | null;
  gradeError: string | null;
  subjectName: string;
  ectsPoints: string;
  grade: string;
  onChangeSubject: (val: string) => void;
  onChangeEcts: (val: string) => void;
  onChangeGrade: (val: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  allSubjects: string[];
  subjectDropdownOpen: boolean;
  onOpenSubjectDropdown: () => void;
  onCloseSubjectDropdown: () => void;
  ectsFocused: boolean;
  gradeFocused: boolean;
  setEctsFocused: (val: boolean) => void;
  setGradeFocused: (val: boolean) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
  isVisible,
  titleLabel,
  helperLabel,
  subjectFieldLabel,
  subjectPlaceholder,
  ectsLabel,
  ectsPlaceholder,
  gradeLabel,
  gradePlaceholder,
  confirmLabel,
  cancelLabel,
  subjectError,
  ectsError,
  gradeError,
  subjectName,
  ectsPoints,
  grade,
  onChangeSubject,
  onChangeEcts,
  onChangeGrade,
  onConfirm,
  onCancel,
  allSubjects,
  subjectDropdownOpen,
  onOpenSubjectDropdown,
  onCloseSubjectDropdown,
  ectsFocused,
  gradeFocused,
  setEctsFocused,
  setGradeFocused,
}) => {
  const theme = useTheme();
  const styles = createPopupFormStyles(theme as Theme);
  const ectsInput = useRef<TextInput>(null);
  const gradeInput = useRef<TextInput>(null);

  if (!isVisible) return null;

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.popUpMenu}>
        <Text style={styles.overlayLabel}>{titleLabel}</Text>
        <Text style={styles.Label}>{helperLabel}</Text>

        <Text style={subjectError ? styles.overlayLabelErr : styles.overlayLabel}>{subjectFieldLabel}</Text>
        <View style={styles.Label}>
          <View style={subjectError ? styles.subjectSelectError : styles.subjectSelect}>
            <DropdownMenu
              items={allSubjects}
              selectedValue={subjectName}
              onSelect={onChangeSubject}
              isOpen={subjectDropdownOpen}
              onOpen={onOpenSubjectDropdown}
              onClose={onCloseSubjectDropdown}
              placeholder={subjectPlaceholder}
            />
          </View>
        </View>
        {subjectError && <Text style={styles.inputErrorFeed}>{subjectError}</Text>}

        <Text style={ectsError ? styles.overlayLabelErr : styles.overlayLabel}>{ectsLabel}</Text>
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
          placeholder={ectsPlaceholder}
          placeholderTextColor={'#a1a1a1'}
          value={ectsPoints}
          onChangeText={onChangeEcts}
          keyboardType="numeric"
          onFocus={() => setEctsFocused(true)}
          onBlur={() => setEctsFocused(false)}
        />
        {ectsError && <Text style={styles.inputErrorFeed}>{ectsError}</Text>}

        <Text style={gradeError ? styles.overlayLabelErr : styles.overlayLabel}>{gradeLabel}</Text>
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
          placeholder={gradePlaceholder}
          placeholderTextColor={'#a1a1a1'}
          value={grade}
          onChangeText={onChangeGrade}
          keyboardType="numeric"
          onFocus={() => setGradeFocused(true)}
          onBlur={() => setGradeFocused(false)}
        />
        {gradeError && <Text style={styles.inputErrorFeed}>{gradeError}</Text>}

        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.buttonText}>{confirmLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>{cancelLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopupForm;
