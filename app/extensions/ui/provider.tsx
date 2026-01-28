/**
 * Extended UI Provider – theme + CSS extensibility example.
 * Custom Ant Design tokens and global CSS class for app shell.
 */

import type { ReactNode } from 'react';
import { BaseUIProvider } from '~/core/ui';
import type { ThemeConfig } from '~/core/ui';

const extendedTheme = {
  token: {
    colorPrimary: '#6366f1',
    borderRadius: 8,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      primaryShadow: '0 2px 6px rgba(99, 102, 241, 0.35)',
      fontWeight: 500,
    },
    Card: {
      headerFontSize: 16,
    },
  },
} as unknown as ThemeConfig;

export interface ExtendedUIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: ExtendedUIProviderProps) {
  return (
    <BaseUIProvider theme={extendedTheme}>
      <div className="ext-app-shell">
        {children}
      </div>
    </BaseUIProvider>
  );
}

export default UIProvider;
