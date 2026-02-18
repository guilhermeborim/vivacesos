import { ColumnDef } from "@tanstack/react-table";

type ColumnProps<T> =
  | {
      header: string;
      data?: keyof T;
      accessorFn?: (row: T) => any;
      filterType?: "text";
      options?: never;
    }
  | {
      header: string;
      data?: keyof T;
      accessorFn?: (row: T) => any;
      filterType: "select";
      options: string[];
    };

export function Column<T>({
  header,
  data,
  accessorFn,
  filterType,
  options,
}: ColumnProps<T>): ColumnDef<T> {
  return {
    header: header,
    accessorFn: accessorFn,
    enableColumnFilter: false,
    enableSorting: false,
    meta: {
      filterType: filterType,
      options: options,
    },
    cell: ({ getValue }) => <span>{String(getValue())}</span>,
  };
}
