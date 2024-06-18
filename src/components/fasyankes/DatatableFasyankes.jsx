import React, { useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

export const DataTableFasyankes = ({ columns, data, loading }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we use page, which has only the rows for the active page
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // set initial pageSize here
    },
    useGlobalFilter,
    usePagination
  );

  const handlePageClick = (data) => {
    gotoPage(data.selected);
  };

  return (
    <div>
      <div className="flex justify-between">
        <select
          className="select select-bordered rounded-md select-sm mt-3"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          placeholder="Search..."
          className="input input-bordered rounded-md mb-5 input-sm mt-3 mr-2"
        />
      </div>
      <table
        className="table table-zebra"
        {...getTableProps()}
        style={{
          width: "100%",
        }}
      >
        <thead className=" font-extrabold">
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps()}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "10px" }}
              >
                {loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "No records found"
                )}
              </td>
            </tr>
          ) : (
            page.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
          nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"previous"}
          nextClassName={"next"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
};

export default DataTableFasyankes;
