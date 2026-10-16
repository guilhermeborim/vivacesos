export const ColumnFilter = ({ column }: { column: any }) => {
  const columnFilterValue = column.getFilterValue();
  const meta = column.columnDef.meta;

  if (!meta?.filterType) return null;

  if (meta.filterType === "select") {
    return (
      <select
        className="form-select"
        value={columnFilterValue ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
      >
        <option value="">Todos</option>
        {meta.options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      className="form-control"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Digite..."
    />
  );
};
