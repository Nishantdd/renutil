import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useCommandStore } from "@/store/commandStore";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRenameStore } from "@/store/renameStore";
import { createRemoveAction } from "@/lib/factories";
import { ModeType } from "@/types/action.types";

export default function RemoveMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);

  const [mode, setMode] = useState<ModeType>("custom_characters");
  const [customChar, setCustomChar] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");
  const [startPos, setStartPos] = useState("");
  const [endPos, setEndPos] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    const params: any = { mode };

    if (mode === "custom_position") {
      const start = parseInt(startPos);
      const end = parseInt(endPos);
      if (isNaN(start) || isNaN(end)) return;
      params.startPos = start;
      params.endPos = end;
    } else if (mode === "custom_characters") {
      if (!customChar) return;
      params.customChar = customChar;
      params.firstN = parseInt(firstN) || 0;
      params.lastN = parseInt(lastN) || 0;
    } else {
      params.firstN = parseInt(firstN) || 0;
      params.lastN = parseInt(lastN) || 0;
    }

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
        <span className="text-sm font-medium">Remove Text</span>
      </div>

      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label>Mode</Label>
          <Select
            value={mode}
            onValueChange={(val) => setMode(val as ModeType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom_characters">Specific Text</SelectItem>
              <SelectItem value="custom_position">Position Range</SelectItem>
              <SelectItem value="digits">Digits (0-9)</SelectItem>
              <SelectItem value="letters">Letters (A-Z, a-z)</SelectItem>
              <SelectItem value="lowercase">Lowercase (a-z)</SelectItem>
              <SelectItem value="uppercase">Uppercase (A-Z)</SelectItem>
              <SelectItem value="symbols">Symbols / Special</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {mode === "custom_characters" && (
          <div className="grid gap-2">
            <Label htmlFor="customChar">Text to remove</Label>
            <Input
              id="customChar"
              autoFocus
              placeholder="e.g. IMG_"
              value={customChar}
              onChange={(e) => setCustomChar(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        )}

        {mode === "custom_position" ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startPos">Start Position</Label>
              <Input
                id="startPos"
                type="number"
                min={1}
                placeholder="1"
                value={startPos}
                onChange={(e) => setStartPos(e.target.value)}
                onKeyDown={handleInputKeyDown}
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
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstN">
                First N
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
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
                Last N
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
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
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}
