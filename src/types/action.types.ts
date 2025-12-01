export type ActionType =
  | "addPrefix"
  | "addSuffix"
  | "addAtPosition"
  | "remove"
  | "replace"
  | "regex";

export interface BaseAction {
  id: string;
  type: ActionType;
  displayName: string;
  name?: string;
  createdAt: number;
}

// Add action types
export interface AddPrefixAction extends BaseAction {
  type: "addPrefix";
  displayName: "Add Prefix";
  params: {
    prefix: string;
  };
}

export interface AddSuffixAction extends BaseAction {
  type: "addSuffix";
  displayName: "Add Suffix";
  params: {
    suffix: string;
  };
}

export interface AddAtPositionAction extends BaseAction {
  type: "addAtPosition";
  displayName: "Add At Position";
  params: {
    position: number;
    text: string;
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
  displayName: "Remove";
  params: CountableParams | CustomCharParams | PositionParams;
}

// Replace action types
export interface ReplaceAction extends BaseAction {
  type: "replace";
  displayName: "Replace";
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
  displayName: "Regex";
  params: {
    pattern: string;
    flags?: string;
    replacement: string;
  };
}

export type RenameAction =
  | AddPrefixAction
  | AddSuffixAction
  | AddAtPositionAction
  | RemoveAction
  | ReplaceAction
  | RegexAction;
