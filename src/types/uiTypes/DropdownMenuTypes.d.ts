export interface DropdownMenuProps {
  width?: number;
  height?: number;
  listPosUp?: boolean;
  items: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  placeholder: string;
}
