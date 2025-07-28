import { ONE_WEEK_MS } from '../constants/constants';
export default function getCurrentWeekType(): boolean {
  const now = new Date();
  const year = now.getFullYear();

  const octFirst = new Date(year, 9, 1);
  const referenceDate = now < octFirst ? new Date(year - 1, 9, 1) : octFirst;

  const weeksSinceRef = Math.floor(
    (now.getTime() - referenceDate.getTime()) / ONE_WEEK_MS,
  );

  //true = even
  //false = odd
  return weeksSinceRef % 2 !== 0;
}
