import { Change } from "@/types/change.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const typePatterns: Record<string, RegExp> = {
  digits: /[0-9]/,
  "a-z": /[a-z]/,
  "A-Z": /[A-Z]/,
  "a-Z": /[a-zA-Z]/,
  special: /[^a-zA-Z0-9]/,
};

export default function Remove({
  primaryChanges,
  setSecondaryChanges,
}: {
  primaryChanges: Array<Change>;
  setSecondaryChanges: React.Dispatch<React.SetStateAction<Change[]>>;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [type, setType] = useState("digits");
  const [customChars, setCustomChars] = useState("");
  const [firstN, setFirstN] = useState(1);
  const [lastN, setLastN] = useState(0);
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (!isEnabled) {
        setSecondaryChanges(primaryChanges);
        return;
      }

      const updatedChanges = primaryChanges.map((change) => {
        const original = change.new;
        let updated = original;

        if (type === "custom-pos") {
          const from = Math.max(0, Math.min(fromIndex-1, original.length));
          const to = Math.max(from, Math.min(toIndex, original.length));
          updated = original.slice(0, from) + original.slice(to);
        } else {
          const pattern =
            type === "custom-char"
              ? new RegExp(
                  `[${customChars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`,
                )
              : typePatterns[type];

          const chars = Array.from(original);

          let removed = 0;
          let i = 0;
          while (i < chars.length && removed < firstN) {
            if (pattern.test(chars[i])) {
              chars.splice(i, 1);
              removed++;
            } else {
              i++;
            }
          }

          removed = 0;
          let j = chars.length - 1;
          while (j >= 0 && removed < lastN) {
            if (pattern.test(chars[j])) {
              chars.splice(j, 1);
              removed++;
            }
            j--;
          }

          updated = chars.join("");
        }

        return {
          ...change,
          new: updated,
        };
      });

      setSecondaryChanges(updatedChanges);
    });
  }, [
    isEnabled,
    type,
    customChars,
    firstN,
    lastN,
    fromIndex,
    toIndex,
    primaryChanges,
  ]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between pb-2">
        <CardTitle className="text-lg">Remove</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label="Toggle remove"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(val) => setType(val)}>
            <SelectTrigger id="type" className="w-full" disabled={!isEnabled}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="digits">Digits (0-9)</SelectItem>
              <SelectItem value="a-z">Alphabets (a-z)</SelectItem>
              <SelectItem value="A-Z">Alphabets (A-Z)</SelectItem>
              <SelectItem value="a-Z">Alphabets (a-Z)</SelectItem>
              <SelectItem value="special">Special Characters</SelectItem>
              <SelectItem value="custom-char">Custom - Characters</SelectItem>
              <SelectItem value="custom-pos">Custom - Position</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {type === "custom-char" && (
          <div className="space-y-2">
            <Label htmlFor="customChars">Custom characters</Label>
            <Input
              id="customChars"
              placeholder="e.g. _-.[]"
              value={customChars}
              onChange={(e) => setCustomChars(e.target.value)}
              disabled={!isEnabled}
            />
          </div>
        )}

        {type === "custom-pos" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="from">From (start index)</Label>
              <Input
                id="from"
                type="number"
                min={1}
                value={fromIndex}
                onChange={(e) => setFromIndex(parseInt(e.target.value || ""))}
                disabled={!isEnabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To (exclusive end index)</Label>
              <Input
                id="to"
                type="number"
                min={1}
                value={toIndex}
                onChange={(e) => setToIndex(parseInt(e.target.value || ""))}
                disabled={!isEnabled}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="firstN">First n</Label>
              <Input
                id="firstN"
                type="number"
                min={1}
                value={firstN}
                onChange={(e) => setFirstN(parseInt(e.target.value || ""))}
                disabled={!isEnabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastN">Last n</Label>
              <Input
                id="lastN"
                type="number"
                min={0}
                value={lastN}
                onChange={(e) => setLastN(parseInt(e.target.value || ""))}
                disabled={!isEnabled}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
