import { useOptionStore } from "@/store/optionStore";
import { Diff } from "lucide-react";
import { Toggle } from "../ui/toggle";

export function DiffToggle() {
  const showDiff = useOptionStore((s) => s.showDiff);
  const toggleShowDiff = useOptionStore((s) => s.toggleShowDiff);

  return (
    <Toggle
      className="border-l group"
      pressed={showDiff}
      onClick={toggleShowDiff}
      aria-label="Toggle diff"
    >
      <Diff className="group-active:scale-90" />
    </Toggle>
  );
}
