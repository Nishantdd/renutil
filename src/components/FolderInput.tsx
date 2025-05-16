import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";

export default function FolderInput() {
  const [folderPath, setFolderPath] = useState("");

  const handleOpenFolder = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true
      });
      setFolderPath(selectedPath || "");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Folder path"
        value={folderPath}
        readOnly
      />
      <Button type="button" onClick={handleOpenFolder}>
        Browse
      </Button>
    </div>
  );
}