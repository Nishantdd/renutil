import { create } from "zustand";
import { produce } from "immer";
import { RenameAction } from "@/types/action.types";
import { applyAction } from "@/lib/transforms";

type CacheMap = Map<number, string[]>;

interface RenameState {
  originalFiles: string[];
  actions: RenameAction[];
  cache: CacheMap;

  // actions
  setOriginalFiles: (files: string[]) => void;
  addAction: (action: RenameAction) => void;
  insertActionAt: (index: number, action: RenameAction) => void;
  removeActionById: (id: string) => void;
  updateAction: (id: string, updated: RenameAction) => void;
  reorderActions: (fromIndex: number, toIndex: number) => void;

  // helpers
  getResults: () => string[];
  recomputeFromIndex: (startIndex: number) => void;
}

export const useRenameStore = create<RenameState>((set, get) => {
  const createCacheWithOrigin = (orig: string[]) => {
    const m = new Map<number, string[]>();
    m.set(-1, orig.slice());
    return m;
  };

  return {
    originalFiles: [],
    actions: [],
    cache: createCacheWithOrigin([]),

    setOriginalFiles: (files) =>
      set(() => {
        const cache = createCacheWithOrigin(files);
        return { originalFiles: files.slice(), cache, actions: [] };
      }),

    addAction: (action) =>
      set((state) => {
        const actions = state.actions.concat([action]);
        const cache = new Map(state.cache); // shallow copy

        // ensure cache contains origin
        if (!cache.has(-1)) cache.set(-1, state.originalFiles.slice());
        const startIndex = actions.length - 1; // compute only last action

        // compute cache[startIndex] from previous
        const prev = cache.get(startIndex - 1) ?? state.originalFiles;
        const result = prev.map((n) => applyAction(n, action));
        cache.set(startIndex, result);
        return { actions, cache };
      }),

    insertActionAt: (index, action) =>
      set((state) => {
        const actions = [...state.actions];
        actions.splice(index, 0, action);
        const cache = new Map(state.cache);

        // invalidate from index to end
        for (let i = index; i <= state.actions.length; i++) cache.delete(i);

        // recompute forward from index
        const recompute = (start: number, actionsList: RenameAction[]) => {
          for (let i = start; i < actionsList.length; i++) {
            const prev = cache.get(i - 1) ?? state.originalFiles;
            const out = prev.map((f) => applyAction(f, actionsList[i]));
            cache.set(i, out);
          }
        };

        recompute(index, actions);
        return { actions, cache };
      }),

    removeActionById: (id) =>
      set((state) => {
        const idx = state.actions.findIndex((a) => a.id === id);
        if (idx === -1) return state;
        const actions = state.actions.filter((a) => a.id !== id);
        const cache = new Map(state.cache);

        // invalidate and recompute from idx
        for (let i = idx; i <= state.actions.length; i++) cache.delete(i);
        for (let i = idx; i < actions.length; i++) {
          const prev = cache.get(i - 1) ?? state.originalFiles;
          const out = prev.map((f) => applyAction(f, actions[i]));
          cache.set(i, out);
        }

        return { actions, cache };
      }),

    updateAction: (id, updated) =>
      set((state) => {
        const idx = state.actions.findIndex((a) => a.id === id);
        if (idx === -1) return state;

        const actions = state.actions.map((a) => (a.id === id ? updated : a));
        const cache = new Map(state.cache);
        for (let i = idx; i <= state.actions.length; i++) {
          cache.delete(i);
        }

        for (let i = idx; i < actions.length; i++) {
          const prev = cache.get(i - 1) ?? state.originalFiles;
          const out = prev.map((f) => applyAction(f, actions[i]));
          cache.set(i, out);
        }

        return { actions, cache };
      }),

    reorderActions: (fromIndex, toIndex) =>
      set((state) => {
        if (fromIndex === toIndex) return state;
        const actions = [...state.actions];
        const [moved] = actions.splice(fromIndex, 1);
        actions.splice(toIndex, 0, moved);
        const cache = new Map(state.cache);
        const startIndex = Math.min(fromIndex, toIndex);
        for (let i = startIndex; i <= state.actions.length; i++)
          cache.delete(i);
        for (let i = startIndex; i < actions.length; i++) {
          const prev = cache.get(i - 1) ?? state.originalFiles;
          const out = prev.map((f) => applyAction(f, actions[i]));
          cache.set(i, out);
        }
        return { actions, cache };
      }),

    recomputeFromIndex: (startIndex) =>
      set((state) => {
        const cache = new Map(state.cache);
        for (let i = startIndex; i <= state.actions.length; i++)
          cache.delete(i);
        for (let i = startIndex; i < state.actions.length; i++) {
          const prev = cache.get(i - 1) ?? state.originalFiles;
          const out = prev.map((f) => applyAction(f, state.actions[i]));
          cache.set(i, out);
        }
        return { cache };
      }),

    getResults: () => {
      const s = get();
      const lastIndex = s.actions.length - 1;
      if (lastIndex < 0) {
        return s.cache.get(-1) ?? s.originalFiles;
      }
      return s.cache.get(lastIndex) ?? s.originalFiles;
    },
  };
});
