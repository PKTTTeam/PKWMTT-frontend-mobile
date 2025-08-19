import { ANDROID_API_URL } from '@env';
import { TimetableResponse } from '../../types/global';

const API_URL = ANDROID_API_URL;

function buildQuery(params?: (string | undefined)[]): string {
  if (!params || params.length === 0) return '';

  const searchParams = new URLSearchParams();

  for (const param of params) {
    if (param) {
      searchParams.append('sub', param);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export async function getTimetableByGroup(
  generalGroupName?: string,
  k?: string,
  l?: string,
  p?: string,
): Promise<TimetableResponse> {
  const query = buildQuery([k, l, p]);
  const response = await fetch(`${API_URL}/${generalGroupName}${query}`);
  console.log(`fetch from service -> ${API_URL}/${generalGroupName}${query}`);
  if (!response.ok) {
    throw new Error('Error with fetching timetable');
  }
  return response.json();
}

export async function getAcademicHours(): Promise<string[]> {
  const response = await fetch(`${API_URL}/hours`);
  const data = await response.json();
  return data;
}
