import { useEffect } from "react";
import { Plus, Minus, Regex, Asterisk, Replace } from "lucide-react"; // Added ArrowLeft

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
import { useShallow } from "zustand/react/shallow";
import { useCommandStore } from "@/store/commandStore";
import AddMenu from "./menus/AddMenu";
import RemoveMenu from "./menus/RemoveMenu";
import ReplaceMenu from "./menus/ReplaceMenu";

export function ActionCommandMenu() {
  const { open, setOpen, page, setPage } = useCommandStore(
    useShallow((s) => ({
      open: s.open,
      setOpen: s.setOpen,
      page: s.page,
      setPage: s.setPage,
    })),
  );

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

  const handleOpenChange = (open: boolean = false) => {
    setOpen(open);
    if (!open) setTimeout(() => setPage("root"), 200);
  };

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

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        {page === "root" && (
          <>
            <CommandInput placeholder="Type an action or search..." />
            <CommandList>
              <CommandEmpty>No actions found.</CommandEmpty>
              <CommandGroup heading="Basic">
                <CommandItem
                  onSelect={() => {
                    setPage("add");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add prefix or suffix</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("remove");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("replace");
                  }}
                >
                  <Replace className="mr-2 h-4 w-4" />
                  <span>Replace</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Advanced">
                <CommandItem>
                  <Regex className="mr-2 h-4 w-4" />
                  <span>Regex</span>
                </CommandItem>
                <CommandItem>
                  <Asterisk className="mr-2 h-4 w-4" />
                  <span>Numbering</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </>
        )}

        {page === "add" && <AddMenu handleOpenChange={handleOpenChange} />}
        {page === "remove" && (
          <RemoveMenu handleOpenChange={handleOpenChange} />
        )}
        {page === "replace" && (
          <ReplaceMenu handleOpenChange={handleOpenChange} />
        )}
        {page === "regex" && <></>}
      </CommandDialog>
    </>
  );
}
