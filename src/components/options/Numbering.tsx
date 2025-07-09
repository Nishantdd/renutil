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
import { useState, useEffect } from "react";

function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [1000, "m"],
    [900, "cm"],
    [500, "d"],
    [400, "cd"],
    [100, "c"],
    [90, "xc"],
    [50, "l"],
    [40, "xl"],
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ];
  let result = "";
  for (const [value, numeral] of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

function toAlphabet(n: number): string {
  let str = "";
  while (n >= 0) {
    str = String.fromCharCode((n % 26) + 97) + str;
    n = Math.floor(n / 26) - 1;
  }
  return str;
}

export default function Numbering({
  primaryChanges,
  setSecondaryChanges,
}: {
  primaryChanges: Array<Change>;
  setSecondaryChanges: React.Dispatch<React.SetStateAction<Change[]>>;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [mode, setMode] = useState("numeric");
  const [position, setPosition] = useState(0);
  const [start, setStart] = useState(1);
  const [incr, setIncr] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (!isEnabled) {
        setSecondaryChanges(primaryChanges);
        return;
      }

      const updatedChanges = primaryChanges.map((change, index) => {
        const value = start + index * incr;

        let insertValue = "";
        switch (mode) {
          case "numeric":
            insertValue = value.toString();
            break;
          case "roman":
            insertValue = toRoman(value);
            break;
          case "alphabet":
            insertValue = toAlphabet(value - 1);
            break;
        }

        const pos = Math.min(Math.max(0, position), change.new.length);
        const newName =
          change.new.slice(0, pos) + insertValue + change.new.slice(pos);

        return {
          ...change,
          new: newName,
        };
      });

      setSecondaryChanges(updatedChanges);
    });
  }, [isEnabled, mode, position, start, incr, primaryChanges]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between pb-2">
        <CardTitle className="text-lg">Number</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label="Toggle number insert"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row gap-4 mb-8">
          <div className="flex-1 space-y-2">
            <Label htmlFor="mode">Mode</Label>
            <Select value={mode} onValueChange={(val) => setMode(val)}>
              <SelectTrigger id="mode" disabled={!isEnabled}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="numeric">Numeric (1, 2, 3...)</SelectItem>
                <SelectItem value="roman">Roman (i, ii, iii...)</SelectItem>
                <SelectItem value="alphabet">
                  Alphabet (a, b, ..., aa...)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="position">at (position)</Label>
            <Input
              id="position"
              type="number"
              value={position}
              onChange={(e) => setPosition(parseInt(e.target.value || "0"))}
              disabled={!isEnabled}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="start">Start</Label>
            <Input
              id="start"
              type="number"
              value={start}
              onChange={(e) => setStart(parseInt(e.target.value || "1"))}
              disabled={!isEnabled}
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="incr">Incr</Label>
            <Input
              id="incr"
              type="number"
              value={incr}
              onChange={(e) => setIncr(parseInt(e.target.value || "1"))}
              disabled={!isEnabled}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
