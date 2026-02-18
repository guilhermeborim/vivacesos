import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    filterType?: "text" | "select";
    options?: string[];
  }
}
