import Add from "./components/options/Add";
import { useRenameStore } from "./store/renameStore";
import { useShallow } from "zustand/react/shallow";
import {
  createAddAction,
  createRegexAction,
  createRemoveAction,
} from "./lib/factories";
import FolderInput from "./components/FolderInput";

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
      <div className="flex items-center justify-center">
        {/* <div>Diff view</div> */}
        <div
          style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}
        >
          <h1>Rename Pipeline — Demo</h1>

          <section style={{ marginBottom: 18 }}>
            <h2>Original files</h2>
            <ol>
              {originalFiles.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ol>
          </section>

          <section style={{ marginBottom: 18 }}>
            <h2>Actions</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button
                onClick={() => addAction(createAddAction("NEW_", "_v1"))}
                title="Add prefix NEW_ and suffix _v1"
              >
                Add prefix/suffix
              </button>

              <button
                onClick={() => addAction(createRemoveAction(" - ", "first"))}
                title='Remove first occurrence of " - "'
              >
                Remove first " - "
              </button>

              <button
                onClick={() =>
                  addAction(createRegexAction("^\\d+\\s*-\\s*", "", ""))
                }
                title="Remove leading numbers and dash like '01 - '"
              >
                Strip leading numbering (regex)
              </button>
            </div>

            <ul>
              {actions.map((a, idx) => (
                <li key={a.id} style={{ marginBottom: 6 }}>
                  <strong>{idx + 1}.</strong> {a.name ?? a.type}{" "}
                  <button
                    onClick={() => removeActionById(a.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Preview (result after applying actions)</h2>
            <ol>
              {results.map((r, i) => (
                <li key={r + "_" + i}>{r}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
