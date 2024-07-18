import {
  faEdit,
  faEye,
  faFile,
  faPlus,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatatablesReceiption from "../../components/receiption/DatatablesReceiption";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import { ModalUpdateStock } from "../../components/receiption/ModalUpdateStock";

export const ReceiptionPage = () => {
  const [loading, setLoading] = useState(true);
  const viewPdf = (url) => {
    window.location.href = url;
  };
  const columns = useMemo(
    () => [
      {
        Header: "GRN ID",
        accessor: "penerimaan_id", // accessor is the "key" in the data
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
            <div className=" ml-4 place-items-center">
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
                <ModalUpdateStock
                  grn_id={row.original.penerimaan_id}
                  data={row.original.pending}
                />
                <FontAwesomeIcon
                  onClick={() =>
                    document
                      .getElementById(row.original.penerimaan_id)
                      .showModal()
                  }
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
            <Header title="Good Receipt" icon={faReceipt} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="md:text-lg text-sm">List Of Good Receipt</p>
                  <Link
                    to={"/good-receipt/create"}
                    className="cursor-pointer btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Good Receipt
                  </Link>
                </div>
                <hr></hr>
                <div className="table-pin-rows overflow-x-auto">
                  <DatatablesReceiption
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
