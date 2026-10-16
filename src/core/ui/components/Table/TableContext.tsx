import { ColumnFiltersState } from "@tanstack/react-table";
import { createContext, ReactNode, useContext, useState } from "react";

interface TableContextProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  isFilterOpen: boolean;
  toggleFilter: () => void;
}

const defaultValue: TableContextProps = {
  columnFilters: [],
  setColumnFilters: () => {},
  isFilterOpen: false,
  toggleFilter: () => {},
};

const TableContext = createContext<TableContextProps>(defaultValue);

export function TableProvider({ children }: { children: ReactNode }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  return (
    <TableContext.Provider
      value={{
        columnFilters,
        setColumnFilters,
        isFilterOpen,
        toggleFilter,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext() {
  const context = useContext(TableContext);

  return context;
}
