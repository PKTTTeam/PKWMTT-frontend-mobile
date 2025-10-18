import apiFetch from '../api';

// Placeholder: adjust endpoint when backend is ready
export async function reportBug(description: string): Promise<void> {
  await apiFetch('/feedback/report-bug', {
    method: 'POST',
    body: JSON.stringify({ description }),
  });
}
