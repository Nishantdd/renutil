import { RenameAction } from "@/types/action.types";

/**
 * Pure transformers: each takes a filename and an action, returns new filename.
 * Important: Keep all transforms pure and deterministic.
 */
export const ACTION_TRANSFORMS: {
  [K in RenameAction["type"]]: (
    name: string,
    action: Extract<RenameAction, { type: K }>,
  ) => string;
} = {
  add: (name, action) => {
    const { prefix = "", suffix = "" } = action.params;
    return `${prefix}${name}${suffix}`;
  },

  remove: (name: string, action) => {
    const { mode } = action.params;

    if (mode === "custom_position") {
      const { start_pos, end_pos } = action.params;
      if (start_pos > end_pos || start_pos < 1) return name;

      const startIndex = start_pos - 1;
      const endIndex = end_pos;

      return name.slice(0, startIndex) + name.slice(endIndex);
    }

    let pattern: RegExp;

    switch (mode) {
      case "digits":
        pattern = /\d/g;
        break;
      case "lowercase":
        pattern = /[a-z]/g;
        break;
      case "uppercase":
        pattern = /[A-Z]/g;
        break;
      case "letters":
        pattern = /[a-zA-Z]/g;
        break;
      case "symbols":
        pattern = /[^a-zA-Z0-9\s]/g;
        break;
      case "custom_characters":
        const { custom_char } = action.params;
        if (!custom_char) return name;
        const escaped = custom_char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        pattern = new RegExp(escaped, "g");
        break;
      default:
        return name;
    }

    const first_n = action.params.first_n || 0;
    const last_n = action.params.last_n || 0;

    if (first_n === 0 && last_n === 0) {
      return name.replace(pattern, "");
    }

    const matches = [...name.matchAll(pattern)];
    const totalMatches = matches.length;
    const occurrencesToRemove = new Set<number>();

    for (let i = 0; i < first_n; i++) {
      if (i < totalMatches) occurrencesToRemove.add(i);
    }

    for (let i = 0; i < last_n; i++) {
      const targetIndex = totalMatches - 1 - i;
      if (targetIndex >= 0) occurrencesToRemove.add(targetIndex);
    }

    const cuts = matches
      .filter((_, index) => occurrencesToRemove.has(index))
      .map((m) => ({ start: m.index!, end: m.index! + m[0].length }))
      .sort((a, b) => b.start - a.start);

    let result = name;
    for (const { start, end } of cuts) {
      result = result.slice(0, start) + result.slice(end);
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
};

export function applyAction(filename: string, action: RenameAction): string {
  return ACTION_TRANSFORMS[action.type](filename as any, action as any);
}
