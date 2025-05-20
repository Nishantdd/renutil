import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { open } from "@tauri-apps/plugin-dialog";

export default function FolderInput({
  folderPath,
  setFolderPath,
}: {
  folderPath: string;
  setFolderPath: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleOpenFolder = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
      });
      if (selectedPath) setFolderPath(selectedPath);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              type="text"
              placeholder="Folder path"
              value={folderPath}
              readOnly
            />
          </TooltipTrigger>
          {folderPath && (
            <TooltipContent>
              <p>{folderPath}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <Button type="button" onClick={handleOpenFolder}>
        Browse
      </Button>
    </div>
  );
}
