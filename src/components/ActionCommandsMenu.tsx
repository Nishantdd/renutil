import { useEffect, useState } from "react";
import { Plus, Minus, Regex, Asterisk } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

import { type } from "@tauri-apps/plugin-os";

export function ActionCommandMenu() {
  const [open, setOpen] = useState(false);
  const osType = type();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="border-b w-full flex flex-wrap justify-between h-10 px-0"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-center items-center gap-2 ml-2">
          <Plus className="h-4 w-4" />
          <span className="text-sm font-normal text-muted-foreground">
            Add rename actions
          </span>
        </div>
        {osType === "macos" && (
          <div className="flex mr-2">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        )}
        {(osType === "windows" || osType === "linux") && (
          <div className="flex mr-2">
            <KbdGroup>
              <Kbd className="font-mono">Ctrl</Kbd>
              <Kbd className="font-mono">K</Kbd>
            </KbdGroup>
          </div>
        )}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type an action or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Basic">
            <CommandItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add prefix or suffix</span>
            </CommandItem>
            <CommandItem>
              <Minus className="mr-2 h-4 w-4" />
              <span>Remove</span>
            </CommandItem>
            <CommandItem>
              <Regex className="mr-2 h-4 w-4" />
              <span>Regex</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Advanced">
            <CommandItem>
              <Asterisk className="mr-2 h-4 w-4" />
              <span>Numbering</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
