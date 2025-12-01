import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useCommandStore } from "@/store/commandStore";
import { useRenameStore } from "@/store/renameStore";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createRemoveCustomCharactersAction } from "@/lib/factories";

export default function RemoveCustomCharactersMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);

  const [customChar, setCustomChar] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    if (!customChar) return;

    const first = Number.parseInt(firstN, 10) || 0;
    const last = Number.parseInt(lastN, 10) || 0;

    addAction(createRemoveCustomCharactersAction(customChar, first, last));
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
        <span className="text-sm font-medium">Remove Specific Text</span>
      </div>

      <div className="grid gap-2 py-2">
        <Label htmlFor="customChar">Text/Characters to remove</Label>
        <Input
          id="customChar"
          autoFocus
          placeholder="e.g. IMG_, -"
          value={customChar}
          onChange={(e) => setCustomChar(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstN">
            First N{" "}
            <span className="text-xs text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="firstN"
            type="number"
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
        <Button onClick={handleApply}>Apply Text Removal</Button>
      </div>
    </div>
  );
}
