export type ActionType = "add" | "remove" | "regex";

export interface BaseAction {
  id: string;
  type: ActionType;
  name?: string;
  createdAt: number;
}

export interface AddAction extends BaseAction {
  type: "add";
  params: {
    prefix?: string;
    suffix?: string;
  };
}

export interface RemoveAction extends BaseAction {
  type: "remove";
  params: {
    text: string;
    mode?: "first" | "all";
  };
}

export interface RegexAction extends BaseAction {
  type: "regex";
  params: {
    pattern: string;
    flags?: string;
    replacement: string;
  };
}

export type RenameAction = AddAction | RemoveAction | RegexAction;
