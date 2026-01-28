/**
 * Example Store
 * 
 * This demonstrates the store pattern.
 * Create your own stores in app/stores/ or extend this pattern
 */

import { createBaseStore } from '../store';
import type { BaseStore } from '../store';

export interface ExampleStoreState extends BaseStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useExampleStore = createBaseStore<ExampleStoreState>(
  {
    name: 'ExampleStore',
  },
  (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  })
);
