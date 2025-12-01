import Add from "./components/options/Add";
import FolderInput from "./components/FolderInput";
import DiffVisualizer from "./components/DiffVisualizer";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { ActionCommandMenu } from "./components/ActionCommandsMenu";

export default function App() {
  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-[1fr_3fr] sm:grid-rows-[auto_1fr] h-screen w-screen">
      <div className="bg-secondary border-b sm:border-r border-border">
        <FolderInput />
      </div>
      <div className="flex bg-secondary items-center justify-end border-b border-border">
        <ThemeToggle />
      </div>
      <div className="flex flex-col bg-card border-b sm:border-b-0 sm:border-r border-border">
        <ActionCommandMenu />
        <Add primaryChanges={[]} setSecondaryChanges={() => {}} />
        <Add primaryChanges={[]} setSecondaryChanges={() => {}} />
      </div>
      <DiffVisualizer />
    </div>
  );
}
