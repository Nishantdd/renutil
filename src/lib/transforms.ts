import { RenameAction } from "@/types/action.types";
import { applyCountableRemoval, toAlphabet, toRoman } from "./utils";

/**
 * Pure transformers: each takes a filename and an action, returns new filename.
 * Important: Keep all transforms pure and deterministic.
 */
export const ACTION_TRANSFORMS: {
  [K in RenameAction["type"]]: (
    name: string,
    action: Extract<RenameAction, { type: K }>,
    index: number
  ) => string;
} = {
  addPrefix: (name, action) => {
    const { prefix = "" } = action.params;
    return `${prefix}${name}`;
  },

  addSuffix: (name, action) => {
    const { suffix = "" } = action.params;
    return `${name}${suffix}`;
  },

  addAtPosition: (name, action) => {
    const { position = 1, text = "" } = action.params;
    if (!text) return name;
    let idx = position < 0 ? name.length + position : position;
    idx = Math.max(0, Math.min(idx, name.length));
    return name.slice(0, idx) + text + name.slice(idx);
  },

  removeDigits: (name, action) => {
    const pattern = /\d/g;
    const { firstN, lastN } = action.params;
    return applyCountableRemoval(name, pattern, firstN, lastN);
  },

  removeLowercase: (name, action) => {
    const pattern = /[a-z]/g;
    const { firstN, lastN } = action.params;
    return applyCountableRemoval(name, pattern, firstN, lastN);
  },

  removeUppercase: (name, action) => {
    const pattern = /[A-Z]/g;
    const { firstN, lastN } = action.params;
    return applyCountableRemoval(name, pattern, firstN, lastN);
  },

  removeLetters: (name, action) => {
    const pattern = /[a-zA-Z]/g;
    const { firstN, lastN } = action.params;
    return applyCountableRemoval(name, pattern, firstN, lastN);
  },

  removeSymbols: (name, action) => {
    const pattern = /[^a-zA-Z0-9\s]/g;
    const { firstN, lastN } = action.params;
    return applyCountableRemoval(name, pattern, firstN, lastN);
  },

  removeCustomCharacters: (name, action) => {
    const { customChar, firstN, lastN } = action.params;
    if (!customChar) return name;

    // Escape special regex characters in the custom string for safe RegExp creation
    const escaped = customChar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escaped, "g");

    return applyCountableRemoval(name, pattern, firstN, lastN);
  },

  removeAtPosition: (name, action) => {
    const { startPos, endPos } = action.params;
    if (startPos > endPos || startPos < 1) return name;
    return name.slice(0, startPos - 1) + name.slice(endPos);
  },

  replace: (name, action) => {
    const { replaceWith, toReplace, firstN = 0, lastN = 0 } = action.params;
    if (!toReplace) return name;

    const escaped = toReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(escaped, "g");

    if (firstN === 0 && lastN === 0) {
      return name.replace(pattern, replaceWith);
    }

    const matches = [...name.matchAll(pattern)];
    const totalMatches = matches.length;
    const indicesToReplace = new Set<number>();

    for (let i = 0; i < firstN; i++) {
      if (i < totalMatches) indicesToReplace.add(i);
    }

    for (let i = 0; i < lastN; i++) {
      const targetIndex = totalMatches - 1 - i;
      if (targetIndex >= 0) indicesToReplace.add(targetIndex);
    }

    const targets = matches
      .filter((_, idx) => indicesToReplace.has(idx))
      .sort((a, b) => b.index! - a.index!);

    let result = name;
    for (const match of targets) {
      const start = match.index!;
      const end = start + match[0].length;
      result = result.slice(0, start) + replaceWith + result.slice(end);
    }

    return result;
  },

  regex: (name, action) => {
    const { pattern, flags = "", replacement = "" } = action.params;
    if (!pattern) return name;
    try {
      const re = new RegExp(pattern, flags);
      return name.replace(re, replacement);
    } catch (e) {
      return name;
    }
  },

  numbering: (name, action, index) => {
    const { mode, position, incremental = 1, startsFrom = 1 } = action.params;
    if (!position) return name;
    const pos = Math.min(Math.max(0, position), name.length);

    const value = startsFrom + index * incremental;

    let insertValue = "";
    switch (mode) {
      case "numeric":
        insertValue = value.toString();
        break;
      case "roman":
        insertValue = toRoman(value);
        break;
      case "alphabet":
        insertValue = toAlphabet(value - 1);
        break;
    }

    return name.slice(0, pos) + insertValue + name.slice(pos);
  }
};

export function applyAction(filename: string, action: RenameAction, index: number): string {
  return ACTION_TRANSFORMS[action.type](filename as any, action as any, index);
}
