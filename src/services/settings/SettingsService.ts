import apiFetch from '../api';

type OtpResponse = string | { message: string; timestamp: string };

export async function getOtpResponse(otp: string) {
  return apiFetch<OtpResponse>(`representatives/authenticate`, {
    query: { c: otp },
  });
}
