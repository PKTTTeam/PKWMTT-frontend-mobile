export type GroupKey = 'dean' | 'lab' | 'proj' | 'comp';
//GG - general group
export type GroupName = 'GG' | 'K' | 'L' | 'P';

export interface SettingsState {
  groups: Record<GroupKey, string | undefined>;
  options: Record<GroupKey, string[]>;
  loading: boolean;
  lastFetchedDean: string | null;
  activeDropdown: GroupKey | null;
  showEmptySlots: boolean;
  hideLectures: boolean;
  error: string | null;
  setupComplete: boolean;

  actions: {
    setGroup: (key: GroupKey, value: string) => void;
    fetchInitialDeanGroups: () => Promise<void>;
    fetchDependentGroups: (deanGroup: string) => Promise<void>;
    setActiveDropdown: (key: GroupKey | null) => void;
    setShowEmptySlots: (value: boolean) => void;
    toggleShowEmptySlots: () => void;
    setError: (value: string) => void;
    clearError: () => void;
    setSetupComplete: (value: boolean) => void;
    setHideLectures: (value: boolean) => void;
  };
}
