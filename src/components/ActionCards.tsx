import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { useRenameStore } from "@/store/renameStore";

export default function ActionCards() {
  const actions = useRenameStore((s) => s.actions);

  return (
    <div className="w-full">
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
                onClick={() => console.log("action removed", action.id)}
                className="h-6 w-6 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-0 text-sm space-y-1">
              {action.type === "add" && (
                <div>
                  <p>Prefix: {action.params.prefix}</p>
                  <p>Suffix: {action.params.suffix}</p>
                </div>
              )}

              {action.type === "remove" && (
                <div>
                  <p>Text: {action.params.text}</p>
                  <p>Mode: {action.params.mode}</p>
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
