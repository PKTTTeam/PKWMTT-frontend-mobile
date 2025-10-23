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
  hiddenSubjects: Record<string, string[]>; // key: dean group -> subject names to hide
  hiddenLessonKeys: string[]; // unique keys for specific lessons hidden by user
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
    toggleSubjectHidden: (deanGroup: string, subject: string) => void;
    setSubjectHidden: (deanGroup: string, subject: string, hidden: boolean) => void;
    clearHiddenSubjectsForGroup: (deanGroup: string) => void;
    hideLessonByKey: (key: string) => void;
    unhideLessonByKey: (key: string) => void;
    clearHiddenLessons: () => void;
  };
}
