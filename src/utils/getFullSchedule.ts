import { TimetableItem } from '../types/global';

export const getFullSchedule = (
  academicHours: string[],
  lessons: TimetableItem[],
) => {
  const lessonsByRowId = new Map<number, TimetableItem>();
  lessons.forEach(lesson => {
    lessonsByRowId.set(lesson.rowId, lesson);
  });

  return academicHours.map((hour, idx) => {
    const lesson = lessonsByRowId.get(idx);
    if (lesson) {
      return lesson;
    } else {
      return {
        rowId: idx,
        name: '',
        classroom: '',
        type: '',
      } as TimetableItem;
    }
  });
};
