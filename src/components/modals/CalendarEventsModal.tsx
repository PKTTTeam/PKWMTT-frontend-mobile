import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../styles/globalTheme/theme';

export type Event = {
  id: string;
  title: string;
  time: string;
  description: string;
  color: string;
  examType: string;
};

interface CalendarEventsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  events: Event[];
  onAdd: () => void;
  onDelete: (id: number) => void;
  onUpdate: (exam: Event) => void;
}

const createCalendarStyle = (theme: Theme) => {
  return {
    modalBg: {
      backgroundColor: theme.colors.Background,
    },
    textPrimary: {
      color: theme.colors.textPrimary,
    },
    textSecondary: {
      color: theme.colors.textSecondary,
    },
  };
};

const CalendarEventsModal: React.FC<CalendarEventsModalProps> = ({
  visible,
  onClose,
  selectedDate,
  events,
  onAdd,
  onDelete,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const repGroup = useAuthStore(state => state.repGroup);
  const role = useAuthStore(state => state.role);
  const group = useSettingsStore(state => state.groups.dean);
  const slicedGroup = group ? group.slice(0, -1) : [];

  const theme = useTheme<Theme>();
  const themeStyles = createCalendarStyle(theme);

  const parseDate = (dateString: string) => {
    if (!dateString) return '';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}`;
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={[styles.modalContent, themeStyles.modalBg]}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <MaterialIcon
              name="close"
              size={20}
              color={themeStyles.textPrimary.color}
            />
          </TouchableOpacity>

          <Text style={styles.dateText}>
            {parseDate(selectedDate) || t('dateSelect')}
          </Text>

          {role && repGroup === slicedGroup && selectedDate && (
            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
              <MaterialIcon name="add-circle-outline" color="white" size={30} />
            </TouchableOpacity>
          )}

          <FlatList
            data={events}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{t('noEvents')}</Text>
            }
            renderItem={({ item }) => (
              <View style={[styles.eventCard, { borderColor: item.color }]}>
                <View style={styles.eventHeader}>
                  <Text style={styles.examTypeText}>{item.examType}</Text>
                  <View style={styles.actions}>
                    {role && repGroup === slicedGroup && (
                      <>
                        <TouchableOpacity onPress={() => onUpdate(item)}>
                          <MaterialIcon name="mode" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => onDelete(Number(item.id))}
                        >
                          <MaterialIcon
                            name="restore-from-trash"
                            size={20}
                            color="white"
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
                <Text style={styles.eventText}>
                  {item.time} {item.title} {item.description}
                </Text>
              </View>
            )}
          />
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
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1e1f1f',
    borderRadius: 12,
    padding: 16,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B79FF',
    textAlign: 'center',
    marginBottom: 12,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    top: 50,
  },
  listContainer: {
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
    marginTop: 16,
  },
  eventCard: {
    backgroundColor: '#2a2b2f',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  examTypeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  eventText: {
    color: 'white',
    fontSize: 15,
  },
});

export default CalendarEventsModal;
