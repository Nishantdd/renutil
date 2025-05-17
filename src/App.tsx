import { useState, useEffect } from "react";
import FolderInput from "./components/FolderInput";
import { Change } from "./types/change.types";
import DiffVisualizer from "./components/DiffVisualizer";
import Regex from "./components/options/Regex";
import Replace from "./components/options/Replace";

export default function App() {
  const [folderPath, setFolderPath] = useState("");
  const [changes, setChanges] = useState<Array<Change>>([
    { old: "old.jpeg", new: "new.jpeg" },
  ]);

  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setAdvancedOpen(true);
      } else {
        setAdvancedOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <div
      className={`h-screen w-screen overflow-x-hidden ${
        advancedOpen ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
      <div className="p-8">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "20% 1fr",
            gridTemplateRows: "auto auto auto auto",
          }}
        >
          <div>
            <FolderInput
              folderPath={folderPath}
              setFolderPath={setFolderPath}
            />
          </div>

          <div className="row-span-3">
            <DiffVisualizer changes={changes} setChanges={setChanges} />
          </div>

          <div>
            <Regex changes={changes} setChanges={setChanges} />
          </div>

          <div className="row-start-3">
            <Replace changes={changes} setChanges={setChanges} />
          </div>

          <div className="col-span-2 row-start-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setAdvancedOpen((open) => !open)}
            >
              Advanced Options &gt;
            </button>
            {advancedOpen && (
              <div className="mt-4 p-4 border rounded-lg">
                <p>Advanced settings go here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
