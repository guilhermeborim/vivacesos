import { ColumnDef } from "@tanstack/react-table";

interface ColumnProps<T> {
  header: string;
  data?: keyof T;
  accessorFn?: (row: T) => any;
}

export function Column<T>({
  header,
  data,
  accessorFn,
}: ColumnProps<T>): ColumnDef<T> {
  return {
    header: header,
    accessorFn: accessorFn,
    enableColumnFilter: false,
    cell: ({ getValue }) => <span>{String(getValue())}</span>,
  };
}
