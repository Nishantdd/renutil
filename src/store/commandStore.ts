import { ActionType } from "@/types/action.types";
import { create } from "zustand";

export type CommandPage = "root" | ActionType;

interface CommandStore {
  open: boolean;
  setOpen: (open: boolean | ((state: boolean) => boolean)) => void;
  page: CommandPage;
  setPage: (page: CommandPage) => void;
}

export const useCommandStore = create<CommandStore>((set) => ({
  open: false,
  setOpen: (updater) =>
    set((state) => ({
      open: typeof updater === "function" ? updater(state.open) : updater,
    })),
  page: "root",
  setPage: (page) => set({ page }),
}));
