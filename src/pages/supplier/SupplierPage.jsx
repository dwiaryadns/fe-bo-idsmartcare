import {
  faBox,
  faEdit,
  faIndustry,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DatatableSupplier from "../../components/supplier/DatatableSupplier";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalDetailSupplier } from "../../components/supplier/ModalDetailSupplier";
import { Link } from "react-router-dom";

export const SupplierPage = () => {
  const [loading, setLoading] = useState(true);
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
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <ModalDetailSupplier
              supplierId={row.original.supplier_id}
              data={{
                supplier_id: row.original.supplier_id,
                alamat: row.original.alamat,
                nama: row.original.nama_supplier,
                telp: row.original.nomor_telepon,
                tipe: row.original.tipe_supplier,
                kota: row.original.kabupaten,
                provinsi: row.original.provinsi,
                kode_pos: row.original.kode_pos,
                email: row.original.email,
                website: row.original.website,
                pic_name: row.original.kontak_person,
                pic_contact: row.original.nomor_kontak_person,
                pic_email: row.original.email_kontak_person,
                npwp: row.original.nomor_npwp,
                tgl_pks: row.original.tanggal_kerjasama,
                desa: row.original.desa,
                kecamatan: row.original.kecamatan,
              }}
            />
            <button
              onClick={() =>
                document.getElementById(row.original.supplier_id).showModal()
              }
              className="btn btn-sm btn-success text-white"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-sm btn-error text-white">
              <FontAwesomeIcon icon={faTrash} />
            </button>
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
  const [supplier, setSupplier] = useState([]);
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/supplier", headers);
        setSupplier(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSupplier();
  }, []);
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Supplier" icon={faIndustry} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="md:text-lg text-sm">List Of Supplier</p>
                  <Link
                    to={"/supplier/create"}
                    className="cursor-pointer btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Supplier
                  </Link>
                </div>
                <hr></hr>
                <div className="table-pin-rows overflow-x-auto">
                  <DatatableSupplier
                    columns={columns}
                    data={supplier}
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
