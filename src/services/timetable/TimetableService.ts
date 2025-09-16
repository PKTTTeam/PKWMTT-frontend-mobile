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

  return apiFetch<TimetableResponse>(`timetables/${generalGroupName}`, {
    query: { sub: k, l, p },
  });
}

export async function getAcademicHours(): Promise<string[]> {
  return apiFetch<string[]>('timetables/hours');
}
