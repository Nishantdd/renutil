import { useState, useEffect } from "react";
import FolderInput from "./components/FolderInput";
import { Change } from "./types/change.types";
import DiffVisualizer from "./components/DiffVisualizer";
import Regex from "./components/options/Regex";
import Replace from "./components/options/Replace";
import { invoke } from "@tauri-apps/api/core";
import CollapsibleMenu from "./components/ui/collapsible-content";
import Add from "./components/options/Add";

export default function App() {
  const [folderPath, setFolderPath] = useState("");
  const [primaryChanges, setPrimaryChanges] = useState<Array<Change>>([]);
  const [secondaryChanges, setSecondaryChanges] = useState<Array<Change>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateDirectory = async () => {
      const res: Array<Change> = await invoke("get_directory_contents", {
        dirPath: folderPath,
      });
      setPrimaryChanges(res);
    };
    updateDirectory();
  }, [folderPath]);
  
  useEffect(() => setSecondaryChanges(primaryChanges), [primaryChanges])
  
  const handleSave = async () => {
    setIsLoading(true);
    const res: Array<Change> = await invoke("save_directory_contents", {
      dirPath: folderPath,
      changes: secondaryChanges
    });
    setPrimaryChanges(res);
    setIsLoading(false);
  }

  return (
    <div className={`h-screen w-screen overflow-x-hidden`}>
      <div
        className="grid gap-4 p-8"
        style={{
          gridTemplateColumns: "20% 1fr",
          gridTemplateRows: "auto auto auto auto",
        }}
      >
        <div>
          <FolderInput folderPath={folderPath} setFolderPath={setFolderPath} handleSave={handleSave} isLoading={isLoading}/>
        </div>

        <div className="row-span-3">
          <DiffVisualizer changes={secondaryChanges} setChanges={setSecondaryChanges} />
        </div>

        <div>
          <Regex changes={primaryChanges} setChanges={setPrimaryChanges} />
        </div>

        <div className="row-start-3">
          <Replace changes={primaryChanges} setChanges={setPrimaryChanges} />
        </div>

        <div className="col-span-2 row-start-4">
          <CollapsibleMenu title="Advanced Settings" className="mt-2">
            <div className="mt-4 p-4 border rounded-lg">
              <Add primaryChanges={primaryChanges} setSecondaryChanges={setSecondaryChanges} />
            </div>
          </CollapsibleMenu>
        </div>
      </div>
    </div>
  );
}
