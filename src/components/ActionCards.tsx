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
              {action.type === "add" && (
                <div>
                  <p>
                    <span className="text-muted-foreground">Prefix: </span>
                    {action.params.prefix}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Suffix: </span>
                    {action.params.suffix}
                  </p>
                </div>
              )}

              {action.type === "remove" && (
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Mode: </span>
                    {action.params.mode}
                  </p>

                  {action.params.mode === "custom_position" ? (
                    <p>
                      <span className="text-muted-foreground">Range: </span>
                      {action.params.start_pos} - {action.params.end_pos}
                    </p>
                  ) : (
                    <>
                      {action.params.mode === "custom_characters" && (
                        <p>
                          <span className="text-muted-foreground">Text:</span> "
                          {action.params.custom_char}"
                        </p>
                      )}

                      {!action.params.first_n && !action.params.last_n ? (
                        <p className="text-muted-foreground">
                          Removes all occurrences
                        </p>
                      ) : (
                        <div className="flex gap-3">
                          {!!action.params.first_n && (
                            <p>
                              <span className="text-muted-foreground">
                                First:{" "}
                              </span>
                              {action.params.first_n}
                            </p>
                          )}
                          {!!action.params.last_n && (
                            <p>
                              <span className="text-muted-foreground">
                                Last:{" "}
                              </span>
                              {action.params.last_n}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              
              {action.type === "regex" && (
                <div>
                  <p>Pattern: {action.params.pattern}</p>
                  {action.params.flags && <p>Flags: {action.params.flags}</p>}
                  <p>Replacement: {action.params.replacement}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
