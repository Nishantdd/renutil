import { useOptionStore } from "@/store/optionStore";
import { Diff } from "lucide-react";
import { Button } from "../ui/button";

export function DiffToggle() {
  const toggleShowDiff = useOptionStore((s) => s.toggleShowDiff);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="border-l group"
      onClick={toggleShowDiff}
      aria-label="Toggle diff"
    >
      <Diff className="group-active:scale-90" />
    </Button>
  );
}
