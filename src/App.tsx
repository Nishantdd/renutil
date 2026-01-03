import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useRenameStore } from "./store/renameStore";
import Header from "./components/Header";
import DiffVisualizer from "./components/DiffVisualizer";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  const folderPath = useRenameStore((s) => s.folderPath);

  useEffect(() => {
    getCurrentWindow().show();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <Header />
      <Layout
        showSidebar={!!folderPath}
        sidebar={<Sidebar />}
        main={<DiffVisualizer />}
      />
    </div>
  );
}
