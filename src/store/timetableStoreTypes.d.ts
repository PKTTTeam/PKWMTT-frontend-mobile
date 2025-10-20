import { DaySchedule } from '../types/global';

export interface TimetableState {
  timetable: DaySchedule[];
  academicHours: string[];
  isOffline: boolean;
  actions: {
    setTimetable: (data: DaySchedule[]) => void;
    setAcademicHours: (hours: string[]) => void;
    markOffline: (value: boolean) => void;
    clearCache: () => void;
  };
}
