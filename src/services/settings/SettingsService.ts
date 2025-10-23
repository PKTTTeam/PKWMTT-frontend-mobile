import apiFetch from '../api';

type OtpResponse = string | { message: string; timestamp: string };

export async function getOtpResponse(otp: string) {
  return apiFetch<OtpResponse>(`representatives/authenticate`, {
    query: { c: otp },
  });
}

// Report a bug to backend (placeholder endpoint)
export async function reportBug(description: string): Promise<void> {
  await apiFetch('/feedback/report-bug', {
    method: 'POST',
    body: JSON.stringify({ description }),
  });
}
