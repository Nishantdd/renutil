import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useCommandStore } from "@/store/commandStore";
import { useRenameStore } from "@/store/renameStore";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { createRemoveAtPositionAction } from "@/lib/factories";

export default function RemoveAtPositionMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);

  const [startPos, setStartPos] = useState("1");
  const [endPos, setEndPos] = useState("1");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    const start = Number.parseInt(startPos, 10);
    const end = Number.parseInt(endPos, 10);
    if (isNaN(start) || isNaN(end) || start < 1 || end < 1) return;

    addAction(createRemoveAtPositionAction(start, end));
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
        <span className="text-sm font-medium">Remove by Position Range</span>
      </div>

      <div className="grid grid-cols-2 gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="startPos">Start Position (1-based)</Label>
          <Input
            id="startPos"
            type="number"
            min={1}
            placeholder="1"
            value={startPos}
            onChange={(e) => setStartPos(e.target.value)}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endPos">End Position</Label>
          <Input
            id="endPos"
            type="number"
            min={1}
            placeholder="5"
            value={endPos}
            onChange={(e) => setEndPos(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleApply}>Apply Position Removal</Button>
      </div>
    </div>
  );
}
