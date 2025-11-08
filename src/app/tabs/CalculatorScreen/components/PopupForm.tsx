import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DropdownMenu from '../../../../components/ui/DropdownMenu';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createPopupFormStyles } from './styles/PopupForm.styles.ts';
import { useTranslation } from 'react-i18next';

interface PopupFormProps {
  isVisible: boolean;
  isEditMode: boolean;
  subjectError: boolean;
  ectsError: boolean;
  gradeError: boolean;
  subjectName: string;
  ectsPoints: string;
  grade: string;
  onChangeSubject: (val: string) => void;
  onChangeEcts: (val: string) => void;
  onChangeGrade: (val: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  allSubjects: string[];
}

const PopupForm: React.FC<PopupFormProps> = ({
  isVisible,
  isEditMode,
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
}) => {
  const theme = useTheme();
  const styles = createPopupFormStyles(theme as Theme);
  const { t } = useTranslation();
  const ectsInputRef = useRef<TextInput>(null);
  const gradeInputRef = useRef<TextInput>(null);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [ectsFocused, setEctsFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);

  if (!isVisible) return null;
  // High-level labels
  const overlayLabel = isEditMode ? t('editSubject') : t('addSubject');
  const overlayText = isEditMode ? t('editSubjectText') : t('addSubjectText');
  
  // Field titles & placeholders
  const subjectTitle = t('subjectName');
  const ectsTitle = t('ECTSVal');
  const gradeTitle = t('gradeName');
  const subjectPlaceholder = t('placeholderCalc');
  const ectsPlaceholder = t('placeholderCalc2');
  const gradePlaceholder = 'np. 4';
  
  // Action button labels
  const confirmLabel = t('confirmButton');
  const cancelLabel = t('cancelButton');
 
  // Error messages (null when no error)
  const subjectErrorMessage = subjectError ? t('addSubjectErrorText') : null;
  const ectsErrorMessage = ectsError ? t('addECTSErrorText') : null;
  const gradeErrorMessage = gradeError ? t('addGradeErrorText') : null;

  // Dynamic styles
  const subjectLabelStyle = subjectError
    ? styles.overlayLabelErr
    : styles.overlayLabel;
  const ectsLabelStyle = ectsError
    ? styles.overlayLabelErr
    : styles.overlayLabel;
  const gradeLabelStyle = gradeError
    ? styles.overlayLabelErr
    : styles.overlayLabel;
  const subjectSelectWrapperStyle = subjectError
    ? styles.subjectSelectError
    : styles.subjectSelect;

  // Compute input style based on error & focus
  const getInputStyle = (error: boolean, focused: boolean) => {
    if (error && focused) return styles.userInputFocusedError;
    if (error) return styles.invalidUserInput;
    if (focused) return styles.userInputFocused;
    return styles.userInput;
  };
 
  const ectsInputStyle = getInputStyle(ectsError, ectsFocused);
  const gradeInputStyle = getInputStyle(gradeError, gradeFocused);
  // Error components for readability
  const SubjectErrorComponent = subjectErrorMessage ? (
    <Text style={styles.inputErrorFeed}>{subjectErrorMessage}</Text>
  ) : null;
  const EctsErrorComponent = ectsErrorMessage ? (
    <Text style={styles.inputErrorFeed}>{ectsErrorMessage}</Text>
  ) : null;
  const GradeErrorComponent = gradeErrorMessage ? (
    <Text style={styles.inputErrorFeed}>{gradeErrorMessage}</Text>
  ) : null;

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.popUpMenu}>
        <Text style={styles.overlayLabel}>{overlayLabel}</Text>
        <Text style={styles.Label}>{overlayText}</Text>

        <Text style={subjectLabelStyle}>{subjectTitle}</Text>
        <View style={styles.Label}>
          <View style={subjectSelectWrapperStyle}>
            <DropdownMenu
              items={allSubjects}
              selectedValue={subjectName}
              onSelect={onChangeSubject}
              isOpen={subjectDropdownOpen}
              onOpen={() => setSubjectDropdownOpen(true)}
              onClose={() => setSubjectDropdownOpen(false)}
              placeholder={subjectPlaceholder}
            />
          </View>
        </View>
        {SubjectErrorComponent}

        <Text style={ectsLabelStyle}>{ectsTitle}</Text>
        <TextInput
          ref={ectsInputRef}
          style={ectsInputStyle}
          placeholder={ectsPlaceholder}
          placeholderTextColor={'#a1a1a1'}
          value={ectsPoints}
          onChangeText={onChangeEcts}
          keyboardType="numeric"
          onFocus={() => setEctsFocused(true)}
          onBlur={() => setEctsFocused(false)}
        />
        {EctsErrorComponent}

        <Text style={gradeLabelStyle}>{gradeTitle}</Text>
        <TextInput
          ref={gradeInputRef}
          style={gradeInputStyle}
          placeholder={gradePlaceholder}
          placeholderTextColor={'#a1a1a1'}
          value={grade}
          onChangeText={onChangeGrade}
          keyboardType="numeric"
          onFocus={() => setGradeFocused(true)}
          onBlur={() => setGradeFocused(false)}
        />
        {GradeErrorComponent}

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
