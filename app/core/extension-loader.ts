/**
 * Extension Loader
 *
 * Automatically loads extensions from app/extensions/
 * Extensions can override base implementations
 */

import { registry, createRegistryKey } from "./registry";

/**
 * Load all extensions
 * This should be called during app initialization
 */
export async function loadExtensions(): Promise<void> {
  const extensionModules = [
    // Logger extension
    {
      key: createRegistryKey("core", "logger"),
      loader: () => import("~/extensions/logger/logger").catch(() => null),
      getInstance: (mod: Record<string, unknown>) => mod?.logger,
    },
    // HTTP Client extension
    {
      key: createRegistryKey("core", "http-client"),
      loader: () => import("~/extensions/http/client").catch(() => null),
      getInstance: (mod: Record<string, unknown>) => mod?.httpClient,
    },
    // Query Config extension
    {
      key: createRegistryKey("core", "query-config"),
      loader: () => import("~/extensions/query/config").catch(() => null),
      getInstance: (mod: Record<string, unknown>) => mod?.queryConfig,
    },
    // UI Provider extension
    {
      key: createRegistryKey("core", "ui-provider"),
      loader: () => import("~/extensions/ui/provider").catch(() => null),
      getInstance: (mod: Record<string, unknown>) => mod?.UIProvider || mod?.default,
    },
    // formatDate function extension
    {
      key: createRegistryKey("utils", "formatDate"),
      loader: () => import("~/extensions/utils/formatDate").catch(() => null),
      getInstance: (mod: Record<string, unknown>) => mod?.formatDate,
    },
  ];

  for (const { key, loader, getInstance } of extensionModules) {
    try {
      const mod = await loader();
      if (mod) {
        const instance = getInstance(mod);
        if (instance) {
          registry.registerExtension(key, async () => instance);
        }
      }
    } catch {
      // Extension not found - that's okay, use base implementation
      // Only log in dev mode to avoid console noise
      if (import.meta.env.DEV) {
        console.debug(`Extension not found for ${key}, using base implementation`);
      }
    }
  }
}

/**
 * Load a specific extension
 */
export async function loadExtension<T>(
  key: string,
  loader: () => Promise<{ default?: T; [key: string]: unknown }>,
  getInstance?: (mod: Record<string, unknown>) => T
): Promise<T | null> {
  try {
    const mod = await loader();
    const instance = getInstance ? getInstance(mod) : (mod.default as T | undefined);
    if (instance) {
      registry.registerExtension(key, async () => instance);
      return instance;
    }
  } catch {
    console.debug(`Extension not found for ${key}`);
  }
  return null;
}
