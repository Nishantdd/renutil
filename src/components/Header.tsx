import { useRenameStore } from "@/store/renameStore";
import { DiffToggle } from "./options/DiffToggle";
import OpenButton from "./options/OpenButton";
import SaveButton from "./options/SaveButton";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function Header() {
  const folderPath = useRenameStore((s) => s.folderPath);
  return (
    <div className="flex col-span-2 bg-secondary items-center justify-between border-b border-border">
      <div>{folderPath}</div>
      <div className="flex">
        <DiffToggle />
        <ThemeToggle />
        <OpenButton />
        <SaveButton />
      </div>
    </div>
  );
}
