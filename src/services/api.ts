import { API_URL, API_KEY } from '@env';

import { useAuthStore } from '../store/authStore';

interface ApiOptions extends RequestInit {
  query?: Record<string, string | string[] | undefined>;
}

async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { query, headers, ...rest } = options;
  const token = useAuthStore.getState().token;

  const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v)); // repeated keys
        } else {
          searchParams.append(key, value);
        }
      }
    });
  }
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';
  // console.log(`${API_URL}${path}${queryString}`);

  const isBodyRequest =
    rest.method &&
    ['POST', 'PUT', 'PATCH'].includes(rest.method?.toUpperCase());

  const response = await fetch(`${API_URL}${path}${queryString}`, {
    headers: {
      ...(isBodyRequest ? { 'Content-Type': 'application/json' } : {}),
      'X-API-KEY': API_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  let rawBody: string;
  try {
    rawBody = await response.text();
  } catch {
    throw new Error(`Failed to read response body`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    parsed = rawBody;
  }

  if (!response.ok) {
    throw new Error(
      `API error ${response.status}: ${
        typeof parsed === 'string' ? parsed : JSON.stringify(parsed)
      }`,
    );
  }

  // console.log('responsedata =', parsed);
  return parsed as T;
}

export default apiFetch;
