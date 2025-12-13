import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useCommandStore } from "@/store/commandStore";
import { useRenameStore } from "@/store/renameStore";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  createRemoveDigitsAction,
  createRemoveLowercaseAction,
  createRemoveUppercaseAction,
  createRemoveLettersAction,
  createRemoveSymbolsAction,
} from "@/lib/factories";
import { CountableActionType } from "@/types/action.types";

const COUNTABLE_REMOVE_ACTIONS = {
  removeDigits: createRemoveDigitsAction,
  removeLowercase: createRemoveLowercaseAction,
  removeUppercase: createRemoveUppercaseAction,
  removeLetters: createRemoveLettersAction,
  removeSymbols: createRemoveSymbolsAction,
};

const COUNTABLE_REMOVE_ACTIONS_NAMES = {
  removeDigits: "Remove Digits",
  removeLowercase: "Remove Lowercase (a..z)",
  removeUppercase: "Remove Uppercase (A..Z)",
  removeLetters: "Remove Letters (a..Z)",
  removeSymbols: "Remove Symbols",
};

export default function CountableRemoveMenu({
  actionType,
  handleOpenChange,
}: {
  actionType: CountableActionType;
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);
  const createRemoveAction = COUNTABLE_REMOVE_ACTIONS[actionType];
  const removeActionHeader = COUNTABLE_REMOVE_ACTIONS_NAMES[actionType];
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    const params = {
      firstN: Number.parseInt(firstN, 10) || 0,
      lastN: Number.parseInt(lastN, 10) || 0,
    };

    addAction(createRemoveAction(params));
    handleOpenChange();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 border-b pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setPage("root")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{removeActionHeader}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="firstN">
            First N{" "}
            <span className="text-xs text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="firstN"
            type="number"
            autoFocus
            min={0}
            placeholder="All"
            value={firstN}
            onChange={(e) => setFirstN(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastN">
            Last N{" "}
            <span className="text-xs text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="lastN"
            type="number"
            min={0}
            placeholder="All"
            value={lastN}
            onChange={(e) => setLastN(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}
