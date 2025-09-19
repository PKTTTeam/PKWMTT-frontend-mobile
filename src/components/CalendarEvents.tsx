import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';

export type Event = {
  id: string;
  title: string;
  time: string;
  description: string;
  color: string;
  examType: string;
};

type Props = {
  selectedDate: string;
  events: Event[];
  onAdd: () => void;
  onDelete: (id: number) => void;
  onUpdate: (exam: Event) => void;
};

export default function CalendarEvents({
  selectedDate,
  events,
  onAdd,
  onDelete,
  onUpdate,
}: Props) {
  const repGroup = useAuthStore(state => state.repGroup);
  const role = useAuthStore(state => state.role);
  const group = useSettingsStore(state => state.groups.dean);
  const slicedGroup = group ? group.slice(0, -1) : [];

  let parseDate = (dateString: string): string => {
    if (!dateString) return '';
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}`;
  };
  console.log('CalendarEvents rendered', { selectedDate, events });
  return (
    <View style={styles.container}>
      <View style={styles.dateHeader}>
        <Text style={[styles.dateText, !selectedDate && styles.selectDateText]}>
          {parseDate(selectedDate) || 'Wybierz datę'}
        </Text>

        {role && repGroup === slicedGroup && selectedDate && (
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <MaterialIcon name="add-circle-outline" color={'white'} size={30} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.list}>
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Brak wydarzeń</Text>
          }
          renderItem={({ item }) => (
            <View style={[styles.eventCard, { borderColor: item.color }]}>
              <View style={styles.eventHeader}>
                <Text style={styles.examTypeText}>{item.examType}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity>
                    <MaterialIcon
                      name="mode"
                      size={20}
                      onPress={() => onUpdate(item)}
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDelete(Number(item.id))}>
                    <MaterialIcon
                      name="restore-from-trash"
                      size={20}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.eventText}>
                {item.time} {item.title} {item.description}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#1e1f1f',
  },
  list: {
    maxHeight: Dimensions.get('window').height * 0.2,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  dateText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7B79FF',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  selectDateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7B79FF',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
  },
  eventCard: {
    backgroundColor: '#2a2b2f', // default fallback if item.color is missing
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  examTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    color: '#fff',
    fontSize: 20,
  },
  eventText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
});
