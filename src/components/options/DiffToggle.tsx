import { useOptionStore } from "@/store/optionStore";
import { Toggle } from "../ui/toggle";
import { Diff } from "lucide-react";

export function DiffToggle() {
  const showDiff = useOptionStore((s) => s.showDiff);
  const toggleShowDiff = useOptionStore((s) => s.toggleShowDiff);
  return (
    <Toggle
      pressed={showDiff}
      onPressedChange={toggleShowDiff}
      className="border-r"
      variant="default"
      aria-label="Toggle italic"
    >
      <Diff />
      Show Diff
    </Toggle>
  );
}
