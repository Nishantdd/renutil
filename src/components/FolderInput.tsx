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
import { useEffect, useState } from "react";
import { useRenameStore } from "@/store/renameStore";
import { invoke } from "@tauri-apps/api/core";

export default function FolderInput() {
  const [loading, setLoading] = useState(false);
  const setOriginalFiles = useRenameStore((s) => s.setOriginalFiles);
  const folderPath = useRenameStore(s => s.folderPath);
  const setFolderPath = useRenameStore(s => s.setFolderPath);

  useEffect(() => {
    const down = async (e: KeyboardEvent) => {
      if (e.key === "o" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpenFolder();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
        variant="ghost"
        className="border-l"
        disabled={loading}
        onClick={handleOpenFolder}
      >
        <FolderOpen /> Open
      </Button>
    </div>
  );
}
