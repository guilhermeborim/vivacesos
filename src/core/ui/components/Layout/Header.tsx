import { CardHeader, UncontrolledTooltip } from "reactstrap";
import { useTableContext } from "../Table/TableContext";

interface HeaderLayoutProps {
  children?: React.ReactNode;
  isFilters?: boolean;
}

export function HeaderLayout({
  children,
  isFilters = true,
}: HeaderLayoutProps) {
  const { columnFilters, toggleFilter } = useTableContext();
  const filtersCount = columnFilters.length;

  return (
    <CardHeader className="d-flex align-items-center">
      <div className="d-flex ms-auto gap-1">
        {children}

        {isFilters && (
          <>
            <button
              id="filterBtn"
              className="btn btn-info btn-icon position-relative"
              onClick={toggleFilter}
            >
              <i className="ri-filter-3-line"></i>

              {filtersCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {filtersCount}
                </span>
              )}
            </button>
            <UncontrolledTooltip target={"filterBtn"} id="filterBtn">
              Filtros
            </UncontrolledTooltip>
          </>
        )}
      </div>
    </CardHeader>
  );
}
