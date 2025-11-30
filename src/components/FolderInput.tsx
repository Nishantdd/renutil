import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { useRenameStore } from "@/store/renameStore";
import { invoke } from "@tauri-apps/api/core";

export default function FolderInput() {
  const [folderPath, setFolderPath] = useState("");
  const [loading, setLoading] = useState(false);
  const setOriginalFiles = useRenameStore((s) => s.setOriginalFiles);

  const handleOpenFolder = async () => {
    setLoading(true);
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
      });

      if (selectedPath) {
        setFolderPath(selectedPath);
        const res: Array<string> = await invoke("get_directory_contents", {
          dirPath: selectedPath,
        });
        setOriginalFiles(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              type="text"
              placeholder="Folder path"
              className="border-none"
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
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={loading}
        onClick={handleOpenFolder}
      >
        <FolderOpen />
      </Button>
    </div>
  );
}
