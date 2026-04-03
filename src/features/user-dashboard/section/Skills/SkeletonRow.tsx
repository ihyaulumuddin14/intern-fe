import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const SkeletonRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-[120px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-[60px] rounded-full" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-[60px] rounded-full" />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-[20px]" />
          <Skeleton className="h-2 w-full" />
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-[100px] rounded-full" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-6 w-[40px] rounded-full" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};