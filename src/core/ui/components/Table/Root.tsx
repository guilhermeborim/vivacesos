import { ColumnDef } from "@tanstack/react-table";
import { TableContainer } from "./TableContainer";

interface RootProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pageLength?: number;
}

export function Root<T>({ columns, data, pageLength = 6 }: RootProps<T>) {
  return (
    <TableContainer
      columns={columns}
      data={data}
      customPageSize={pageLength}
      divClass="table-card mb-3"
      tableClass="table align-middle table-nowrap mb-0"
      theadClass="table-light"
    />
  );
}
