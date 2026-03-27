"use client";

import { rankItem } from "@tanstack/match-sorter-utils";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";

import { PageSpinner } from "@/app/components/elements/PageSpinner";
import { EmptyTableNotice } from "./EmptyTableNotice";
import { DebouncedInput } from "./DebouncedInput";

// import { Icon } from '@/components/Elements';
// import { SelectField } from '@/components/Form';
// import { Option } from '@/types';
// import { useSelectField } from '@/hooks';

// Guide for generics used: https://stackoverflow.com/a/62705164/15063835

interface TableProps<DataType extends { id: number | string }> {
  isLoading: boolean;
  data: DataType[] | undefined;
  rowSelection?: {
    onRowSelectionChange: (data: DataType[]) => void;
  };
  columns: ColumnDef<DataType>[];
  tableWidth?: string;
  tableRadius?: string;
  tableHeight?: string;
  isTableEmpty: boolean;
  emptyNotice?: string;
  emptyNoticeSubheading?: string;
  emptyNoticeLink?: string;
  emptyNoticeLinkName?: string;
  showFilters?: boolean;
  hasVerticalLines?: boolean;
  allButtonFilters?: boolean;
  ResultPicksComponent?: React.ReactNode;
  title?: string;
  handleRowClick?: (row: DataType) => void;
  placeholder?: string;
  isPaginated?: boolean;
  defaultPageSize?: number;
  deleteButton?: boolean;
  deleteIcon?: React.ReactElement;
  handleDeleteData?: (
    userId: string,
    firstName: string,
    lastName: string,
  ) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Table = <DataType extends { id: number | string }>({
  handleRowClick,
  isLoading,
  data,
  columns,
  isTableEmpty,
  emptyNotice,
  emptyNoticeSubheading,
  emptyNoticeLink,
  emptyNoticeLinkName,
  showFilters = false,
  isPaginated = true,
  hasVerticalLines = false,
  ResultPicksComponent,
  title = "",
  tableWidth = "",
  tableHeight = "h-[70vh]",
  tableRadius = "rounded-[9px]",
  rowSelection,
  placeholder = "Search",
  defaultPageSize = 50,
}: // handleDeleteData,
// deleteButton,
// deleteIcon,
React.PropsWithChildren<TableProps<DataType>>) => {
  const defaultData = React.useMemo(() => [], []);
  // const { selectField, setSelectField } = useSelectField();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
  });

  const paginationSelectOptions = [
    {
      id: "50",
      name: "50",
    },
    {
      id: "150",
      name: "150",
    },
    {
      id: "250",
      name: "250",
    },
    {
      id: "500",
      name: "500",
    },
    {
      id: "1000",
      name: "1000",
    },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    table.setPageSize(parseInt(value, 10));
  };

  const selectedRowData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  React.useEffect(() => {
    if (rowSelection) {
      rowSelection.onRowSelectionChange(selectedRowData);
    }
  }, [selectedRowData, rowSelection]);

  React.useEffect(() => {
    table.setPageSize(defaultPageSize);
  }, [defaultPageSize, table]);

  return (
    <>
      <div className="shadow-[0px 8px 24px] bg-white shadow-[rgba(149, 157, 165, 0.2)] rounded-[10px]">
        {showFilters && (
          <div className="mb-2 mt-8 flex w-full flex-row items-center justify-between gap-10 overflow-auto">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={placeholder}
            />
          </div>
        )}

        {isTableEmpty ? (
          <EmptyTableNotice
            notice={emptyNotice || "No data available"}
            noticeSubheading={emptyNoticeSubheading || ""}
            linkUrl={emptyNoticeLink}
            linkName={emptyNoticeLinkName}
          />
        ) : (
          <div className="space-y-6 rounded-[10px]">
            {ResultPicksComponent}

            {title && <h2 className="mt-8 text-white">{title}</h2>}

            <div
              className={clsx(
                "border-gray-450 overflow-x-auto overflow-y-auto border bg-white",
                tableHeight,
                tableRadius,
              )}
            >
              <table
                className={clsx(
                  "border-gray-450 border-separate  border-spacing-y-3 ",
                  tableWidth || "w-full",
                )}
              >
                <thead className="sticky top-0 font-bold bg-white z-20">
                  {table.getHeaderGroups().map((headerGroup) => {
                    return (
                      <tr className="relative z-[10]" key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            className={clsx(
                              "cursor-pointer border-b bg-gray-150 p-4 text-left text-xs transition duration-500 ease-in-out md:text-sm",
                              tableRadius !== "rounded-none" && "",
                            )}
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </th>
                        ))}
                      </tr>
                    );
                  })}
                </thead>

                <tbody className="-z-10 space-y-3">
                  {isLoading && (
                    <tr>
                      <td
                        style={{ border: "none" }}
                        colSpan={columns.length}
                        className="h-[full]"
                      >
                        <div className="mt-[74px]">
                          <PageSpinner className="py-[74px]" />
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isLoading && (
                    <>
                      {table.getRowModel().rows.map((row, index) => {
                        const isOdd = index % 2 === 1;

                        return (
                          <tr
                            className="group font-normal transition duration-200 ease-in-out hover:bg-gray-200/10"
                            key={row.id}
                            onClick={() => {
                              if (handleRowClick) {
                                handleRowClick(row.original);
                              }
                            }}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td
                                className={clsx(
                                  "p-4 text-sm",
                                  isOdd && "bg-gray-450 bg-opacity-[15%]",
                                  hasVerticalLines &&
                                    "border-l-gray-450 border-l",
                                )}
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {isPaginated && (
              <div className="mt-6 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center rounded border bg-white p-3 disabled:cursor-not-allowed"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {/* <Icon width="10" height="10" id="caret-left" /> */}
                    {/* <Icon width="10" height="10" id="caret-left" /> */}
                  </button>
                  <button
                    type="button"
                    className="rounded border bg-white p-3 disabled:cursor-not-allowed"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {/* <Icon width="10" height="10" id="caret-left" /> */}
                  </button>
                  <button
                    type="button"
                    className="rounded border bg-white p-3 disabled:cursor-not-allowed"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {/* <Icon width="10" height="10" id="caret-right" /> */}
                  </button>
                  <button
                    type="button"
                    className="flex items-center rounded border bg-white p-3 disabled:cursor-not-allowed"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    {/* <Icon width="10" height="10" id="caret-right" /> */}
                    {/* <Icon width="10" height="10" id="caret-right" /> */}
                  </button>
                  <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                      {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()}
                    </strong>
                  </span>
                  <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                      type="number"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        table.setPageIndex(page);
                      }}
                      className="w-16 rounded border p-1"
                    />
                  </span>
                </div>
                {/**/}
                <select
                  onChange={handleSelectChange}
                  className="border-gray-450 cursor-pointer border bg-white p-3 outline-none"
                >
                  {paginationSelectOptions.map(({ id }) => (
                    <option key={id} value={id}>
                      {id} per page
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
         {
          /* Border radiuses:
           * https://stackoverflow.com/a/4094151/15063835
           * https://stackoverflow.com/a/9874292/15063835
         */
        }

        table {
          border-collapse: separate;
          border-spacing: 0;
        }

        td {
          border-bottom: 1px solid #ededed;
        }

        tr th.radius:first-child {
          border-top-left-radius: 10px;
        }

        tr th.radius:last-child {
          border-top-right-radius: 10px;
        }

        tr:first-child td:first-child {
          border-top-left-radius: 11px;
        }
        tr:first-child td:last-child {
          border-top-right-radius: 11px;
        }

        tr:nth-child(even) {
          background-color: #fafafa; /* Change this to the shade of gray you want */
        }
        tr:last-child td:first-child {
          /* border-bottom-left-radius: 11px; */
        }

        tr:last-child td:last-child {
          border-bottom-right-radius: 11px;
        }

        tr:first-child td {
          border-top-style: solid;
        }
        tr td:first-child {
          border-left-style: solid;
        }
      `}</style>
    </>
  );
};
