import DiffVisualizer from "./components/DiffVisualizer";
import { ActionCommandMenu } from "./components/ActionCommandsMenu";
import ActionCards from "./components/ActionCards";
import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useRenameStore } from "./store/renameStore";
import Header from "./components/Header";

export default function App() {
  const folderPath = useRenameStore((s) => s.folderPath);
  useEffect(() => {
    getCurrentWindow().show();
  }, []);

  return (
    <div className="grid grid-cols-[minmax(280px,1fr)_4fr] grid-rows-[auto_1fr] h-screen w-screen">
      <Header />
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
