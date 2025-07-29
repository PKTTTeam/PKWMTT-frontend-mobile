import { TimetableItem } from '../types/global';
import getCurrentWeekType from './getCurrentWeekType';
export default function checkActiveLesson(
  lesson: TimetableItem,
  aHours: string[],
  currentDayName: string,
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
  // now.setHours(11, 0, 0, 0); //for testing
  //todo: change validation, will cause issues with translation
  const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const todayName = days[now.getDay() - 1]; // getDay: 1 = Monday
  console.log(now.toString());

  if (todayName !== currentDayName) return false;
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
