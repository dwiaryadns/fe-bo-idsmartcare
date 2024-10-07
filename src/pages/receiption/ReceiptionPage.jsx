import { faPlus, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import { ModalUpdateStock } from "../../components/Modal";
import { Datatable } from "../../components/Datatable";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

export const ReceiptionPage = () => {
  const [loading, setLoading] = useState(true);

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
          <div className="flex items-center">
            <span
              className={`${
                row.original.status == "Pending" ? "dot-pending" : "dot-success"
              }`}
            ></span>
            <div className=" ml-2 place-items-center">
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
              <button
                onClick={() =>
                  document
                    .getElementById(row.original.penerimaan_id)
                    .showModal()
                }
                className="bg-primary btn btn-sm hover:bg-primary text-white"
              >
                Lihat Detail
              </button>
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
    <Layout title="Penerimaan Barang" icon={faReceipt}>
      <div className="card shadow-md ">
        <div className="card-body">
          <div className="card-title flex md:flex-row flex-col justify-between">
            <p className="text-lg">List Penerimaan</p>
            <Link to={"/good-receipt/create"}>
              <Button showIcon={true} icon={faPlus}>
                Tambah Penerimaan
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
