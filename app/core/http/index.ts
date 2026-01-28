/**
 * HTTP Client Module
 * 
 * Provides an HTTP client instance that can be extended
 */

import { registry, createRegistryKey } from '../registry';
import { BaseHttpClient } from './base';
import type { HttpConfig } from './base';

const HTTP_CLIENT_KEY = createRegistryKey('core', 'http-client');

// Register base HTTP client
let baseHttpClientInstance: BaseHttpClient | null = null;

export function createHttpClient(config?: HttpConfig): BaseHttpClient {
  if (!baseHttpClientInstance) {
    baseHttpClientInstance = new BaseHttpClient(config);
    registry.registerBase(HTTP_CLIENT_KEY, baseHttpClientInstance);
  }
  return baseHttpClientInstance;
}

export async function getHttpClient(): Promise<BaseHttpClient> {
  // Try to load extension if it exists
  if (registry.hasExtension(HTTP_CLIENT_KEY)) {
    return await registry.get<BaseHttpClient>(HTTP_CLIENT_KEY);
  }
  return registry.getBase<BaseHttpClient>(HTTP_CLIENT_KEY);
}

// Create default HTTP client instance
export const httpClient = createHttpClient();

// Export types
export { BaseHttpClient };
export type { HttpConfig, RequestInterceptor, ResponseInterceptor } from './base';
