export type TimeRangeProps = {
  timeStart: string;
  timeEnd: string;
};

export type RoomInfoProps = {
  room: string;
};

export type SubjectNameProps = {
  subject: string;
};

export type LetterIconProps = {
  bgColor: string;
  letter: string;
  letterColor: string;
};

export interface ScheduleItemProps {
  subject: string;
  startTime: string;
  endTime: string;
  room: string;
  type: string;
  bgColor: string;
  letterColor: string;
  isActive: boolean;
}

//TODO: to be outsourced to another file
export interface TimetableItem {
  name: string;
  classroom: string;
  rowId: number;
  type: string;
}

export interface DaySchedule {
  name: string;
  odd: TimetableItem[];
  even: TimetableItem[];
}

export interface TimetableResponse {
  name: string;
  data: DaySchedule[];
}

export interface TabNavigatorProps {
  showActivityModal: () => void;
}
