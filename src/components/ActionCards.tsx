import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRenameStore } from "@/store/renameStore";

export default function ActionCards() {
  const actions = useRenameStore((s) => s.actions);
  const removeActionById = useRenameStore((s) => s.removeActionById);

  return (
    <div className="w-full flex flex-col h-0 grow overflow-auto">
      {actions
        .slice()
        .reverse()
        .map((action, index) => (
          <Card key={action.id} className="border-0 border-b shadow-none p-4">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle className="text-base font-medium flex gap-2">
                <span>{actions.length - index}.</span>
                <span className="capitalize">{action.type}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeActionById(action.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-0 text-sm space-y-1">
              {action.type === "addPrefix" && (
                <div>
                  <p>
                    <span className="text-muted-foreground">Prefix: </span>
                    {action.params.prefix}
                  </p>
                </div>
              )}

              {action.type === "addSuffix" && (
                <div>
                  <p>
                    <span className="text-muted-foreground">Suffix: </span>
                    {action.params.suffix}
                  </p>
                </div>
              )}

              {action.type === "addAtPosition" && (
                <div>
                  <p>
                    <span className="text-muted-foreground">Position: </span>
                    {action.params.position}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Text: </span>
                    {action.params.text}
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
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Text: </span>"
                    {action.params.customChar}"
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
                <div>
                  <p>
                    <span className="text-muted-foreground">To replace: </span>
                    {action.params.toReplace}
                  </p>
                  <p>
                    <span className="text-muted-foreground">
                      Replace with:{" "}
                    </span>
                    {action.params.replaceWith}
                  </p>
                </div>
              )}

              {action.type === "regex" && (
                <div>
                  <p>Pattern: {action.params.pattern}</p>
                  {action.params.flags && <p>Flags: {action.params.flags}</p>}
                  <p>Replacement: {action.params.replacement}</p>
                </div>
              )}

              {action.type === "numbering" && (
                <div>
                  <p>Mode: {action.params.mode}</p>
                  <p>Position: {action.params.position}</p>
                  {action.params.incremental && <p>Incremental: {action.params.incremental}</p>}
                  {action.params.startsFrom && <p>Starting Point: {action.params.startsFrom}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
