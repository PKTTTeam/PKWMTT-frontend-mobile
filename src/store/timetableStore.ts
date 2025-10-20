import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TimetableState } from './timetableStoreTypes';

export const useTimetableStore = create<TimetableState>()(
  persist(
    set => ({
      timetable: [],
      academicHours: [],
      isOffline: false,
      actions: {
        setTimetable: data => set({ timetable: data }),
        setAcademicHours: hours => set({ academicHours: hours }),
        markOffline: value => set({ isOffline: value }),
        clearCache: () => set({ timetable: [] }),
      },
    }),
    {
      name: 'timetable-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        timetable: state.timetable,
        academicHours: state.academicHours,
      }),
    },
  ),
);
