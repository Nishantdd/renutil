import { Loader2, Save } from "lucide-react";
import { Button } from "./ui/button";
import { useRenameStore } from "@/store/renameStore";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function SaveButton() {
  const [loading, setLoading] = useState(false);
  const folderPath = useRenameStore(s => s.folderPath);
  const setOriginalFiles = useRenameStore(s => s.setOriginalFiles);
  const oldFilenames = useRenameStore((s) => s.originalFiles);
  const newFilenames = useRenameStore((s) => {
    const lastIndex = s.actions.length - 1;
    if (lastIndex < 0) return s.cache.get(-1) ?? s.originalFiles;
    return s.cache.get(lastIndex) ?? s.originalFiles;
  });

  const handleSave = async () => {

    try {
      setLoading(true);

      if (oldFilenames.length !== newFilenames.length) return;
      const changes = oldFilenames.map((old, index) => ({ old: old, new: newFilenames[index] }));

      const arraysEqual = oldFilenames.every((v, i) => v === newFilenames[i]);
      if (arraysEqual) return;

      const res: Array<string> = await invoke("save_directory_contents", {
        dirPath: folderPath,
        changes: changes
      });
      setOriginalFiles(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return <Button
    variant="ghost"
    onClick={handleSave}
    disabled={loading || !folderPath}
    className="border-l group"
  >
    <span className="inline-flex items-center gap-2 transition-transform duration-100 ease-in-out group-active:scale-95">
      {loading ? <Loader2 className="animate-spin" /> : <Save />}
      Save
    </span>
  </Button>
}