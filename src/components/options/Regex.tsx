import { Change } from "@/types/change.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function Regex({
  changes,
  setChanges,
}: {
  changes: Array<Change>;
  setChanges: React.Dispatch<React.SetStateAction<Change[]>>;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [matchPattern, setMatchPattern] = useState("");
  const [replacePattern, setReplacePattern] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEnabled || !matchPattern || !replacePattern) return;

    try {
      new RegExp(matchPattern);
      setError("");

      const updatedChanges = changes.map((change) => {
        try {
          const newValue = change.old.replace(
            new RegExp(matchPattern, "g"),
            replacePattern,
          );
          return { ...change, new: newValue };
        } catch {
          return change;
        }
      });

      setChanges(updatedChanges);
    } catch (err) {
      setError("Not a valid regular expression");
    }
  }, [isEnabled, matchPattern, replacePattern]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between pb-2">
        <CardTitle className="text-lg">Regex</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label="Toggle regex"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="match">Match</Label>
          <Input
            id="match"
            placeholder="Enter regex pattern"
            value={matchPattern}
            onChange={(e) => setMatchPattern(e.target.value)}
            disabled={!isEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="replace">Replace</Label>
          <Input
            id="replace"
            placeholder="Enter replacement text"
            value={replacePattern}
            onChange={(e) => setReplacePattern(e.target.value)}
            disabled={!isEnabled}
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
