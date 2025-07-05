import { Change } from "@/types/change.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export default function Add({
  primaryChanges,
  setSecondaryChanges,
}: {
  primaryChanges: Array<Change>;
  setSecondaryChanges: React.Dispatch<React.SetStateAction<Change[]>>;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [prefixText, setPrefixText] = useState("");
  const [suffixText, setSuffixText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (!prefixText && !suffixText) return;
  
      if (!isEnabled) {
        setSecondaryChanges(primaryChanges);
        return;
      }
  
      const updatedChanges = primaryChanges.map((change) => ({
        ...change,
        new: `${prefixText}${change.new}${suffixText}`,
      }));
  
      setSecondaryChanges(updatedChanges);
    })
  }, [isEnabled, prefixText, suffixText, primaryChanges]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between pb-2">
        <CardTitle className="text-lg">Add</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label="Toggle add"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prefix">Prefix</Label>
          <Input
            id="prefix"
            placeholder="Text to add before name"
            value={prefixText}
            onChange={(e) => setPrefixText(e.target.value)}
            disabled={!isEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="suffix">Suffix</Label>
          <Input
            id="suffix"
            placeholder="Text to add after name"
            value={suffixText}
            onChange={(e) => setSuffixText(e.target.value)}
            disabled={!isEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
