import type { GroupName } from '../../store/settingsStore';

export type GroupSelectTypes = {
  groupName: GroupName;
  listPosUp?: boolean;
  onValueChange?: (value: string) => void;
};
