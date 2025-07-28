export default function getCurrentWeekType(): boolean {
  const now = new Date();
  const year = now.getFullYear();

  const octFirst = new Date(year, 9, 1);
  const referenceDate = now < octFirst ? new Date(year - 1, 9, 1) : octFirst;

  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const referenceWeekStart = getWeekStart(referenceDate);
  const currentWeekStart = getWeekStart(now);

  const weeksDiff = Math.floor(
    (currentWeekStart.getTime() - referenceWeekStart.getTime()) /
      (7 * 24 * 60 * 60 * 1000),
  );

  // true = even, false = odd
  return weeksDiff % 2 !== 0;
}
