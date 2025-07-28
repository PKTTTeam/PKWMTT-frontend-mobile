import { TimetableItem } from '../types/global';
import getCurrentWeekType from './getCurrentWeekType';
export default function checkActiveLesson(
  lesson: TimetableItem,
  aHours: string[],
  isOddWeek: boolean,
): boolean {
  if (!lesson || typeof lesson.rowId !== 'number') {
    console.log('data error');
    return false;
  }
  if (!aHours || !aHours[lesson.rowId]) {
    console.log('hours error');
    return false;
  }
  const now = new Date();
  now.setHours(8, 40, 0, 0);
  const [startTime, endTime] = aHours[lesson.rowId]
    .split('-')
    .map(str => str.trim());

  if (!startTime || !endTime) return false;

  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startDate = new Date(now);
  const endDate = new Date(now);
  const nowIsOdd = getCurrentWeekType();

  startDate.setHours(startHour, startMin, 0, 0);
  endDate.setHours(endHour, endMin, 0, 0);

  const isLessonInCorrectWeek = nowIsOdd === isOddWeek;

  return isLessonInCorrectWeek && now >= startDate && now <= endDate;
}
