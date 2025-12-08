import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StringDiff } from 'react-string-diff';
import { useRenameStore } from "@/store/renameStore";
import { type } from "@tauri-apps/plugin-os";
import { Kbd, KbdGroup } from "./ui/kbd";

type DiffStyles = {
  added: React.CSSProperties;
  removed: React.CSSProperties;
  default: React.CSSProperties;
};

const diffStyle: DiffStyles = {
  added: {
    backgroundColor: 'var(--color-diff-add)'
  },
  removed: {
    backgroundColor: 'var(--color-diff-remove)'
  },
  default: {}
};

export default function DiffVisualizer() {
  const osType = type();
  const oldFilenames = useRenameStore((s) => s.originalFiles);
  const newFilenames = useRenameStore((s) => {
    const lastIndex = s.actions.length - 1;
    if (lastIndex < 0) return s.cache.get(-1) ?? s.originalFiles;
    return s.cache.get(lastIndex) ?? s.originalFiles;
  });

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
    <div className="border-b rounded-lg relative overflow-auto">
      <Table>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="z-10 border-r">
              Sno
            </TableHead>
            <TableHead className="z-10 min-w-[200px] border-r">
              Old name
            </TableHead>
            <TableHead className="min-w-[200px]">New name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {oldFilenames.map((filename, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium border-r">
                {index + 1}
              </TableCell>
              <TableCell className="border-r select-text">
                {filename}
              </TableCell>
              <TableCell>
                <StringDiff styles={diffStyle} oldValue={filename} newValue={newFilenames[index]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
