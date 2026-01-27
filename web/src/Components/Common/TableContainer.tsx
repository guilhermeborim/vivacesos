import React, { Fragment, useEffect, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";

import {
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table as ReactTable,
  useReactTable,
} from "@tanstack/react-table";

// Column Filter
const Filter = ({
  column,
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      id="search-bar-0"
      className="form-control search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

interface TableContainerProps {
  columns?: any;
  data?: any;
  isGlobalFilter?: any;
  isProductsFilter?: any;
  isCustomerFilter?: any;
  isOrderFilter?: any;
  isContactsFilter?: any;
  isCompaniesFilter?: any;
  isLeadsFilter?: any;
  isCryptoOrdersFilter?: any;
  isInvoiceListFilter?: any;
  isTicketsListFilter?: any;
  isNFTRankingFilter?: any;
  isTaskListFilter?: any;
  handleTaskClick?: any;
  customPageSize?: any;
  tableClass?: any;
  theadClass?: any;
  trClass?: any;
  thClass?: any;
  divClass?: any;
  SearchPlaceholder?: any;
  handleLeadClick?: any;
  handleCompanyClick?: any;
  handleContactClick?: any;
  handleTicketClick?: any;
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isProductsFilter,
  isContactsFilter,
  isCompaniesFilter,
  isNFTRankingFilter,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
}: TableContainerProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      globalFilter,
    },
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
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState,
    getPageCount,
  } = table;

  const pageIndex = getState().pagination.pageIndex;
  const pageSize = getState().pagination.pageSize;
  const totalPages = getPageCount();

  useEffect(() => {
    Number(customPageSize) && setPageSize(Number(customPageSize));
  }, [customPageSize, setPageSize]);

  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody className="border border-dashed border-end-0 border-start-0">
            <form>
              <Row>
                <Col sm={5}>
                  <div
                    className={
                      isProductsFilter ||
                      isContactsFilter ||
                      isCompaniesFilter ||
                      isNFTRankingFilter
                        ? "search-box me-2 mb-2 d-inline-block"
                        : "search-box me-2 mb-2 d-inline-block col-12"
                    }
                  >
                    <DebouncedInput
                      value={globalFilter ?? ""}
                      onChange={(value) => setGlobalFilter(String(value))}
                      placeholder={SearchPlaceholder}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Row>
      )}

      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((headerGroup: any) => (
              <tr className={trClass} key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <th
                    key={header.id}
                    className={thClass}
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <React.Fragment>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " ",
                          desc: " ",
                        }[header.column.getIsSorted() as string] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </React.Fragment>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map((row: any) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center mt-2 g-3">
        {/* ESQUERDA — INFO */}
        <div className="col-sm">
          <div className="text-muted">
            Página <span className="fw-semibold">{pageIndex + 1}</span> de{" "}
            <span className="fw-semibold">{totalPages}</span>
          </div>
        </div>

        {/* DIREITA — CONTROLES */}
        <div className="col-sm-auto">
          <ul className="pagination pagination-separated pagination-md mb-0">
            {/* FIRST */}
            <li className={`page-item ${pageIndex === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPageIndex(0)}>
                «
              </button>
            </li>

            {/* PREVIOUS */}
            <li
              className={`page-item ${!getCanPreviousPage() ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={previousPage}>
                ‹
              </button>
            </li>

            {/* NEXT */}
            <li className={`page-item ${!getCanNextPage() ? "disabled" : ""}`}>
              <button className="page-link" onClick={nextPage}>
                ›
              </button>
            </li>

            {/* LAST */}
            <li
              className={`page-item ${pageIndex === totalPages - 1 ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPageIndex(totalPages - 1)}
              >
                »
              </button>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
