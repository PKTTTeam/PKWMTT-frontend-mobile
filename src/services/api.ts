import { API_URL, API_KEY } from '@env';

interface ApiOptions extends RequestInit {
  query?: Record<string, string | undefined>;
}

async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { query, headers, ...rest } = options;

  const searchParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value);
      }
    });
  }
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  const response = await fetch(`${API_URL}${path}${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    let errorMessage = `API error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage += `: ${JSON.stringify(errorData)}`;
    } catch {
      const text = await response.text();
      if (text) errorMessage += `: ${text}`;
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export default apiFetch;
