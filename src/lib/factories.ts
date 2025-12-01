import { RenameAction, CountableRemovalParams } from "@/types/action.types.ts";

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

export function createRemoveDigitsAction(
  params: CountableRemovalParams = {},
): RenameAction {
  let name = `Remove Digits`;
  if (params.firstN) name += ` (First ${params.firstN})`;
  if (params.lastN) name += ` (Last ${params.lastN})`;

  return {
    id: uid("act_"),
    type: "removeDigits",
    displayName: "Remove Digits",
    name,
    createdAt: Date.now(),
    params,
  };
}

export function createRemoveLowercaseAction(
  params: CountableRemovalParams = {},
): RenameAction {
  let name = `Remove Lowercase Letters`;
  if (params.firstN) name += ` (First ${params.firstN})`;
  if (params.lastN) name += ` (Last ${params.lastN})`;

  return {
    id: uid("act_"),
    type: "removeLowercase",
    displayName: "Remove Lowercase Letters",
    name,
    createdAt: Date.now(),
    params,
  };
}

export function createRemoveUppercaseAction(
  params: CountableRemovalParams = {},
): RenameAction {
  let name = `Remove Uppercase Letters`;
  if (params.firstN) name += ` (First ${params.firstN})`;
  if (params.lastN) name += ` (Last ${params.lastN})`;

  return {
    id: uid("act_"),
    type: "removeUppercase",
    displayName: "Remove Uppercase Letters",
    name,
    createdAt: Date.now(),
    params,
  };
}

export function createRemoveLettersAction(
  params: CountableRemovalParams = {},
): RenameAction {
  let name = `Remove All Letters`;
  if (params.firstN) name += ` (First ${params.firstN})`;
  if (params.lastN) name += ` (Last ${params.lastN})`;

  return {
    id: uid("act_"),
    type: "removeLetters",
    displayName: "Remove All Letters",
    name,
    createdAt: Date.now(),
    params,
  };
}

export function createRemoveSymbolsAction(
  params: CountableRemovalParams = {},
): RenameAction {
  let name = `Remove Symbols`;
  if (params.firstN) name += ` (First ${params.firstN})`;
  if (params.lastN) name += ` (Last ${params.lastN})`;

  return {
    id: uid("act_"),
    type: "removeSymbols",
    displayName: "Remove Symbols",
    name,
    createdAt: Date.now(),
    params,
  };
}

export function createRemoveCustomCharactersAction(
  customChar = "",
  firstN?: number,
  lastN?: number,
): RenameAction {
  let name = `Remove custom char "${customChar}"`;

  return {
    id: uid("act_"),
    type: "removeCustomCharacters",
    displayName: "Remove Custom Characters",
    name,
    createdAt: Date.now(),
    params: { customChar, firstN, lastN },
  };
}

export function createRemoveAtPositionAction(
  startPos = 1,
  endPos = 1,
): RenameAction {
  const name = `Remove range ${startPos}-${endPos}`;

  return {
    id: uid("act_"),
    type: "removeAtPosition",
    displayName: "Remove At Position",
    name,
    createdAt: Date.now(),
    params: { startPos, endPos },
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
