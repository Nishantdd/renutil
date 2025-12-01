export type ActionType = "add" | "remove" | "regex";

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
  first_n?: number;
  last_n?: number;
}

interface CustomCharParams {
  mode: "custom_characters";
  custom_char: string;
  first_n?: number;
  last_n?: number;
}

interface PositionParams {
  mode: "custom_position";
  start_pos: number;
  end_pos: number;
}

export interface RemoveAction extends BaseAction {
  type: "remove";
  params: CountableParams | CustomCharParams | PositionParams;
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

export type RenameAction = AddAction | RemoveAction | RegexAction;
