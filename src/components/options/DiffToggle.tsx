import { useOptionStore } from "@/store/optionStore";
import { Diff } from "lucide-react";
import { Button } from "../ui/button";

export function DiffToggle() {
  const toggleShowDiff = useOptionStore((s) => s.toggleShowDiff);
  return (
    <Button
      variant="link"
      size="icon"
      className="active:scale-90"
      onClick={toggleShowDiff}
      aria-label="Toggle diff"
    >
      <Diff />
    </Button>
  );
}
