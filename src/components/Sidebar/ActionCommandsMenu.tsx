import { useEffect } from "react";
import { Plus, Minus, Regex, Asterisk, Replace } from "lucide-react";

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
import AddPrefixMenu from "../menus/AddPrefixMenu";
import ReplaceMenu from "../menus/ReplaceMenu";
import AddSuffixMenu from "../menus/AddSuffixMenu";
import AddAtPositionMenu from "../menus/AddAtPositionMenu";
import CountableRemoveMenu from "../menus/CountableRemoveMenu";
import RemoveAtPositionMenu from "../menus/RemoveAtPositionMenu";
import RemoveCustomCharactersMenu from "../menus/RemoveCustomCharacterMenu";
import RegexMenu from "../menus/RegexMenu";
import NumberingMenu from "../menus/NumberingMenu";

export function ActionCommandMenu() {
  const osType = type();
  const { open, setOpen, page, setPage } = useCommandStore(
    useShallow((s) => ({
      open: s.open,
      setOpen: s.setOpen,
      page: s.page,
      setPage: s.setPage,
    })),
  );

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

  const onEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && page !== "root") {
      e.stopPropagation();
      e.preventDefault();
      setPage("root");
    }
  };

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="border-b w-full flex justify-between h-10 px-0"
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

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        onEscapeKeyDown={onEscapeKeyDown}
      >
        {page === "root" && (
          <>
            <CommandInput autoFocus placeholder="Type an action or search..." />
            <CommandList>
              <CommandEmpty>No actions found.</CommandEmpty>
              <CommandGroup heading="Basic">
                <CommandItem
                  onSelect={() => {
                    setPage("addPrefix");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add prefix</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("addSuffix");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add suffix</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("addAtPosition");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add at position</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeDigits");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove digits</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeLowercase");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove lowercase</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeUppercase");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove uppercase</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeLetters");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove letters</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeSymbols");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove symbols</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeAtPosition");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove at position</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("removeCustomCharacters");
                  }}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  <span>Remove custom characters</span>
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
                <CommandItem
                  onSelect={() => {
                    setPage("regex");
                  }}
                >
                  <Regex className="mr-2 h-4 w-4" />
                  <span>Regex</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    setPage("numbering");
                  }}
                >
                  <Asterisk className="mr-2 h-4 w-4" />
                  <span>Numbering</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </>
        )}

        {page === "addPrefix" && (
          <AddPrefixMenu handleOpenChange={handleOpenChange} />
        )}
        {page === "addSuffix" && (
          <AddSuffixMenu handleOpenChange={handleOpenChange} />
        )}
        {page === "addAtPosition" && (
          <AddAtPositionMenu handleOpenChange={handleOpenChange} />
        )}

        {page === "removeAtPosition" && (
          <RemoveAtPositionMenu handleOpenChange={handleOpenChange} />
        )}
        {page === "removeCustomCharacters" && (
          <RemoveCustomCharactersMenu handleOpenChange={handleOpenChange} />
        )}
        {page === "removeDigits" && (
          <CountableRemoveMenu
            actionType="removeDigits"
            handleOpenChange={handleOpenChange}
          />
        )}
        {page === "removeLowercase" && (
          <CountableRemoveMenu
            actionType="removeLowercase"
            handleOpenChange={handleOpenChange}
          />
        )}
        {page === "removeUppercase" && (
          <CountableRemoveMenu
            actionType="removeUppercase"
            handleOpenChange={handleOpenChange}
          />
        )}
        {page === "removeLetters" && (
          <CountableRemoveMenu
            actionType="removeLetters"
            handleOpenChange={handleOpenChange}
          />
        )}
        {page === "removeSymbols" && (
          <CountableRemoveMenu
            actionType="removeSymbols"
            handleOpenChange={handleOpenChange}
          />
        )}

        {page === "replace" && (
          <ReplaceMenu handleOpenChange={handleOpenChange} />
        )}

        {page === "regex" && <RegexMenu handleOpenChange={handleOpenChange} />}

        {page === "numbering" && (
          <NumberingMenu handleOpenChange={handleOpenChange} />
        )}
      </CommandDialog>
    </>
  );
}
