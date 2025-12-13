import { create } from "zustand";

interface OptionStore {
  showDiff: boolean;
  toggleShowDiff: () => void;
}

export const useOptionStore = create<OptionStore>((set) => ({
  showDiff: true,
  toggleShowDiff: () => set((state) => ({ showDiff: !state.showDiff })),
}));
