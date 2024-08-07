import { faEye, faPlus, faReceipt } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import { ModalUpdateStock } from "../../components/Modal";
import { Datatable } from "../../components/Datatable";

export const ReceiptionPage = () => {
  const [loading, setLoading] = useState(true);
  const viewPdf = (url) => {
    window.location.href = url;
  };
  const columns = useMemo(
    () => [
      {
        Header: "Penerimaan ID",
        accessor: "penerimaan_id",
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
            <div>
              <ModalUpdateStock
                grn_id={row.original.penerimaan_id}
                data={row.original.pending}
                file_grn={row.original.grn}
              />
              <FontAwesomeIcon
                onClick={() =>
                  document
                    .getElementById(row.original.penerimaan_id)
                    .showModal()
                }
                className="text-white bg-primary p-3 rounded-md text-sm"
                icon={faEye}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const [goodReceipt, setGoodReceipt] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
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
            <Header title="Penerimaan Barang" icon={faReceipt} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="md:text-lg text-sm">List Penerimaan</p>
                  <Link
                    to={"/good-receipt/create"}
                    className="cursor-pointer btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Tambah Penerimaan
                  </Link>
                </div>
                <hr></hr>
                <div className="table-pin-rows overflow-x-auto">
                  <Datatable
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
