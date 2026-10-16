import { DropdownComponent } from "@/core/ui";
import { ColumnDef } from "@tanstack/react-table";
import { Children, Fragment, isValidElement, ReactNode } from "react";

interface ColumnsProps<T> {
  columns: ColumnDef<T>[];
  renderActions?: (row: T) => React.ReactNode;
}

/** Há alguma ação de fato? Ignora null, booleanos e fragmentos vazios (ex.: `{cond && <Item />}`). */
function hasActions(node: ReactNode): boolean {
  let found = false;
  Children.forEach(node, (child) => {
    if (found || child === null || child === undefined || typeof child === "boolean") return;
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      found = hasActions(child.props.children);
    } else {
      found = true;
    }
  });
  return found;
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
        const actions = renderActions(row.original);
        // Linha sem nenhuma ação: não mostra o botão de três pontinhos.
        if (!hasActions(actions)) return null;

        return (
          <DropdownComponent.Root>
            <DropdownComponent.Toggle variant="light" />
            <DropdownComponent.Menu>{actions}</DropdownComponent.Menu>
          </DropdownComponent.Root>
        );
      },
    },
  ];
}
