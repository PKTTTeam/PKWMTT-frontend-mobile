import apiFetch from '../api';
import { TimetableResponse } from '../../types/global';

export async function getTimetableByGroup(
  generalGroupName: string,
  k?: string,
  l?: string,
  p?: string,
): Promise<TimetableResponse> {
  if (!generalGroupName) {
    throw new Error('General group name is required to fetch timetable');
  }

  const subs = [k, l, p].filter(Boolean) as string[];

  return apiFetch<TimetableResponse>(`timetables/${generalGroupName}`, {
    query: { sub: subs },
  });
}

export async function getAcademicHours(): Promise<string[]> {
  return apiFetch<string[]>('timetables/hours');
}
