import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useCommandStore } from "@/store/commandStore";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRenameStore } from "@/store/renameStore";
import { createAddAction } from "@/lib/factories";

export default function AddMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);
  const [suffix, setSuffix] = useState("");
  const [prefix, setPrefix] = useState("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    if (!suffix && !prefix) {
      handleOpenChange();
      return;
    }
    
    addAction(createAddAction(prefix, suffix));
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
        <span className="text-sm font-medium">Add Prefix / Suffix</span>
      </div>

      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="prefix">Prefix</Label>
          <Input
            id="prefix"
            autoFocus
            placeholder="Enter prefix..."
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="suffix">Suffix</Label>
          <Input
            id="suffix"
            placeholder="Enter suffix..."
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
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
