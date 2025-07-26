import { BASE_URL, ANDROID_API_URL } from '@env';
import { Platform } from 'react-native';
import { TimetableResponse } from '../types/global';

const API_URL = Platform.OS === 'android' ? ANDROID_API_URL : BASE_URL;

function buildQuery(params?: Record<string, string | undefined>): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  if (params.k) searchParams.append('k', params.k);
  if (params.l) searchParams.append('l', params.l);
  if (params.p) searchParams.append('p', params.p);

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export async function getTimetableByGroup(
  generalGroupName: string,
  k?: string,
  l?: string,
  p?: string,
): Promise<TimetableResponse> {
  const query = buildQuery({ k, l, p });
  const response = await fetch(`${API_URL}/${generalGroupName}${query}`);
  if (!response.ok) {
    throw new Error('error with fetching timetable');
  }
  return response.json();
}

export async function getAcademicHours(): Promise<string[]> {
  const response = await fetch(`${API_URL}/hours`);
  const data = await response.json();
  return data;
}
