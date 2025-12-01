import * as React from "react";
import {
  Plus,
  Minus,
  Regex,
  Asterisk,
} from "lucide-react";

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

import { type } from "@tauri-apps/plugin-os";

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-muted text-muted-foreground ml-1 inline-flex h-5 items-center rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
    {children}
  </span>
);

const KbdGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1">{children}</div>
);

export function ActionCommandMenu() {
  const [open, setOpen] = React.useState(false);
  const osType = type();

  React.useEffect(() => {
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
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
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
