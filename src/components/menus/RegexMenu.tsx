import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useCommandStore } from "@/store/commandStore";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRenameStore } from "@/store/renameStore";
import { createRegexAction } from "@/lib/factories";

export default function RegexMenu({
  handleOpenChange,
}: {
  handleOpenChange: () => void;
}) {
  const setPage = useCommandStore((s) => s.setPage);
  const addAction = useRenameStore((s) => s.addAction);
  const [pattern, setPattern] = useState("");
  const [replacement, setReplacement] = useState("");
  const [flags, setFlags] = useState("g");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleApply();
  };

  const handleApply = () => {
    if (!pattern) return;
    addAction(createRegexAction(pattern, replacement, flags));
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
        <span className="text-sm font-medium">Regex Replace</span>
      </div>

      <div className="grid gap-2 py-2">
        <Label htmlFor="pattern">Regex Pattern</Label>
        <Input
          id="pattern"
          autoFocus
          placeholder="e.g. (IMG_)(\\d+)"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div className="grid gap-2 py-2">
        <Label htmlFor="replacement">Replacement</Label>
        <Input
          id="replacement"
          placeholder="e.g. $2"
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div className="grid gap-2 py-2">
        <Label htmlFor="flags">Flags <span className="text-xs text-muted-foreground">(e.g. g, i, m)</span></Label>
        <Input
          id="flags"
          placeholder="g"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleApply}>Apply Regex</Button>
      </div>
    </div>
  );
}
