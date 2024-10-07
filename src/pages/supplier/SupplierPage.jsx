import {
  faEye,
  faIndustry,
  faPencil,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { ModalSupplier } from "../../components/Modal";
import { Datatable } from "../../components/Datatable";
import { CenterAlert, ToastAlert } from "../../components/Alert";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { CreateSupplierPage } from "./CreateSupplierPage";

export const SupplierPage = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const [currentSupplierId, setCurrentSupplierId] = useState(null);
  const [step, setStep] = useState(0);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "supplier_id",
      },
      {
        Header: "Nama",
        accessor: "nama_supplier",
      },
      {
        Header: "Alamat",
        accessor: "alamat",
      },
      {
        Header: "Kontak",
        accessor: "nomor_telepon",
      },
      {
        Header: "Tipe",
        accessor: "tipe_supplier",
      },
      {
        Header: "Aksi",
        accessor: "aksi",
        Cell: ({ row }) => (
          <div className="flex">
            <button
              onClick={() => {
                setType("detail");
                setCurrentSupplierId(row.original.supplier_id);
              }}
              className="btn rounded-md bg-primary text-white hover:bg-primary btn-sm"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>

            <button
              onClick={() => {
                setType("edit");
                setCurrentSupplierId(row.original.supplier_id);
              }}
              className="btn rounded-md bg-success text-white hover:bg-success btn-sm"
            >
              <FontAwesomeIcon icon={faPencil} />
            </button>

            <button
              onClick={() => handleDelete(row.original.supplier_id)}
              className="btn rounded-md bg-error text-white hover:bg-error btn-sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <ModalSupplier
              supplierId={row.original.supplier_id}
              type={type}
              data={row.original}
            />
          </div>
        ),
      },
    ],
    [type]
  );

  useEffect(() => {
    if (type && currentSupplierId) {
      document.getElementById(currentSupplierId).showModal();
    }
  }, [type, currentSupplierId]);

  const [supplier, setSupplier] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/supplier", headers);
        setSupplier(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [step]);
  const handleDelete = async (supplierId) => {
    const result = await Swal.fire({
      title: "Yakin?",
      text: "Data yang terhubung dengan supplier ini akan ikut terhapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/supplier/delete/${supplierId}`,
          headers
        );
        setSupplier((prevSuppliers) =>
          prevSuppliers.filter(
            (supplier) => supplier.supplier_id !== supplierId
          )
        );
        console.log(response.data);
        ToastAlert("success", "Supplier Berhasil Dihapus");
      } catch (error) {
        CenterAlert("error", "Oops...", "Terjadi Kesalahan Server");
      }
    }
  };
  const handleStep = () => {
    setStep(1);
  };
  const handlePrevious = () => {
    setStep(0);
  };
  return (
    <Layout title="Supplier" icon={faIndustry}>
      {step === 0 ? (
        <div className="card shadow-md">
          <div className="card-body">
            <div className="card-title flex md:flex-row flex-col justify-between">
              <p className="text-lg">List Supplier</p>
              <div>
                <Button onClick={handleStep} icon={faPlus} showIcon={true}>
                  Tambah Supplier
                </Button>
              </div>
            </div>
            <hr></hr>
            <div>
              <Datatable columns={columns} data={supplier} loading={loading} />
            </div>
          </div>
        </div>
      ) : (
        <CreateSupplierPage handlePrevious={handlePrevious} setStep={setStep} />
      )}
    </Layout>
  );
};
