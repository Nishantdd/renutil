import { Change } from "@/types/change.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Replace({
  changes,
  setChanges,
}: {
  changes: Array<Change>;
  setChanges: React.Dispatch<React.SetStateAction<Change[]>>;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [replaceText, setReplaceText] = useState("");
  const [withText, setWithText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [replaceFirst, setReplaceFirst] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEnabled || !replaceText || !withText) return;

    try {
      const escapedSearch = escapeRegExp(replaceText);
      let flags = matchCase ? "" : "i";
      if (!replaceFirst) flags += "g";

      const regex = new RegExp(escapedSearch, flags);
      const updatedChanges = changes.map((change) => ({
        ...change,
        new: change.old.replace(regex, withText),
      }));

      setChanges(updatedChanges);
      setError("");
    } catch (err) {
      setError("Invalid replacement pattern");
    }
  }, [isEnabled, replaceText, withText, matchCase, replaceFirst]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Replace</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label="Toggle replace"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="replace">Replace</Label>
          <Input
            id="replace"
            placeholder="Text to replace"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            disabled={!isEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="with">With</Label>
          <Input
            id="with"
            placeholder="Replacement text"
            value={withText}
            onChange={(e) => setWithText(e.target.value)}
            disabled={!isEnabled}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="matchCase"
              checked={matchCase}
              onCheckedChange={(checked) => setMatchCase(!!checked)}
              disabled={!isEnabled}
            />
            <Label htmlFor="matchCase">Match Case</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="replaceFirst"
              checked={replaceFirst}
              onCheckedChange={(checked) => setReplaceFirst(!!checked)}
              disabled={!isEnabled}
            />
            <Label htmlFor="replaceFirst">First</Label>
          </div>
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
