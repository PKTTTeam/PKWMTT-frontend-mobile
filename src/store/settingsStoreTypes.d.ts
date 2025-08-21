export type GroupKey = 'dean' | 'lab' | 'proj' | 'comp';

export type GroupName =
  | 'Dziekańska'
  | 'Komputerowa'
  | 'Laboratoryjna'
  | 'Projektowa';

export interface SettingsState {
  groups: Record<GroupKey, string | undefined>;
  options: Record<GroupKey, string[]>;
  loading: boolean;
  lastFetchedDean: string | null;
  activeDropdown: GroupKey | null;
  showEmptySlots: boolean;
  error: string | null;

  actions: {
    setGroup: (key: GroupKey, value: string) => void;
    fetchInitialDeanGroups: () => Promise<void>;
    fetchDependentGroups: (deanGroup: string) => Promise<void>;
    setActiveDropdown: (key: GroupKey | null) => void;
    setShowEmptySlots: (value: boolean) => void;
    toggleShowEmptySlots: () => void;
    setError: (value: string) => void;
    clearError: () => void;
  };
}
