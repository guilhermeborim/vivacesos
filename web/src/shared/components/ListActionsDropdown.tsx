import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropdown } from "core/ui";
import { ActionItem } from "core/ui/composites/ActionsDropdown";

export function actionsColumn<T>(
  actions: (row: T) => ActionItem[],
): ColumnDef<T> {
  return {
    header: "AÇÃO",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => <ActionsDropdown actions={actions(row.original)} />,
  };
}
