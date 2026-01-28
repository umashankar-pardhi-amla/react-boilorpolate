/**
 * Base React Query Configuration
 * 
 * Extend this by creating app/extensions/query/config.ts
 */

import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig, DefaultOptions } from '@tanstack/react-query';
import { logger } from '../logger';

export interface QueryConfig extends QueryClientConfig {
  defaultOptions?: DefaultOptions;
}

export class BaseQueryConfig {
  protected config: QueryConfig;

  constructor(config: Partial<QueryConfig> = {}) {
    this.config = {
      defaultOptions: {
        queries: {
          retry: 3,
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
          ...config.defaultOptions?.queries,
        },
        mutations: {
          retry: 1,
          ...config.defaultOptions?.mutations,
        },
      },
      ...config,
    };
  }

  /**
   * Create query client with base configuration
   */
  createQueryClient(): QueryClient {
    const queryClient = new QueryClient(this.config);

    // Setup devtools in development
    if (import.meta.env.DEV) {
      this.setupDevtools(queryClient);
    }

    return queryClient;
  }

  /**
   * Setup devtools - can be overridden
   */
  protected setupDevtools(queryClient: QueryClient): void {
    // Base implementation - can be extended
    logger.debug('React Query DevTools enabled');
  }

  /**
   * Get query config
   */
  getConfig(): QueryConfig {
    return { ...this.config };
  }

  /**
   * Update query config
   */
  updateConfig(updates: Partial<QueryConfig>): void {
    this.config = {
      ...this.config,
      ...updates,
      defaultOptions: {
        ...this.config.defaultOptions,
        ...updates.defaultOptions,
        queries: {
          ...this.config.defaultOptions?.queries,
          ...updates.defaultOptions?.queries,
        },
        mutations: {
          ...this.config.defaultOptions?.mutations,
          ...updates.defaultOptions?.mutations,
        },
      },
    };
  }
}
