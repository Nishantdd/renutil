import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useCommandStore } from "@/store/commandStore";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRenameStore } from "@/store/renameStore";
import { createReplaceAction } from "@/lib/factories";

export default function ReplaceMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);

  const [toReplace, setToReplace] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    if (!toReplace) return;

    addAction(
      createReplaceAction(
        toReplace,
        replaceWith,
        Number.parseInt(firstN) || 0,
        Number.parseInt(lastN) || 0,
      ),
    );
    
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
        <span className="text-sm font-medium">Replace Text</span>
      </div>

      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="toReplace">Find</Label>
          <Input
            id="toReplace"
            autoFocus
            placeholder="Text to find..."
            value={toReplace}
            onChange={(e) => setToReplace(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="replaceWith">Replace with</Label>
          <Input
            id="replaceWith"
            placeholder="Replacement text..."
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstN">
              First N
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
              Last N
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
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}
