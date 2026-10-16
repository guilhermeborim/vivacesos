import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    filterType?: "text" | "select"
    options?: string[]
  }
}
