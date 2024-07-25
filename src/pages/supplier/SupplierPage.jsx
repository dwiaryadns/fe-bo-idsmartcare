import {
  faBox,
  faEdit,
  faEllipsis,
  faEllipsisV,
  faIndustry,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import DatatableSupplier from "../../components/supplier/DatatableSupplier";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, headers } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalDetailSupplier } from "../../components/supplier/ModalDetailSupplier";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
        accessor: "aksi",
        Cell: ({ row }) => (
          <div className="">
            <div className="dropdown dropdown-left dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a
                    onClick={() =>
                      document
                        .getElementById(row.original.supplier_id)
                        .showModal()
                    }
                  >
                    Detail
                  </a>
                </li>
                <li>
                  <a>Edit</a>
                </li>
                <li>
                  <a onClick={() => handleDelete(row.original.supplier_id)}>
                    Hapus
                  </a>
                </li>
              </ul>
            </div>
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
                start_pks_date: row.original.start_pks_date,
                end_pks_date: row.original.end_pks_date,
                desa: row.original.desa,
                kecamatan: row.original.kecamatan,
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

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
        Swal.fire("Deleted!", "The supplier has been deleted.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire(
          "Error!",
          "There was an issue deleting the supplier.",
          "error"
        );
      }
    }
  };
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
                  <p className="md:text-lg text-sm">List Supplier</p>
                  <Link
                    to={"/supplier/create"}
                    className="cursor-pointer btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Tambah Supplier
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
