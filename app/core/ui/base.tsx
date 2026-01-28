/**
 * Base UI Components
 * 
 * Extend components by creating app/extensions/ui/[component-name].tsx
 */

import { ConfigProvider, theme } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { ReactNode } from 'react';

export interface ThemeConfig {
  token?: ConfigProviderProps['theme'] extends { token?: infer T } ? T : never;
  algorithm?: ConfigProviderProps['theme'] extends { algorithm?: infer A } ? A : never;
  components?: ConfigProviderProps['theme'] extends { components?: infer C } ? C : never;
}

export interface BaseUIProviderProps {
  children: ReactNode;
  theme?: ThemeConfig;
  locale?: ConfigProviderProps['locale'];
}

/**
 * Base UI Provider
 * Wraps app with Ant Design ConfigProvider
 */
export function BaseUIProvider({ children, theme: themeConfig, locale }: BaseUIProviderProps) {
  const defaultTheme: ConfigProviderProps['theme'] = themeConfig
    ? {
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
          ...(themeConfig.token || {}),
        },
        algorithm: themeConfig.algorithm || theme.defaultAlgorithm,
        ...(themeConfig.components ? { components: themeConfig.components } : {}),
      }
    : {
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
        algorithm: theme.defaultAlgorithm,
      };

  return (
    <ConfigProvider
      theme={defaultTheme}
      locale={locale}
    >
      {children}
    </ConfigProvider>
  );
}
