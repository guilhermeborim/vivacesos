import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import {
  Col,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  Table,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { ButtonPrimitive } from "../Button";
import { ColumnFilter } from "./ColumnFilter";
import { useTableContext } from "./TableContext";

interface TableContainerProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isGlobalFilter?: boolean;
  isLoading?: boolean;
  customPageSize?: number;
  tableClass?: string;
  theadClass?: string;
  trClass?: string;
  thClass?: string;
  divClass?: string;
}

export function TableContainer<T>({
  columns,
  data,
  isGlobalFilter = true,
  isLoading = false,
  customPageSize = 10,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
}: TableContainerProps<T>) {
  const { columnFilters, setColumnFilters, isFilterOpen, toggleFilter } =
    useTableContext();
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data,
    state: { columnFilters, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    getPageCount,
    nextPage,
    previousPage,
    getCanNextPage,
    getCanPreviousPage,
    setPageIndex,
    setPageSize,
    resetColumnFilters,
    resetGlobalFilter,
  } = table;

  const pageIndex = getState().pagination.pageIndex;
  const totalPages = getPageCount();
  const totalRows = data.length;
  const filteredRows = getRowModel().rows.length;

  useEffect(() => {
    setPageSize(customPageSize);
  }, [customPageSize, setPageSize]);

  const hasData = totalRows > 0;
  const hasFilteredData = filteredRows > 0;

  return (
    <Fragment>
      {/* 📊 TABLE */}
      <div className={divClass}>
        <Table hover responsive className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={trClass}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={thClass}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: "pointer" }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  Carregando...
                </td>
              </tr>
            ) : !hasData ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <h5>Nenhum registro cadastrado</h5>
                  <p className="text-muted">
                    Quando houver dados, eles aparecerão aqui.
                  </p>
                </td>
              </tr>
            ) : !hasFilteredData ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <h5>Nenhum resultado encontrado</h5>
                  <p className="text-muted">Tente ajustar os filtros.</p>
                </td>
              </tr>
            ) : (
              getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* 📄 PAGINATION */}
      {hasData && (
        <Row className="align-items-center mt-3 g-3">
          <Col>
            <div className="text-muted">
              Mostrando {filteredRows} de {totalRows} registros
            </div>
          </Col>

          <Col xs="auto">
            <ul className="pagination pagination-separated mb-0">
              <li
                className={`page-item ${!getCanPreviousPage() && "disabled"}`}
              >
                <button className="page-link" onClick={() => setPageIndex(0)}>
                  «
                </button>
              </li>

              <li
                className={`page-item ${!getCanPreviousPage() && "disabled"}`}
              >
                <button className="page-link" onClick={previousPage}>
                  ‹
                </button>
              </li>

              <li className="page-item disabled">
                <span className="page-link">
                  {pageIndex + 1} de {totalPages}
                </span>
              </li>

              <li className={`page-item ${!getCanNextPage() && "disabled"}`}>
                <button className="page-link" onClick={nextPage}>
                  ›
                </button>
              </li>

              <li className={`page-item ${!getCanNextPage() && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setPageIndex(totalPages - 1)}
                >
                  »
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      )}

      <Fragment>
        <Offcanvas
          isOpen={isFilterOpen}
          toggle={toggleFilter}
          direction="end"
          className="offcanvas-end border-0"
        >
          <OffcanvasHeader
            className="d-flex align-items-center bg-primary bg-gradient p-3 offcanvas-header-dark"
            toggle={toggleFilter}
          >
            <span className="m-0 me-2 text-white">Filtros</span>
          </OffcanvasHeader>
          <OffcanvasBody className="p-0">
            <SimpleBar className="h-100">
              <div className="p-4">
                <h6 className="mb-3 fw-semibold text-uppercase">
                  Filtros ({columnFilters.length})
                </h6>

                {table.getAllLeafColumns().map((column) => {
                  const meta = column.columnDef.meta;
                  if (!meta?.filterType) return null;

                  return (
                    <div key={column.id} className="mb-4">
                      <label className="form-label fw-medium">
                        {typeof column.columnDef.header === "function"
                          ? column.id
                          : column.columnDef.header}
                      </label>

                      <ColumnFilter column={column} />
                    </div>
                  );
                })}

                <div className="d-flex gap-2 mt-4">
                  <ButtonPrimitive
                    variant="light"
                    className="w-100"
                    onClick={() => {
                      resetColumnFilters();
                      resetGlobalFilter();
                    }}
                  >
                    Limpar
                  </ButtonPrimitive>
                  {/* <button
                    className="btn btn-light w-100"
                    onClick={() => {
                      resetColumnFilters();
                      resetGlobalFilter();
                    }}
                  >
                    Limpar
                  </button> */}

                  {/* <button
                    className="btn btn-primary w-100"
                    onClick={toggleFilter}
                  >
                    Aplicar
                  </button> */}
                </div>
              </div>
            </SimpleBar>
          </OffcanvasBody>
        </Offcanvas>
      </Fragment>
    </Fragment>
  );
}
