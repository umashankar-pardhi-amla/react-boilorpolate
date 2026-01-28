/**
 * Extended Zustand store example.
 * Adds step size and history. Same pattern as core stores – extend by adding new stores here.
 */

import { createBaseStore } from '~/core/store';
import type { BaseStore } from '~/core/store';

export interface CounterStoreState extends BaseStore {
  count: number;
  step: number;
  history: number[];
  increment: () => void;
  decrement: () => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useCounterStore = createBaseStore<CounterStoreState>(
  { name: 'CounterStore' },
  (set) => ({
    count: 0,
    step: 1,
    history: [],

    increment: () =>
      set((state) => ({
        count: state.count + state.step,
        history: [...state.history.slice(-9), state.count + state.step],
      })),

    decrement: () =>
      set((state) => ({
        count: state.count - state.step,
        history: [...state.history.slice(-9), state.count - state.step],
      })),

    setStep: (step) => set({ step }),

    reset: () => set({ count: 0, history: [] }),
  })
);
