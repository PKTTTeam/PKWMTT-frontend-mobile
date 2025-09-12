import { API_URL, API_KEY } from '@env';
import { TimetableResponse } from '../../types/global';

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
  if (!generalGroupName) {
    throw new Error('General group name is required to fetch timetable');
  }
  const query = buildQuery([k, l, p]);
  const response = await fetch(`${API_URL}/${generalGroupName}${query}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  console.log(`fetch from service -> ${API_URL}/${generalGroupName}${query}`);
  if (!response.ok) {
    console.log(response.json());

    throw new Error('Error with fetching timetable');
  }
  return response.json();
}

export async function getAcademicHours(): Promise<string[]> {
  const response = await fetch(`${API_URL}/hours`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const data = await response.json();
  return data;
}
