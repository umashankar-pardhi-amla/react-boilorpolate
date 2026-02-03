/**
 * Core Registry System
 *
 * This registry allows extensions to override base implementations
 * without modifying the base code. Similar to class override patterns
 * in backend frameworks.
 *
 * Usage:
 * - Base implementations go in app/core/base/
 * - Extensions go in app/extensions/
 * - Registry automatically loads extensions and merges them with base
 */

type ExtensionLoader<T> = () => Promise<T | undefined>;

interface RegistryEntry<T> {
  base: T;
  extension?: T;
  merged?: T;
}

class Registry {
  private entries = new Map<string, RegistryEntry<unknown>>();
  private extensionLoaders = new Map<string, ExtensionLoader<unknown>>();

  /**
   * Register a base implementation
   */
  registerBase<T>(key: string, base: T): void {
    if (!this.entries.has(key)) {
      this.entries.set(key, { base });
    } else {
      const entry = this.entries.get(key)!;
      entry.base = base;
      entry.merged = undefined; // Invalidate merged cache
    }
  }

  /**
   * Register an extension loader
   * Extensions are loaded lazily when first accessed
   */
  registerExtension<T>(key: string, loader: ExtensionLoader<T>): void {
    this.extensionLoaders.set(key, loader);
  }

  /**
   * Get the merged implementation (base + extension)
   */
  async get<T>(key: string): Promise<T> {
    const entry = this.entries.get(key);
    if (!entry) {
      throw new Error(`Registry entry not found: ${key}`);
    }

    // If already merged and cached, return it
    if (entry.merged !== undefined) {
      return entry.merged as T;
    }

    // Try to load extension if loader exists
    if (this.extensionLoaders.has(key) && !entry.extension) {
      try {
        const loader = this.extensionLoaders.get(key)!;
        const extension = await loader();
        if (extension) {
          entry.extension = extension;
        }
      } catch (error) {
        console.warn(`Failed to load extension for ${key}:`, error);
      }
    }

    // Merge base and extension (replace entirely for functions)
    if (entry.extension) {
      if (typeof entry.base === "function" && typeof entry.extension === "function") {
        entry.merged = entry.extension as T;
      } else if (typeof entry.base !== "object" || typeof entry.extension !== "object") {
        entry.merged = entry.extension as T;
      } else {
        entry.merged = this.deepMerge(
          entry.base as Record<string, unknown>,
          entry.extension as Partial<Record<string, unknown>>
        ) as T;
      }
    } else {
      entry.merged = entry.base as T;
    }

    return entry.merged as T;
  }

  /**
   * Get base implementation only (synchronous)
   */
  getBase<T>(key: string): T {
    const entry = this.entries.get(key);
    if (!entry) {
      throw new Error(`Registry entry not found: ${key}`);
    }
    return entry.base as T;
  }

  /**
   * Check if extension exists for a key
   */
  hasExtension(key: string): boolean {
    return this.extensionLoaders.has(key);
  }

  /**
   * Deep merge two objects, with extension taking precedence
   */
  private deepMerge<T extends Record<string, unknown>>(base: T, extension: Partial<T>): T {
    const result = { ...base };

    for (const key in extension) {
      if (Object.hasOwn(extension, key)) {
        const baseValue = base[key];
        const extValue = extension[key];

        if (
          extValue !== undefined &&
          typeof extValue === "object" &&
          extValue !== null &&
          !Array.isArray(extValue) &&
          typeof baseValue === "object" &&
          baseValue !== null &&
          !Array.isArray(baseValue)
        ) {
          result[key] = this.deepMerge(
            baseValue as Record<string, unknown>,
            extValue as Partial<Record<string, unknown>>
          ) as T[Extract<keyof T, string>];
        } else if (extValue !== undefined) {
          result[key] = extValue as T[Extract<keyof T, string>];
        }
      }
    }

    return result;
  }

  /**
   * Clear cache for a specific entry
   */
  clearCache(key: string): void {
    const entry = this.entries.get(key);
    if (entry) {
      entry.extension = undefined;
      entry.merged = undefined;
    }
  }

  /**
   * Clear all caches
   */
  clearAllCaches(): void {
    for (const entry of this.entries.values()) {
      entry.extension = undefined;
      entry.merged = undefined;
    }
  }
}

// Singleton instance
export const registry = new Registry();

/**
 * Helper to create a registry key
 */
export const createRegistryKey = (namespace: string, key: string) => `${namespace}:${key}`;
