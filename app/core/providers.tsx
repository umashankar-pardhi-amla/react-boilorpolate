/**
 * App Providers
 * 
 * Wraps the app with all necessary providers
 * Can be extended by creating app/extensions/providers.tsx
 */

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryConfig, getQueryConfig } from './query';
import { BaseUIProvider } from './ui';
import { registry, createRegistryKey } from './registry';

interface AppProvidersProps {
  children: ReactNode;
}

let queryClientInstance: ReturnType<typeof queryConfig.createQueryClient> | null = null;

/**
 * Get or create query client
 */
async function getQueryClient() {
  if (!queryClientInstance) {
    const config = await getQueryConfig();
    queryClientInstance = config.createQueryClient();
  }
  return queryClientInstance;
}

/**
 * Get UI Provider (base or extended)
 */
async function getUIProvider() {
  const UI_PROVIDER_KEY = createRegistryKey('core', 'ui-provider');
  
  if (registry.hasExtension(UI_PROVIDER_KEY)) {
    const Provider = await registry.get<React.ComponentType<{ children: ReactNode }>>(UI_PROVIDER_KEY);
    return Provider;
  }
  
  return BaseUIProvider;
}

/**
 * App Providers Component
 * Wraps the app with React Query and Ant Design providers
 * 
 * Extend by creating app/extensions/providers.tsx and exporting a custom AppProviders
 */
export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient, setQueryClient] = useState<ReturnType<typeof queryConfig.createQueryClient> | null>(null);
  const [UIProvider, setUIProvider] = useState<React.ComponentType<{ children: ReactNode }>>(() => BaseUIProvider);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const [client, Provider] = await Promise.all([
        getQueryClient(),
        getUIProvider(),
      ]);
      setQueryClient(client);
      setUIProvider(() => Provider);
      setIsLoading(false);
    }
    init();
  }, []);

  if (isLoading || !queryClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        {children}
      </UIProvider>
    </QueryClientProvider>
  );
}
