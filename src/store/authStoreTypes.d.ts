export interface AuthState {
  token: string | null;
  repGroup: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}
