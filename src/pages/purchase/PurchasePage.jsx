import {
  faCheck,
  faClone,
  faFilePdf,
  faPlus,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { Datatable } from "../../components/Datatable";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

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

  const ChildrenModal = (data) => {
    const formatRupiah = (number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    };

    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    };

    const downloadPdf = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/purchase/download`,
          { po_id: data.po_id },
          headers
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `purchase_order_${data.po_id}.pdf`);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        link.remove();
        ToastAlert("success", "Berhasil Download PDF");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        ToastAlert("error", "Gagal Download PDF");
      }
    };
    return (
      <div>
        <button
          onClick={downloadPdf}
          disabled={loading}
          className="btn btn-error text-white btn-sm"
        >
          {loading ? (
            <Loading type={"spinner"} size={"sm"} />
          ) : (
            <div>
              <FontAwesomeIcon icon={faFilePdf} /> Download Invoice
            </div>
          )}
        </button>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Kuantitas</th>
                <th>Catatan</th>
                <th>Harga</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.detail &&
                data.detail.map((detail, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{detail.barang.nama_barang}</td>
                    <td>{detail.jumlah}</td>
                    <td>{detail.notes}</td>
                    <td>{formatRupiah(detail.harga_satuan)}</td>
                    <td>{formatRupiah(detail.total_harga)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={5} className="text-right italic font-bold">
                  Total
                </td>
                <td>{formatRupiah(data.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
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
            <Modal id={row.original.po_id} style={"w-11/12 max-w-5xl"}>
              {ChildrenModal(row.original)}
            </Modal>
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
    <Layout title="Pemesanan Barang" icon={faTag}>
      <div className="card shadow-md ">
        <div className="card-body">
          <div className="card-title flex md:flex-row flex-col justify-between">
            <p className="text-lg ">List Pemesanan</p>
            <Link to={"/purchase/create"}>
              <Button icon={faPlus} showIcon={true}>
                Tambah Pesanan
              </Button>
            </Link>
          </div>
          <hr></hr>
          <div>
            <Datatable columns={columns} data={goodReceipt} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
