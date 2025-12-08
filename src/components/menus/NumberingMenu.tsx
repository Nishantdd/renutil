import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useCommandStore } from "@/store/commandStore";
import { useRenameStore } from "@/store/renameStore";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createNumberingAction } from "@/lib/factories";
import type { NumberingActionMode } from "@/types/action.types";


export default function NumberingMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);

  const [mode, setMode] = useState<NumberingActionMode>("numeric");
  const [position, setPosition] = useState("");
  const [startsFrom, setStartsFrom] = useState("");
  const [incremental, setIncremental] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    const pos = Number.parseInt(position) || 0;
    const start = startsFrom !== "" ? Number.parseInt(startsFrom) : 1;
    const inc = incremental !== "" ? Number.parseInt(incremental) : 1;
    addAction(createNumberingAction(mode, pos, start, inc));
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
        <span className="text-sm font-medium">Add Numbering</span>
      </div>

      <div className="grid gap-2 py-2">
        <Label htmlFor="mode">Numbering Mode</Label>
        <Select value={mode} onValueChange={(v: NumberingActionMode) => setMode(v)}>
          <SelectTrigger id="mode">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="numeric">Numeric (1, 2, 3...)</SelectItem>
            <SelectItem value="roman">Roman (I, II, III...)</SelectItem>
            <SelectItem value="alphabet">Alphabet (A, B, C...)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 py-2">
        <Label htmlFor="position">Position <span className="text-xs text-muted-foreground">(0 = start, -1 = end)</span></Label>
        <Input
          autoFocus
          id="position"
          type="number"
          placeholder="0"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startsFrom">Starts From <span className="text-xs text-muted-foreground">(Optional)</span></Label>
          <Input
            id="startsFrom"
            type="number"
            placeholder="1"
            value={startsFrom}
            onChange={(e) => setStartsFrom(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="incremental">Incremental <span className="text-xs text-muted-foreground">(Optional)</span></Label>
          <Input
            id="incremental"
            type="number"
            placeholder="1"
            value={incremental}
            onChange={(e) => setIncremental(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleApply}>Apply Numbering</Button>
      </div>
    </div>
  );
}
