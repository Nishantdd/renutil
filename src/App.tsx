import Add from "./components/options/Add";
import FolderInput from "./components/FolderInput";
import DiffVisualizer from "./components/DiffVisualizer";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { Kbd, KbdGroup } from "./components/ui/kbd";
import { type } from "@tauri-apps/plugin-os";
import { ThemeToggle } from "./components/ui/ThemeToggle";

export default function App() {
  const osType = type();

  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-[1fr_3fr] sm:grid-rows-[auto_1fr] h-screen w-screen">
      <div className="bg-secondary border-b sm:border-r border-border">
        <FolderInput />
      </div>
      <div className="flex bg-secondary items-center justify-end border-b border-border">
        <ThemeToggle />
      </div>
      <div className="flex flex-col bg-card border-b sm:border-b-0 sm:border-r border-border">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="border-b w-full flex flex-wrap justify-between h-10"
        >
          <div className="flex justify-center items-center gap-2 ml-2">
            <Plus />
            Add rename actions
          </div>
          {osType === "macos" && (
            <div className="flex mr-2">
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          )}
          {(osType === "windows" || "linux") && (
            <div className="flex mr-2">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          )}
        </Button>
        <Add primaryChanges={[]} setSecondaryChanges={() => {}} />
        <Add primaryChanges={[]} setSecondaryChanges={() => {}} />
      </div>
      <DiffVisualizer />
    </div>
  );
}
