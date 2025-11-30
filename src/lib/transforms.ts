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

  remove: (name, action) => {
    const { text, mode = "all" } = action.params;
    if (!text) return name;
    if (mode === "first") {
      const i = name.indexOf(text);
      return i === -1 ? name : name.slice(0, i) + name.slice(i + text.length);
    }
    // mode === "all"
    return name.split(text).join("");
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
