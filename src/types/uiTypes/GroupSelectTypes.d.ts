import { GroupName } from '../../store/settingsStoreTypes';
export type GroupSelectTypes = {
  groupTitle: string;
  groupName: GroupName;
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
  hasError?: boolean;
  isOffline: boolean;
};
