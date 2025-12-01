import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRenameStore } from "@/store/renameStore";

export default function DiffVisualizer() {
  const getResults = useRenameStore((s) => s.getResults);
  const oldFilenames = useRenameStore((s) => s.originalFiles);
  const newFilenames = getResults();

  if (!oldFilenames.length) {
    return (
      <div className="min-h-[100%] min-w-[100%] rounded-lg flex items-center justify-center">
        Please select a directory...
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
          {oldFilenames.map((filename, index) => (
            <TableRow key={index}>
              <TableCell className="sticky left-0 font-medium border-r">
                {index + 1}
              </TableCell>
              <TableCell className="sticky left-[80px] border-r">
                {filename}
              </TableCell>
              <TableCell>
                <div className="min-h-[32px] flex items-center px-3 py-1">
                  {newFilenames[index]}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
