import Add from "./components/options/Add";
import { useRenameStore } from "./store/renameStore";
import { useShallow } from "zustand/react/shallow";
import {
  createAddAction,
  createRegexAction,
  createRemoveAction,
} from "./lib/factories";
import FolderInput from "./components/FolderInput";
import DiffVisualizer from "./components/DiffVisualizer";

export default function App() {
  const { originalFiles, actions, addAction, removeActionById, getResults } =
    useRenameStore(
      useShallow((s) => ({
        originalFiles: s.originalFiles,
        actions: s.actions,
        addAction: s.addAction,
        removeActionById: s.removeActionById,
        getResults: s.getResults,
      })),
    );

  const results = getResults();

  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-[1fr_3fr] sm:grid-rows-[auto_1fr] h-screen w-screen">
      <div className="flex bg-secondary items-center justify-center border-b sm:border-r border-border">
        <FolderInput />
      </div>
      <div className="flex bg-secondary items-center justify-center border-b border-border">
        <div>Action buttons</div>
      </div>
      <div className="flex flex-wrap bg-card items-start justify-center border-b sm:border-b-0 sm:border-r border-border">
        <Add primaryChanges={[]} setSecondaryChanges={() => {}} />
        <Add primaryChanges={[]} setSecondaryChanges={() => {}} />
      </div>
      <DiffVisualizer />
    </div>
  );
}
