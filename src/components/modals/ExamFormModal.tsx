import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createExams } from '../../services/calendar/CalendarService';
import { useSettingsStore } from '../../store/settingsStore';

interface CreateExamModalProps {
  visible: boolean;
  onClose: () => void;
  examTypes: string[];
  date: string;
  onCreated: () => void;
}

const CreateExamModal: React.FC<CreateExamModalProps> = ({
  visible,
  onClose,
  examTypes,
  date,
  onCreated,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [examType, setExamType] = useState('');
  const [generalGroups, setGeneralGroups] = useState<string[]>([]);
  const [subgroups, setSubgroups] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const savedGroup = useSettingsStore(state => state.groups.dean);
  const allGroups = useSettingsStore(state => state.options.dean);
  const kGroups = useSettingsStore(state => state.options.comp);
  const lGroups = useSettingsStore(state => state.options.lab);
  const pGroups = useSettingsStore(state => state.options.proj);

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleSubmit = async () => {
    const dateTime = new Date(date);
    dateTime.setHours(selectedTime.getHours());
    dateTime.setMinutes(selectedTime.getMinutes());
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);

    const timezoneOffset = dateTime.getTimezoneOffset();
    const adjustedDateTime = new Date(
      dateTime.getTime() - timezoneOffset * 60000,
    );

    const backendDateTime = adjustedDateTime.toISOString();
    await createExams({
      title: title,
      description: description,
      date: backendDateTime,
      examType: examType,
      generalGroups: generalGroups,
      subgroups: subgroups,
    });
    onCreated?.();

    console.log(
      `${title}, ${description}, examType = ${examType}, genGr = ${generalGroups}, subGrp= ${subgroups}, data= ${backendDateTime}`,
    );

    // Reset form
    setTitle('');
    setDescription('');
    setExamType('');
    setGeneralGroups([]);
    setSubgroups([]);
    setSelectedTime(new Date()); // Reset time to current time
    onClose();
  };

  const toggleGroup = (
    group: string,
    list: string[],
    setList: (val: string[]) => void,
  ) => {
    if (list.includes(group)) {
      setList(list.filter(g => g !== group));
    } else {
      setList([...list, group]);
    }
  };

  // Get relevant groups based on saved group
  const slicedGroup = savedGroup && savedGroup.slice(0, -1);
  const relevantGroups = slicedGroup
    ? allGroups.filter(item => item.includes(slicedGroup))
    : [];

  const allSubgroups = [
    ...(kGroups || []),
    ...(lGroups || []),
    ...(pGroups || []),
  ];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={20}
          >
            <Icon name="close" color="white" size={16} />
          </TouchableOpacity>

          <Icon name="event" size={40} color="#8d95fe" style={styles.icon} />
          <Text style={styles.title}>Dodaj egzamin</Text>

          <ScrollView
            style={{ width: '100%' }}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={styles.input}
              placeholder="Tytuł"
              placeholderTextColor="#AAAAAA"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Opis"
              placeholderTextColor="#AAAAAA"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Time Picker */}
            <Text style={styles.label}>Godzina egzaminu</Text>
            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
              <Icon name="access-time" size={20} color="#8d95fe" />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
                themeVariant="dark"
              />
            )}

            <Text style={styles.label}>Typ egzaminu</Text>
            {examTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.option,
                  examType === type && styles.optionSelected,
                ]}
                onPress={() => setExamType(type)}
              >
                <Text style={{ color: 'white' }}>{type}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.label}>Grupy ogólne</Text>
            {relevantGroups.map(group => (
              <TouchableOpacity
                key={group}
                style={[
                  styles.option,
                  generalGroups.includes(group) && styles.optionSelected,
                ]}
                onPress={() =>
                  toggleGroup(group, generalGroups, setGeneralGroups)
                }
              >
                <Text style={{ color: 'white' }}>{group}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.label}>Podgrupy</Text>
            {allSubgroups.map(group => (
              <TouchableOpacity
                key={group + '-sub'}
                style={[
                  styles.option,
                  subgroups.includes(group) && styles.optionSelected,
                ]}
                onPress={() => toggleGroup(group, subgroups, setSubgroups)}
              >
                <Text style={{ color: 'white' }}>{group}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Dodaj</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Anuluj</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1e1f1f',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    maxHeight: '90%',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#2a2b2b',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  timePickerButton: {
    width: '100%',
    backgroundColor: '#2a2b2b',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    color: '#CCCCCC',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 8,
  },
  option: {
    padding: 10,
    backgroundColor: '#2a2b2b',
    borderRadius: 6,
    marginBottom: 6,
  },
  optionSelected: {
    backgroundColor: '#8d95fe',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  submitButton: {
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#555555',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateExamModal;
