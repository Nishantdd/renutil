import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useRenameStore } from "@/store/renameStore";

export default function ActionCards() {
  const actions = useRenameStore((s) => s.actions);
  const removeActionById = useRenameStore((s) => s.removeActionById);
  const reorderActions = useRenameStore((s) => s.reorderActions);

  const moveUp = (index: number) => {
    if (index > 0) {
      reorderActions(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < actions.length - 1) {
      reorderActions(index, index + 1);
    }
  };

  return (
    <div className="w-full flex flex-col h-0 grow overflow-y-auto overflow-x-hidden">
      {actions.map((_, index) => {
        const reverseIndex = actions.length - 1 - index;
        const action = actions[reverseIndex];
        return (
          <Card key={action.id} className="border-0 border-b shadow-none p-4">
            <CardHeader className="flex flex-row items-center justify-between p-0 gap-2 min-w-0">
              <CardTitle className="text-base font-medium flex gap-2 flex-1 min-w-0">
                <span className="flex-shrink-0">{reverseIndex + 1}.</span>
                <span className="capitalize truncate">{action.type}</span>
              </CardTitle>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="h-6 w-6 p-0"
                  title="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveDown(index)}
                  disabled={index === actions.length - 1}
                  className="h-6 w-6 p-0"
                  title="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeActionById(action.id)}
                  className="h-6 w-6 p-0"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 text-sm space-y-1 mt-2 min-w-0">
              {action.type === "addPrefix" && (
                <div className="min-w-0">
                  <p className="truncate">
                    <span className="text-muted-foreground">Prefix: </span>
                    <span className="break-all">{action.params.prefix}</span>
                  </p>
                </div>
              )}

              {action.type === "addSuffix" && (
                <div className="min-w-0">
                  <p className="truncate">
                    <span className="text-muted-foreground">Suffix: </span>
                    <span className="break-all">{action.params.suffix}</span>
                  </p>
                </div>
              )}

              {action.type === "addAtPosition" && (
                <div className="min-w-0">
                  <p className="truncate">
                    <span className="text-muted-foreground">Position: </span>
                    {action.params.position}
                  </p>
                  <p className="truncate">
                    <span className="text-muted-foreground">Text: </span>
                    <span className="break-all">{action.params.text}</span>
                  </p>
                </div>
              )}

              {(action.type === "removeDigits" ||
                action.type === "removeLowercase" ||
                action.type === "removeUppercase" ||
                action.type === "removeLetters" ||
                action.type === "removeSymbols") && (
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Target: </span>
                    {action.displayName.replace("Remove ", "")}
                  </p>
                  {!action.params.firstN && !action.params.lastN ? (
                    <p className="text-muted-foreground">
                      Removes all occurrences
                    </p>
                  ) : (
                    <div className="flex gap-3">
                      {!!action.params.firstN && (
                        <p>
                          <span className="text-muted-foreground">First: </span>
                          {action.params.firstN}
                        </p>
                      )}
                      {!!action.params.lastN && (
                        <p>
                          <span className="text-muted-foreground">Last: </span>
                          {action.params.lastN}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {action.type === "removeCustomCharacters" && (
                <div className="text-sm space-y-1 min-w-0">
                  <p className="truncate">
                    <span className="text-muted-foreground">Text: </span>"
                    <span className="break-all">
                      {action.params.customChar}
                    </span>
                    "
                  </p>
                  {!action.params.firstN && !action.params.lastN ? (
                    <p className="text-muted-foreground">
                      Removes all occurrences
                    </p>
                  ) : (
                    <div className="flex gap-3">
                      {!!action.params.firstN && (
                        <p>
                          <span className="text-muted-foreground">First: </span>
                          {action.params.firstN}
                        </p>
                      )}
                      {!!action.params.lastN && (
                        <p>
                          <span className="text-muted-foreground">Last: </span>
                          {action.params.lastN}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {action.type === "removeAtPosition" && (
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Range: </span>
                    {action.params.startPos} - {action.params.endPos}
                  </p>
                </div>
              )}

              {action.type === "replace" && (
                <div className="min-w-0">
                  <p className="truncate">
                    <span className="text-muted-foreground">To replace: </span>
                    <span className="break-all">{action.params.toReplace}</span>
                  </p>
                  <p className="truncate">
                    <span className="text-muted-foreground">
                      Replace with:{" "}
                    </span>
                    <span className="break-all">
                      {action.params.replaceWith}
                    </span>
                  </p>
                </div>
              )}

              {action.type === "regex" && (
                <div className="min-w-0">
                  <p className="truncate">
                    <span className="text-muted-foreground">Pattern: </span>
                    <span className="break-all">{action.params.pattern}</span>
                  </p>
                  {action.params.flags && (
                    <p className="truncate">
                      <span className="text-muted-foreground">Flags: </span>
                      {action.params.flags}
                    </p>
                  )}
                  <p className="truncate">
                    <span className="text-muted-foreground">Replacement: </span>
                    <span className="break-all">
                      {action.params.replacement}
                    </span>
                  </p>
                </div>
              )}

              {action.type === "numbering" && (
                <div>
                  <p>Mode: {action.params.mode}</p>
                  <p>Position: {action.params.position}</p>
                  {action.params.incremental && (
                    <p>Incremental: {action.params.incremental}</p>
                  )}
                  {action.params.startsFrom && (
                    <p>Starting Point: {action.params.startsFrom}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
