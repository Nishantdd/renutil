import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Loader, Save } from "lucide-react";
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
  handleSave,
  isLoading,
}: {
  folderPath: string;
  setFolderPath: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => Promise<void>;
  isLoading: Boolean;
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
      {folderPath ? (
        <div className="flex items-center">
          <Button
            type="button"
            size="icon"
            className="rounded-r-none border-r-0"
            onClick={handleOpenFolder}
          >
            <FolderOpen />
          </Button>
          <div className="w-px h-[0px] bg-border"></div>
          <Button
            type="button"
            size="icon"
            className="rounded-l-none border-l-0"
            onClick={handleSave}
          >
            {isLoading ? <Loader className="animate-spin" /> : <Save />}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={handleOpenFolder}
        >
          <FolderOpen />
        </Button>
      )}
    </div>
  );
}
