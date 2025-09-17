import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

import { AuthState } from './authStoreTypes';

type DecodedToken = {
  group?: string;
  role?: string;
  exp?: number;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      repGroup: null,
      role: null,

      setToken: token => {
        let repGroup: string | null = null;
        let role: string | null = null;

        try {
          if (token) {
            const decoded = jwtDecode<DecodedToken>(token);

            // Check expiration
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
              console.warn('Token expired');
              token = null;
            } else {
              repGroup = decoded.group ?? null;
              role = decoded.role ?? null;
            }
          }
        } catch (err) {
          console.warn('Invalid JWT token', err);
          token = null;
        }

        set({ token, repGroup, role });
      },

      clearToken: () => set({ token: null, repGroup: null, role: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
