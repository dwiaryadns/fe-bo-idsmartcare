import { useTable, usePagination, useGlobalFilter } from "react-table";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import axios from "axios";
import { API_BASE_URL } from "../dummy/const";
import Loading from "./Loading";

export const Datatable = ({ columns, data, loading }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const handlePageClick = (data) => {
    gotoPage(data.selected);
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between">
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
          className="input input-bordered rounded-md mb-5 input-sm mt-3"
        />
      </div>
      <div className="table-pin-rows overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-rounded">
        <table
          className="table  whitespace-nowrap table-zebra-zebra"
          {...getTableProps()}
          style={{ width: "100%" }}
        >
          <thead className="font-extrabold">
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps()}
                    style={{ color: "black", fontWeight: "bold" }}
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
                    <Loading type={"dots"} size={"md"} />
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
                    {row.cells.map((cell, index) => (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        // style={{
                        //   whiteSpace: "nowrap",
                        // }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs md:hidden block text-gray-400">
        * Geser untuk melihat detail
      </p>
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

export const DatatableWithPaginate = ({ columns, endpoint, params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [localPageSize, setLocalPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const token = localStorage.getItem("token");

  const config = {
    params: {
      page: pageIndex + 1,
      per_page: localPageSize,
      search: globalFilter,
      ...params,
    },
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, config);
        setData(response.data.data.data);
        setPageCount(response.data.data.last_page);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageIndex, localPageSize, globalFilter, params, endpoint, token]);

  const handlePageClick = ({ selected }) => {
    setPageIndex(selected);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount,
      initialState: { pageIndex, pageSize: localPageSize },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    setPageSize(localPageSize);
  }, [localPageSize, setPageSize]);

  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between">
        <select
          className="select select-bordered rounded-md select-sm mt-3"
          value={localPageSize}
          onChange={(e) => {
            setLocalPageSize(Number(e.target.value));
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
          className="input input-bordered rounded-md mb-5 input-sm mt-3"
        />
      </div>
      <div className="table-pin-rows overflow-x-auto">
        <table
          className="table table-zebra"
          {...getTableProps()}
          style={{
            width: "100%",
          }}
        >
          <thead className="font-extrabold">
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
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <Loading type={"dots"} size={"md"} />{" "}
                </td>
              </tr>
            ) : page.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No records found
                </td>
              </tr>
            ) : (
              page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        // style={{
                        //   whiteSpace: "nowrap",
                        // }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs md:hidden block text-gray-400">
        * Geser untuk melihat detail
      </p>
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
