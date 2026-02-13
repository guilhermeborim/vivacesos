import { ColumnDef } from "@tanstack/react-table";
import { DropdownComponent } from "core/ui";

interface ColumnsProps<T> {
  columns: ColumnDef<T>[];
  renderActions?: (row: T) => React.ReactNode;
}

export function Columns<T>({
  columns,
  renderActions,
}: ColumnsProps<T>): ColumnDef<T>[] {
  if (!renderActions) return columns;

  return [
    ...columns,
    {
      header: "AÇÃO",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        return (
          <DropdownComponent.Root>
            <DropdownComponent.Toggle variant="light" />
            <DropdownComponent.Menu>
              {renderActions(row.original)}
            </DropdownComponent.Menu>
          </DropdownComponent.Root>
        );
      },
    },
  ];
}
