import { API_URL } from '@env';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { SettingsState } from './settingsStoreTypes';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      groups: {
        dean: '',
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
      showEmptySlots: false,
      error: null,

      actions: {
        setGroup: (key, value) => {
          set(state => {
            // Only update if value actually changed
            if (state.groups[key] === value) return state;

            const newState = {
              ...state,
              groups: { ...state.groups, [key]: value },
            };

            // Automatically fetch dependents when dean changes
            if (key === 'dean' && value !== state.lastFetchedDean) {
              get().actions.fetchDependentGroups(value);
            }

            return newState;
          });
        },

        fetchInitialDeanGroups: async () => {
          set({ loading: true });
          try {
            const res = await fetch(`${API_URL}/groups/general`);
            //  console.log(`fetch from store -> ${API_URL}/groups/general}`);
            const data: string[] = await res.json();

            if (data.length > 0) {
              set({
                groups: { ...get().groups, dean: data[0] },
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
              `${API_URL}/groups/${encodeURIComponent(deanGroup)}`,
            );
            // console.log(
            //   `fetch from store -> ${API_URL}/groups/${encodeURIComponent(
            //     deanGroup,
            //   )}`,
            //  );
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
      },
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        groups: state.groups,
        options: state.options,
      }),
    },
  ),
);

// Hook for consuming actions
export const useSettingsActions = () =>
  useSettingsStore(state => state.actions);
