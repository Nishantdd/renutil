import { useState } from "react";
import FolderInput from "./components/FolderInput";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { Change } from "./types/change.types";
import DiffVisualizer from "./components/DiffVisualizer";

export default function App() {
  const [folderPath, setFolderPath] = useState("");
  const [changes, setChanges] = useState<Array<Change>>([{old: "old_one", new: "new_one"}]);
  
  return <>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <FolderInput folderPath={folderPath} setFolderPath={setFolderPath}/>
      <DiffVisualizer changes={changes} setChanges={setChanges}/>
      <ThemeToggle />
    </div>
  </>
}