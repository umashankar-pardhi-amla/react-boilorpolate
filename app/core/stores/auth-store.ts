/**
 * Base Auth Store – user/session state for Login, Dashboard.
 * Extend in app/extensions/stores/auth-store.ts if needed.
 */

import { createBaseStore } from '../store';
import type { BaseStore } from '../store';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthStoreState extends BaseStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

function getInitialAuth(): Pick<AuthStoreState, 'user' | 'token' | 'isAuthenticated'> {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false };
  }
  const token = localStorage.getItem('auth_token');
  const userJson = localStorage.getItem('auth_user');
  if (!token || !userJson) {
    return { user: null, token: null, isAuthenticated: false };
  }
  try {
    const user = JSON.parse(userJson) as User;
    return { user, token, isAuthenticated: true };
  } catch {
    return { user: null, token: null, isAuthenticated: false };
  }
}

export const useAuthStore = createBaseStore<AuthStoreState>(
  { name: 'AuthStore' },
  (set) => ({
    ...getInitialAuth(),

    setAuth: (user, token) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
      }
      set({ user, token, isAuthenticated: true });
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
      set({ user: null, token: null, isAuthenticated: false });
    },
  })
);
