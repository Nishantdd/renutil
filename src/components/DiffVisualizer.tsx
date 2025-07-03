import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Change } from "@/types/change.types";

export default function DiffVisualizer({
  changes,
  setChanges,
}: {
  changes: Array<Change>;
  setChanges: React.Dispatch<React.SetStateAction<Change[]>>;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewClick = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const handleNewBlur = (index: number) => {
    if (editValue !== changes[index].new) {
      const updatedChanges = [...changes];
      updatedChanges[index] = {
        ...updatedChanges[index],
        new: editValue,
      };
      setChanges(updatedChanges);
    }
    setEditingIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      handleNewBlur(index);
    } else if (e.key === "Escape") {
      setEditingIndex(null);
    }
  };

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  if (!changes.length) {
    return (
      <div className="min-h-[100%] min-w-[100%] rounded-lg flex items-center justify-center">
        Please select a directory...
      </div>
    );
  }

  return (
    <div className="border rounded-lg relative overflow-auto h-[70vh]">
      <Table>
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="sticky left-0 z-10 w-[80px] border-r">
              Sno
            </TableHead>
            <TableHead className="sticky left-[80px] z-10 min-w-[200px] border-r">
              Old name
            </TableHead>
            <TableHead className="min-w-[200px]">New name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {changes.map((change, index) => (
            <TableRow key={index}>
              <TableCell className="sticky left-0 font-medium border-r">
                {index + 1}
              </TableCell>
              <TableCell className="sticky left-[80px] border-r">
                {change.old}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    ref={inputRef}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleNewBlur(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-8"
                  />
                ) : (
                  <div
                    onClick={() => handleNewClick(index, change.new)}
                    className="min-h-[32px] flex items-center px-3 py-1 cursor-pointer hover:bg-muted/50 rounded"
                  >
                    {change.new}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
