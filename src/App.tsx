import { useState } from "react";
import FolderInput from "./components/FolderInput";
import { ThemeToggle } from "./components/ui/ThemeToggle";

export default function App() {
  const [folderPath, setFolderPath] = useState("");
  
  return <>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <FolderInput folderPath={folderPath} setFolderPath={setFolderPath}/>
      <ThemeToggle />
    </div>
  </>
}