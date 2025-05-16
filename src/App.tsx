import FolderInput from "./components/FolderInput";
import { ThemeToggle } from "./components/ui/ThemeToggle";

export default function App() {
  return <>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <FolderInput />
      <ThemeToggle />
    </div>
  </>
}