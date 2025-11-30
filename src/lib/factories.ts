import { RenameAction } from "@/types/action.types";

export const uid = (prefix = "") =>
  prefix + Math.random().toString(36).slice(2, 9);

export function createAddAction(prefix = "", suffix = ""): RenameAction {
  return {
    id: uid("act_"),
    type: "add",
    name: `Add "${prefix}" ... "${suffix}"`,
    createdAt: Date.now(),
    params: { prefix, suffix },
  };
}

export function createRemoveAction(
  text: string,
  mode: "first" | "all" = "all",
): RenameAction {
  return {
    id: uid("act_"),
    type: "remove",
    name: `Remove "${text}" (${mode})`,
    createdAt: Date.now(),
    params: { text, mode },
  };
}

export function createRegexAction(
  pattern: string,
  replacement = "",
  flags = "g",
): RenameAction {
  return {
    id: uid("act_"),
    type: "regex",
    name: `Regex /${pattern}/${flags} → "${replacement}"`,
    createdAt: Date.now(),
    params: { pattern, flags, replacement },
  };
}
