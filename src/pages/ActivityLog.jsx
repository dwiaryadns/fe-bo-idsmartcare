import {
  faCalendarAlt,
  faHistory,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import { DatatableWithPaginate } from "../components/Datatable";
import { useMemo, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActivityLog = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Menu",
        accessor: "menu",
      },
      {
        Header: "Aktivitas",
        accessor: "activity",
      },
      {
        Header: "Oleh",
        accessor: "activity_by",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div
            className={`badge text-white ${
              row.original.status === "Berhasil"
                ? "badge-success"
                : "badge-danger"
            }`}
          >
            {row.original.status}
          </div>
        ),
      },
      {
        Header: "Tanggal",
        accessor: "activity_at",
        Cell: ({ row }) => {
          const date = new Date(row.original.activity_at);
          const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          };
          return <div>{date.toLocaleString("id-ID", options)}</div>;
        },
      },
    ],
    []
  );
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isSearch, setIsSearch] = useState(false);
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateRangeChange = (item) => {
    setState([item.selection]);
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
    setIsSearch(true);
  };

  const handleDateRangeToggle = () => {
    setIsDateRangePickerOpen(!isDateRangePickerOpen);
  };

  const params = useMemo(
    () => ({
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      isSearch: isSearch,
    }),
    [startDate, endDate, isSearch]
  );

  console.log(startDate.toISOString().split("T")[0]);
  console.log(endDate.toISOString().split("T")[0]);
  return (
    <Layout title="Histori Aktivitas" icon={faHistory}>
      <div className="card">
        <div className="card-body shadow-md rounded-md">
          <div className="flex justify-start gap-4">
            <div className="flex flex-col relative">
              <span>Filter</span>
              <button
                type="button"
                onClick={handleDateRangeToggle}
                className="btn btn-sm bg-primary hover:bg-primary rounded-md text-white"
              >
                {isDateRangePickerOpen ? (
                  <FontAwesomeIcon icon={faTimes} />
                ) : (
                  <FontAwesomeIcon icon={faCalendarAlt} />
                )}{" "}
                {isDateRangePickerOpen ? "Tutup Tanggal" : "Pilih Tanggal"}
              </button>
              {isDateRangePickerOpen && (
                <div
                  className="absolute top-full mt-2 z-10"
                  style={{ zIndex: 9999 }}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateRangeChange}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </div>
              )}
            </div>
          </div>
          <hr className="my-3" />
          <div >
            <DatatableWithPaginate
              endpoint={"/activity-log"}
              columns={columns}
              params={params}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityLog;
