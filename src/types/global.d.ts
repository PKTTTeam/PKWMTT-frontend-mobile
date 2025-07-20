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
}
