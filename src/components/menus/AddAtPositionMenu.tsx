import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useCommandStore } from "@/store/commandStore";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRenameStore } from "@/store/renameStore";
import { createAddAtPositionAction } from "@/lib/factories";

export default function AddAtPositionMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);
  const [position, setPosition] = useState("1");
  const [text, setText] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    if (!text) return;
    const pos = Number.parseInt(position) || 1;
    addAction(createAddAtPositionAction(pos, text));
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
        <span className="text-sm font-medium">Add At Position</span>
      </div>

      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="text">Text</Label>
          <Input
            id="text"
            autoFocus
            placeholder="Enter text..."
            value={text}
            minLength={1}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            type="number"
            min={1}
            placeholder="1"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
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
