/**
 * Base Store Pattern for Zustand
 *
 * Extend stores by creating app/extensions/stores/[store-name].ts
 */

import { create } from "zustand";
import type { StateCreator, StoreApi, UseBoundStore } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { logger } from "../logger";

export interface StoreConfig {
  name: string;
  enableDevtools?: boolean;
  enableSubscribeWithSelector?: boolean;
}

export type StoreCreator<T> = StateCreator<T, [], [], T>;

/**
 * Base store factory
 * Creates a Zustand store with optional devtools and selector subscription
 */
export function createBaseStore<T extends object>(
  config: StoreConfig,
  storeCreator: StoreCreator<T>
): UseBoundStore<StoreApi<T>> {
  const { name, enableDevtools = import.meta.env.DEV, enableSubscribeWithSelector = true } = config;

  // Build middleware chain (wrapped types are compatible at runtime)
  let middleware: StateCreator<T, [], [], T> = storeCreator;

  if (enableSubscribeWithSelector) {
    middleware = subscribeWithSelector(middleware) as StateCreator<T, [], [], T>;
  }
  if (enableDevtools) {
    middleware = devtools(middleware, { name }) as StateCreator<T, [], [], T>;
  }

  const store = create<T>()(middleware);

  // Log store creation in dev mode
  if (import.meta.env.DEV) {
    logger.debug(`Store created: ${name}`);
  }

  return store;
}

/**
 * Base store interface
 * All stores should extend this pattern
 */
export interface BaseStore {
  // Add common store methods here if needed
  reset?: () => void;
}
