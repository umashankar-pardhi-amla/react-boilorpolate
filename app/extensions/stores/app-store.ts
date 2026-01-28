/**
 * App-level Zustand store – theme, sidebar, user preferences.
 * Example of a store that lives only in extensions (no base override).
 */

import { createBaseStore } from '~/core/store';
import type { BaseStore } from '~/core/store';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppStoreState extends BaseStore {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
}

export const useAppStore = createBaseStore<AppStoreState>(
  { name: 'AppStore' },
  (set) => ({
    theme: 'system',
    sidebarCollapsed: false,

    setTheme: (theme) => set({ theme }),

    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  })
);
