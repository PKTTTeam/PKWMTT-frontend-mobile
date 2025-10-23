import { API_URL, API_KEY } from '@env';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { SettingsState } from './settingsStoreTypes';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      groups: {
        dean: undefined,
        lab: undefined,
        proj: undefined,
        comp: undefined,
      },
      options: {
        dean: [],
        lab: [],
        proj: [],
        comp: [],
      },
      loading: false,
      lastFetchedDean: null,
      activeDropdown: null,
      showEmptySlots: true,
      hideLectures: false,
  hiddenSubjects: {},
  hiddenLessonKeys: [],

      error: null,
      setupComplete: false,

      actions: {
        setGroup: (key, value) => {
          set(state => {
            // Only update if value actually changed
            if (state.groups[key] === value) return state;

            const newState = {
              ...state,
              groups: { ...state.groups, [key]: value },
            };

            if (key === 'dean') {
              newState.groups.comp = undefined;
              newState.groups.lab = undefined;
              newState.groups.proj = undefined;

              get().actions.fetchDependentGroups(value);
            }

            return newState;
          });
        },

        fetchInitialDeanGroups: async () => {
          set({ loading: true });
          try {
            const res = await fetch(`${API_URL}timetables/groups/general`, {
              headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
              },
            });
            console.log(
              `fetch from store -> ${API_URL}timetables/groups/general}`,
            );
            const data: string[] = await res.json();
            console.log(data);
            if (data.length > 0) {
              set({
                options: { ...get().options, dean: data }, // Store all dean options
                loading: false,
                error: null,
              });
              await get().actions.fetchDependentGroups(data[0]);
            }
          } catch (e: any) {
            console.error('Failed to fetch dean groups:', e);
            set({
              loading: false,
              error: e.message || 'Blad pobierania grupy dziekanskiej',
            });
          }
        },

        fetchDependentGroups: async deanGroup => {
          if (!deanGroup || deanGroup === get().lastFetchedDean) return;

          set({ loading: true });
          try {
            const res = await fetch(
              `${API_URL}timetables/groups/${encodeURIComponent(deanGroup)}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'X-API-KEY': API_KEY,
                },
              },
            );
            console.log(
              `fetch from store -> ${API_URL}timetables/groups/${encodeURIComponent(
                deanGroup,
              )}, \n `,
            );
            const data: string[] = await res.json();

            const newOptions = {
              comp: data.filter(g => g.startsWith('K')),
              lab: data.filter(g => g.startsWith('L')),
              proj: data.filter(g => g.startsWith('P')),
              dean: get().options.dean, // Preserve dean options
            };

            const currentComp = get().groups.comp;
            const currentLab = get().groups.lab;
            const currentProj = get().groups.proj;

            set({
              options: newOptions,
              lastFetchedDean: deanGroup,
              loading: false,
              error: null,
              groups: {
                ...get().groups,
                comp:
                  currentComp && newOptions.comp.includes(currentComp)
                    ? currentComp
                    : undefined,
                lab:
                  currentLab && newOptions.lab.includes(currentLab)
                    ? currentLab
                    : undefined,
                proj:
                  currentProj && newOptions.proj.includes(currentProj)
                    ? currentProj
                    : undefined,
              },
            });
          } catch (e: any) {
            console.error('Failed to fetch dependent groups:', e);
            set({
              loading: false,
              error: e.message || 'Blad pobierania grup zaleznych',
            });
          }
        },
        setActiveDropdown(key) {
          set({ activeDropdown: key });
        },
        toggleShowEmptySlots() {
          set(state => ({ showEmptySlots: !state.showEmptySlots }));
        },
        setShowEmptySlots(value) {
          set({ showEmptySlots: value });
        },
        clearError() {
          set({ error: null });
        },
        setError(value: string) {
          set({ error: value });
        },
        setSetupComplete(value: boolean) {
          set({ setupComplete: value });
        },
        setHideLectures(value: boolean) {
          set({ hideLectures: value });
        },
        toggleSubjectHidden(deanGroup, subject) {
          set(state => {
            const list = state.hiddenSubjects[deanGroup] || [];
            const exists = list.includes(subject);
            const next = exists ? list.filter(s => s !== subject) : [...list, subject];
            return {
              ...state,
              hiddenSubjects: { ...state.hiddenSubjects, [deanGroup]: next },
            };
          });
        },
        setSubjectHidden(deanGroup, subject, hidden) {
          set(state => {
            const list = state.hiddenSubjects[deanGroup] || [];
            const next = hidden
              ? Array.from(new Set([...list, subject]))
              : list.filter(s => s !== subject);
            return {
              ...state,
              hiddenSubjects: { ...state.hiddenSubjects, [deanGroup]: next },
            };
          });
        },
        clearHiddenSubjectsForGroup(deanGroup) {
          set(state => {
            const copy = { ...state.hiddenSubjects };
            delete copy[deanGroup];
            return { ...state, hiddenSubjects: copy };
          });
        },
        hideLessonByKey(key) {
          set(state => ({
            hiddenLessonKeys: Array.from(new Set([...state.hiddenLessonKeys, key])),
          }));
        },
        unhideLessonByKey(key) {
          set(state => ({
            hiddenLessonKeys: state.hiddenLessonKeys.filter(k => k !== key),
          }));
        },
        clearHiddenLessons() {
          set({ hiddenLessonKeys: [] });
        },
      },
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        groups: state.groups,
        options: state.options,
        setupComplete: state.setupComplete,
        hideLectures: state.hideLectures,
        hiddenSubjects: state.hiddenSubjects,
        hiddenLessonKeys: state.hiddenLessonKeys,
      }),
    },
  ),
);

// Hook for consuming actions
export const useSettingsActions = () =>
  useSettingsStore(state => state.actions);
