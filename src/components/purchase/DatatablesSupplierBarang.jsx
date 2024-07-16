import React, { useState, useEffect } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";

export const DatatablesSupplierBarang = ({ columns }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [localPageSize, setLocalPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page: pageIndex + 1,
      per_page: localPageSize,
      search: globalFilter,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/purchase/get-barang-supplier`,
          config
        );
        console.log(response);
        console.log(localPageSize);
        console.log(pageIndex + 1);

        setData(response.data.data.data);
        setPageCount(response.data.data.last_page);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageIndex, localPageSize, globalFilter]);

  const handlePageClick = ({ selected }) => {
    setPageIndex(selected);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // 'page' here is controlled by react-table but we'll override its data with our fetched data
    setPageSize, // useTable hook's setPageSize function
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount, // Total number of pages (controlled pagination)
      initialState: { pageIndex, pageSize: localPageSize },
    },
    useGlobalFilter,
    usePagination
  );

  // Sync localPageSize with useTable's setPageSize
  useEffect(() => {
    setPageSize(localPageSize);
  }, [localPageSize, setPageSize]);

  return (
    <div>
      <div className="flex justify-between">
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
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "10px" }}
              >
                <span className="loading loading-dots loading-md"></span>
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
                      style={{
                        padding: "10px",
                        whiteSpace: "nowrap",
                      }}
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

export default DatatablesSupplierBarang;
