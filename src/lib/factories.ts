import { RemoveAction, RenameAction } from "@/types/action.types";

export const uid = (prefix = "") =>
  prefix + Math.random().toString(36).slice(2, 9);

export function createAddPrefixAction(prefix = ""): RenameAction {
  return {
    id: uid("act_"),
    type: "addPrefix",
    displayName: "Add Prefix",
    name: `Add prefix "${prefix}"`,
    createdAt: Date.now(),
    params: { prefix },
  };
}

export function createAddSuffixAction(suffix = ""): RenameAction {
  return {
    id: uid("act_"),
    type: "addSuffix",
    displayName: "Add Suffix",
    name: `Add suffix "${suffix}"`,
    createdAt: Date.now(),
    params: { suffix },
  };
}

export function createAddAtPositionAction(
  position = 1,
  text = "",
): RenameAction {
  return {
    id: uid("act_"),
    type: "addAtPosition",
    displayName: "Add At Position",
    name: `Add ${text} at ${position} position`,
    createdAt: Date.now(),
    params: { position, text },
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
    displayName: "Remove",
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
    displayName: "Replace",
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
    displayName: "Regex",
    name: `Regex /${pattern}/${flags} → "${replacement}"`,
    createdAt: Date.now(),
    params: { pattern, flags, replacement },
  };
}
