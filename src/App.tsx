import FolderInput from "./components/FolderInput";
import DiffVisualizer from "./components/DiffVisualizer";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { ActionCommandMenu } from "./components/ActionCommandsMenu";
import ActionCards from "./components/ActionCards";
import { DiffToggle } from "./components/options/DiffToggle";

export default function App() {
  return (
    <div className="grid grid-cols-[minmax(240px,1fr)_4fr] grid-rows-[auto_1fr] h-screen w-screen">
      <div className="bg-secondary border-b border-r border-border">
        <FolderInput />
      </div>
      <div className="flex bg-secondary items-center justify-between border-b border-border">
        <div>
          <DiffToggle />
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-col bg-card border-b-0 border-r border-border">
        <ActionCommandMenu />
        <ActionCards />
      </div>
      <DiffVisualizer />
    </div>
  );
}
