import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { open } from "@tauri-apps/plugin-dialog";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";

export default function MoveCopy({
  copyMovePath,
  copyMoveType,
  setCopyMovePath,
  setCopyMoveType,
}: {
  copyMovePath: string;
  copyMoveType: string;
  setCopyMovePath: React.Dispatch<React.SetStateAction<string>>;
  setCopyMoveType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  
  useEffect(() => {
    if(!isEnabled) {
      setCopyMovePath("");
      setCopyMoveType("");
    }
  }, [isEnabled])

  const handleOpenFolder = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
      });
      if (selectedPath) setCopyMovePath(selectedPath);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between pb-2">
        <CardTitle className="text-lg">Move / Copy</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          aria-label="Toggle remove"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex w-full items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  type="text"
                  placeholder="Folder path"
                  value={copyMovePath}
                  readOnly
                  className="w-full"
                />
              </TooltipTrigger>
              {copyMovePath && (
                <TooltipContent>
                  <p>{copyMovePath}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <Button type="button" size="icon" onClick={handleOpenFolder}>
            <FolderOpen />
          </Button>
        </div>

        <RadioGroup
          defaultValue={copyMoveType}
          onValueChange={setCopyMoveType}
          className="flex items-center gap-4"
          disabled={!copyMovePath}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="move" id="move" />
            <label htmlFor="move" className="text-sm">
              Move
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="copy" id="copy" />
            <label htmlFor="copy" className="text-sm">
              Copy
            </label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
