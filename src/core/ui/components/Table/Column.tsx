import { ColumnDef } from "@tanstack/react-table"

type ColumnProps<T> =
  | {
      header: string
      data?: keyof T
      accessorFn?: (row: T) => any
      cell?: (row: T) => React.ReactNode
      filterType?: "text"
      options?: never
    }
  | {
      header: string
      data?: keyof T
      accessorFn?: (row: T) => any
      cell?: (row: T) => React.ReactNode
      filterType: "select"
      options: string[]
    }

export function Column<T>({
  header,
  accessorFn,
  filterType,
  options,
  cell,
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
    cell: cell
      ? ({ row }) => cell(row.original)
      : ({ getValue }) => <span>{String(getValue() ?? "")}</span>,
  }
}
