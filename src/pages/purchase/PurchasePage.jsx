import { faFile, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DatatablesPurchase from "../../components/purchase/DatatablesPurchase";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const PurchasePage = () => {
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "GRN ID",
        accessor: "grn_id", // accessor is the "key" in the data
      },
      {
        Header: "Nama PO",
        accessor: "po_name",
      },
      {
        Header: "Tanggal Penerimaan",
        accessor: "tanggal_penerimaan",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="indicator">
            <span
              className={`indicator-item h-5 indicator-middle indicator-start badge ${
                row.original.status === "Pending"
                  ? "badge-warning"
                  : "badge-success"
              }`}
            ></span>
            <div className=" ml-3 place-items-center">
              {row.original.status}
            </div>
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="text-xl hover:cursor-pointer">
            {row.original.status === "Pending" ? (
              <div>
                <FontAwesomeIcon
                  className="bg-warning p-3 rounded-md"
                  icon={faEdit}
                />
              </div>
            ) : (
              <div>
                <a href={row.original.url_file} target="_blank">
                  <FontAwesomeIcon
                    className="bg-success text-white p-3 rounded-md"
                    icon={faFile}
                  ></FontAwesomeIcon>
                </a>
              </div>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [goodReceipt, setGoodReceipt] = useState([]);
  useEffect(() => {
    const fetchGoodReceipts = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL + "/good-receipt",
          headers
        );
        setGoodReceipt(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGoodReceipts();
  }, []);
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Purchase" icon={faTag} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex justify-between">
                  <p className="md:text-lg text-sm">List Of Purchase</p>
                  <button className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md">
                    <Link
                      to={"/good-receipt/create"}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Add Purchase
                    </Link>
                  </button>
                </div>
                <hr></hr>
                <div className="table-pin-rows overflow-x-auto">
                  <DatatablesPurchase
                    columns={columns}
                    data={goodReceipt}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
