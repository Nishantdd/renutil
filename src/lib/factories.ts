import { RemoveAction, RenameAction } from "@/types/action.types";

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
  params: RemoveAction["params"],
): RenameAction {
  let name = `Remove ${params.mode}`;
  if (params.mode === "custom_characters") {
    name = `Remove "${params.custom_char}"`;
  } else if (params.mode === "custom_position") {
    name = `Remove range ${params.start_pos}-${params.end_pos}`;
  }

  return {
    id: uid("act_"),
    type: "remove",
    name,
    createdAt: Date.now(),
    params,
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
