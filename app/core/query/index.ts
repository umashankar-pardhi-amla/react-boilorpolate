/**
 * React Query Module
 * 
 * Provides query client configuration that can be extended
 */

import { registry, createRegistryKey } from '../registry';
import { BaseQueryConfig } from './base';
import type { QueryConfig } from './base';

const QUERY_CONFIG_KEY = createRegistryKey('core', 'query-config');

// Register base query config
let baseQueryConfigInstance: BaseQueryConfig | null = null;

export function createQueryConfig(config?: Partial<QueryConfig>): BaseQueryConfig {
  if (!baseQueryConfigInstance) {
    baseQueryConfigInstance = new BaseQueryConfig(config);
    registry.registerBase(QUERY_CONFIG_KEY, baseQueryConfigInstance);
  }
  return baseQueryConfigInstance;
}

export async function getQueryConfig(): Promise<BaseQueryConfig> {
  // Try to load extension if it exists
  if (registry.hasExtension(QUERY_CONFIG_KEY)) {
    return await registry.get<BaseQueryConfig>(QUERY_CONFIG_KEY);
  }
  return registry.getBase<BaseQueryConfig>(QUERY_CONFIG_KEY);
}

// Create default query config instance
export const queryConfig = createQueryConfig();

// Export types
export { BaseQueryConfig };
export type { QueryConfig } from './base';
