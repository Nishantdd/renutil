import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StringDiff } from "react-string-diff";
import { useRenameStore } from "@/store/renameStore";
import { type } from "@tauri-apps/plugin-os";
import { Kbd, KbdGroup } from "./ui/kbd";
import { useOptionStore } from "@/store/optionStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DiffStyles = {
  added: React.CSSProperties;
  removed: React.CSSProperties;
  default: React.CSSProperties;
};

const diffStyle: DiffStyles = {
  added: {
    backgroundColor: "var(--color-diff-add)",
  },
  removed: {
    backgroundColor: "var(--color-diff-remove)",
  },
  default: {},
};

export default function DiffVisualizer() {
  const osType = type();
  const showDiff = useOptionStore((s) => s.showDiff);
  const oldFilenames = useRenameStore((s) => s.originalFiles);
  const newFilenames = useRenameStore((s) => {
    const lastIndex = s.actions.length - 1;
    if (lastIndex < 0) return s.cache.get(-1) ?? s.originalFiles;
    return s.cache.get(lastIndex) ?? s.originalFiles;
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const totalItems = oldFilenames.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const currentOldFiles = oldFilenames.slice(startIndex, endIndex);

  if (!oldFilenames.length) {
    return (
      <div className="min-h-[100%] min-w-[100%] rounded-lg flex flex-col gap-2 items-center justify-center">
        Please select a directory
        {osType === "macos" && (
          <div className="flex">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>O</Kbd>
            </KbdGroup>
          </div>
        )}
        {(osType === "windows" || osType === "linux") && (
          <div className="flex">
            <KbdGroup>
              <Kbd className="font-mono">Ctrl</Kbd>
              <Kbd className="font-mono">O</Kbd>
            </KbdGroup>
          </div>
        )}
      </div>
    );
  }

  if (oldFilenames.length !== newFilenames.length) {
    return (
      <div className="min-h-[100%] min-w-[100%] rounded-lg flex items-center justify-center">
        Something went wrong performing actions, please try again...
      </div>
    );
  }

  return (
    <div className="h-full relative flex flex-col rounded-lg overflow-hidden">
      <div className="flex-1 overflow-auto w-full">
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead className="z-10 border-r">Sno</TableHead>
              <TableHead className="z-10 min-w-[200px] border-r">
                Old name
              </TableHead>
              <TableHead className="min-w-[200px]">New name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {currentOldFiles.map((filename, i) => {
              const globalIndex = startIndex + i;
              return (
                <TableRow key={globalIndex}>
                  <TableCell className="font-medium border-r">
                    {globalIndex + 1}
                  </TableCell>
                  <TableCell className="border-r select-text">
                    {filename}
                  </TableCell>
                  <TableCell>
                    {showDiff ? (
                      <StringDiff
                        styles={diffStyle}
                        oldValue={filename}
                        newValue={newFilenames[globalIndex]}
                      />
                    ) : (
                      newFilenames[globalIndex]
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {oldFilenames.length && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-4 rounded-md border p-2 bg-card">
            <Select
              value={pageSize.toString()}
              onValueChange={(val) => {
                setPageSize(Number(val));
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-[1px] h-4 bg-border" />
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                Page {page} of {totalPages}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft size={4} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight size={4} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
