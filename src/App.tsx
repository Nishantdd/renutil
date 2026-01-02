import FolderInput from "./components/FolderInput";
import DiffVisualizer from "./components/DiffVisualizer";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { ActionCommandMenu } from "./components/ActionCommandsMenu";
import ActionCards from "./components/ActionCards";
import { DiffToggle } from "./components/options/DiffToggle";
import SaveButton from "./components/SaveButton";
import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useRenameStore } from "./store/renameStore";

export default function App() {
  const folderPath = useRenameStore((s) => s.folderPath);
  useEffect(() => {
    getCurrentWindow().show();
  }, []);

  return (
    <div className="grid grid-cols-[minmax(280px,1fr)_4fr] grid-rows-[auto_1fr] h-screen w-screen">
      <div className="bg-secondary border-b border-r border-border">
        <FolderInput />
      </div>
      <div className="flex bg-secondary items-center justify-end border-b border-border">
        <DiffToggle />
        <ThemeToggle />
        <SaveButton />
      </div>
      {folderPath && (
        <div className="flex flex-col bg-card border-b-0 border-r border-border">
          <ActionCommandMenu />
          <ActionCards />
        </div>
      )}
      <DiffVisualizer className={!folderPath ? "col-span-2" : ""} />
    </div>
  );
}
