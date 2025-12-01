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
    name = `Remove "${params.customChar}"`;
  } else if (params.mode === "custom_position") {
    name = `Remove range ${params.startPos}-${params.endPos}`;
  }

  return {
    id: uid("act_"),
    type: "remove",
    name,
    createdAt: Date.now(),
    params,
  };
}

export function createReplaceAction(
  toReplace: string,
  replaceWith: string,
  firstN?: number,
  lastN?: number,
): RenameAction {
  return {
    id: uid("act_"),
    type: "replace",
    name: `Replace ${toReplace} with ${replaceWith}`,
    createdAt: Date.now(),
    params: { toReplace, replaceWith, firstN, lastN },
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
