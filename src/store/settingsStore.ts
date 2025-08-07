import { BASE_URL, ANDROID_API_URL } from '@env';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? ANDROID_API_URL : BASE_URL;

// store/settingsStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type GroupKey = 'dean' | 'lab' | 'proj' | 'comp';

export type GroupName =
  | 'Dziekańska'
  | 'Komputerowa'
  | 'Laboratoryjna'
  | 'Projektowa';

interface SettingsState {
  groups: Record<GroupKey, string>;
  options: Record<GroupKey, string[]>;
  loading: boolean;
  lastFetchedDean: string | null;
  activeDropdown: GroupKey | null;

  actions: {
    setGroup: (key: GroupKey, value: string) => void;
    fetchInitialDeanGroups: () => Promise<void>;
    fetchDependentGroups: (deanGroup: string) => Promise<void>;
    setActiveDropdown: (key: GroupKey | null) => void;
  };
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      groups: {
        dean: '',
        lab: '',
        proj: '',
        comp: '',
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
            console.log(`fetch from store -> ${API_URL}/groups/general}`);
            const data: string[] = await res.json();

            if (data.length > 0) {
              set({
                groups: { ...get().groups, dean: data[0] },
                options: { ...get().options, dean: data }, // Store all dean options
                loading: false,
              });
              await get().actions.fetchDependentGroups(data[0]);
            }
          } catch (e) {
            console.error('Failed to fetch dean groups:', e);
            set({ loading: false });
          }
        },

        fetchDependentGroups: async deanGroup => {
          if (!deanGroup || deanGroup === get().lastFetchedDean) return;

          set({ loading: true });
          try {
            const res = await fetch(
              `${API_URL}/groups/${encodeURIComponent(deanGroup)}`,
            );
            console.log(
              `fetch from store -> ${API_URL}/groups/${encodeURIComponent(
                deanGroup,
              )}`,
            );
            const data: string[] = await res.json();

            const newOptions = {
              comp: data.filter(g => g.startsWith('K')),
              lab: data.filter(g => g.startsWith('L')),
              proj: data.filter(g => g.startsWith('P')),
              dean: get().options.dean, // Preserve dean options
            };

            set({
              options: newOptions,
              lastFetchedDean: deanGroup,
              loading: false,
              groups: {
                ...get().groups,
                comp: newOptions.comp.includes(get().groups.comp)
                  ? get().groups.comp
                  : '',
                lab: newOptions.lab.includes(get().groups.lab)
                  ? get().groups.lab
                  : '',
                proj: newOptions.proj.includes(get().groups.proj)
                  ? get().groups.proj
                  : '',
              },
            });
          } catch (e) {
            console.error('Failed to fetch dependent groups:', e);
            set({ loading: false });
          }
        },
        setActiveDropdown(key) {
          set({ activeDropdown: key });
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
