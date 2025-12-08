export type ActionType =
  | "addPrefix"
  | "addSuffix"
  | "addAtPosition"
  | "removeDigits"
  | "removeLowercase"
  | "removeUppercase"
  | "removeLetters"
  | "removeSymbols"
  | "removeCustomCharacters"
  | "removeAtPosition"
  | "replace"
  | "regex"
  | "numbering";

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
export interface CountableRemovalParams {
  firstN?: number;
  lastN?: number;
}

export interface RemoveDigitsAction extends BaseAction {
  type: "removeDigits";
  displayName: "Remove Digits";
  params: CountableRemovalParams;
}

export interface RemoveLowercaseAction extends BaseAction {
  type: "removeLowercase";
  displayName: "Remove Lowercase Letters";
  params: CountableRemovalParams;
}

export interface RemoveUppercaseAction extends BaseAction {
  type: "removeUppercase";
  displayName: "Remove Uppercase Letters";
  params: CountableRemovalParams;
}

export interface RemoveLettersAction extends BaseAction {
  type: "removeLetters";
  displayName: "Remove All Letters";
  params: CountableRemovalParams;
}

export interface RemoveSymbolsAction extends BaseAction {
  type: "removeSymbols";
  displayName: "Remove Symbols";
  params: CountableRemovalParams;
}

export interface RemoveCustomCharactersAction extends BaseAction {
  type: "removeCustomCharacters";
  displayName: "Remove Custom Characters";
  params: {
    customChar: string;
    firstN?: number;
    lastN?: number;
  };
}

export interface RemoveAtPositionAction extends BaseAction {
  type: "removeAtPosition";
  displayName: "Remove At Position";
  params: {
    startPos: number;
    endPos: number;
  };
}

export type CountableActionType =
  | "removeDigits"
  | "removeLowercase"
  | "removeUppercase"
  | "removeLetters"
  | "removeSymbols";

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

// Numbering action types
export interface NumberingAction extends BaseAction {
  type: "numbering";
  displayName: "Numbering";
  params: {}
}

export type RenameAction =
  | AddPrefixAction
  | AddSuffixAction
  | AddAtPositionAction
  | RemoveDigitsAction
  | RemoveLowercaseAction
  | RemoveUppercaseAction
  | RemoveLettersAction
  | RemoveSymbolsAction
  | RemoveCustomCharactersAction
  | RemoveAtPositionAction
  | ReplaceAction
  | RegexAction
  | NumberingAction;
