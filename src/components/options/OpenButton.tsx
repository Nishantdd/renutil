import { FolderOpen, Loader2 } from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect, useState } from "react";
import { useRenameStore } from "@/store/renameStore";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "../ui/button";

export default function OpenButton() {
  const [loading, setLoading] = useState(false);
  const setOriginalFiles = useRenameStore((s) => s.setOriginalFiles);
  const setFolderPath = useRenameStore((s) => s.setFolderPath);

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
    <Button
      type="button"
      variant="ghost"
      className="border-l"
      disabled={loading}
      onClick={handleOpenFolder}
    >
      {loading ? <Loader2 className="animate-spin" /> : <FolderOpen />} Open
    </Button>
  );
}
