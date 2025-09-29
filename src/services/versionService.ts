import apiFetch from './api';

export async function getLatestVersion(): Promise<string> {
  return await apiFetch('apk/version');
}
