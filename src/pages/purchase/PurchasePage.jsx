import {
  faCheck,
  faClone,
  faPlus,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ModalDetailPurchase } from "../../components/Modal";
import { Datatable } from "../../components/Datatable";

export const PurchasePage = () => {
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (value, field) => {
    window.navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 3000);
    });
  };

  const renderCopyIcon = (field, value) => (
    <div
      className={`tooltip ${
        copiedField === field ? "tooltip-open" : ""
      } tooltip-top`}
      data-tip={`${copiedField === field ? "Disalin" : "Salin"}`}
    >
      <div
        className={`transition duration-300 ease-in-out ${
          copiedField === field ? "text-green-500" : "text-primary"
        }`}
        onClick={() => handleCopy(value, field)}
      >
        {copiedField === field ? (
          <FontAwesomeIcon icon={faCheck} className="text-lg" />
        ) : (
          <FontAwesomeIcon icon={faClone} className="cursor-pointer text-lg" />
        )}
      </div>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        Header: "PO ID",
        accessor: "po_id",
        Cell: ({ row }) => {
          const poId = row.original.po_id;
          return (
            <div className="flex gap-3 items-center">
              <span>{poId}</span>
              {renderCopyIcon(`po_id_${poId}`, poId)}
            </div>
          );
        },
      },
      {
        Header: "Nama PO",
        accessor: "po_name",
      },
      {
        Header: "Warehouse",
        accessor: "warehouse",
      },
      {
        Header: "Tanggal Pesanan",
        accessor: "tanggal_po",
      },
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <span
              className={`${
                row.original.status === "Order" ? "dot-pending" : "dot-success"
              }`}
            ></span>
            <div className="ml-2 text-sm place-items-center">
              {row.original.status}
            </div>
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            <ModalDetailPurchase
              total={row.original.total}
              poId={row.original.po_id}
              data={row.original.detail}
            />
            <button
              onClick={() =>
                document.getElementById(row.original.po_id).showModal()
              }
              className="bg-primary btn btn-sm hover:bg-primary text-white"
            >
              Lihat Detail
            </button>
          </div>
        ),
      },
    ],
    [copiedField]
  );

  const [goodReceipt, setGoodReceipt] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/purchase", headers);
        setGoodReceipt(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPurchase();
  }, []);
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Pemesanan Barang" icon={faTag} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="text-lg ">List Pemesanan</p>
                  <Link
                    className="btn cursor-pointer bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                    to={"/purchase/create"}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Tambah Pemesanan
                  </Link>
                </div>
                <hr></hr>
                <div>
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
