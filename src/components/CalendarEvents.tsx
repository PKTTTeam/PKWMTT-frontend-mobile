import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';

type Event = {
  id: string;
  title: string;
  time: string;
  color: string;
};

type Props = {
  selectedDate: string;
  events: Event[];
  onAdd: () => void;
};

export default function CalendarEvents({ selectedDate, events, onAdd }: Props) {
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

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Brak wydarzeń</Text>}
        renderItem={({ item }) => (
          <View style={[styles.eventCard, { backgroundColor: item.color }]}>
            <Text style={styles.eventText}>
              {item.time} {item.title}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity>
                <MaterialIcon name="mode" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcon name="restore-from-trash" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  dateText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7B79FF',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 0,
    transform: [{ translateY: 10 }],
  },
  selectDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B79FF',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#999',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
  },
  eventText: {
    color: '#000',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
