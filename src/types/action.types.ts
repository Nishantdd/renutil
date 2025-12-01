export type ActionType = "add" | "remove" | "replace" | "regex";

export interface BaseAction {
  id: string;
  type: ActionType;
  name?: string;
  createdAt: number;
}

// Add action types
export interface AddAction extends BaseAction {
  type: "add";
  params: {
    prefix?: string;
    suffix?: string;
  };
}

// Remove action types
export type ModeType =
  | "digits"
  | "lowercase"
  | "uppercase"
  | "letters"
  | "symbols"
  | "custom_characters"
  | "custom_position";

type CountableMode =
  | "digits"
  | "lowercase"
  | "uppercase"
  | "letters"
  | "symbols";

interface CountableParams {
  mode: CountableMode;
  firstN?: number;
  lastN?: number;
}

interface CustomCharParams {
  mode: "custom_characters";
  customChar: string;
  firstN?: number;
  lastN?: number;
}

interface PositionParams {
  mode: "custom_position";
  startPos: number;
  endPos: number;
}

export interface RemoveAction extends BaseAction {
  type: "remove";
  params: CountableParams | CustomCharParams | PositionParams;
}

// Replace action types
export interface ReplaceAction extends BaseAction {
  type: "replace";
  params: {
    toReplace: string;
    replaceWith: string;
    firstN?: number;
    lastN?: number;
  };
}

// Regex action types
export interface RegexAction extends BaseAction {
  type: "regex";
  params: {
    pattern: string;
    flags?: string;
    replacement: string;
  };
}

export type RenameAction =
  | AddAction
  | RemoveAction
  | ReplaceAction
  | RegexAction;
