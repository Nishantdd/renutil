import { type } from "@tauri-apps/plugin-os";
import { create } from "zustand";

interface OptionStore {
  osType: "linux" | "macos" | "windows" | "ios" | "android";
  showDiff: boolean;
  toggleShowDiff: () => void;
}

export const useOptionStore = create<OptionStore>((set) => ({
  osType: type(),
  showDiff: true,
  toggleShowDiff: () => set((state) => ({ showDiff: !state.showDiff })),
}));
