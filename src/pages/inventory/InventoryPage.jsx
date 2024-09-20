import { faBox, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { DatatableWithPaginate } from "../../components/Datatable";
import Button from "../../components/Button";

export const InventoryPage = () => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Kode Barang",
        accessor: "barang_id",
      },
      {
        Header: "Nama Barang",
        accessor: "nama_barang",
      },
      {
        Header: "Supplier",
        accessor: "supplier.nama_supplier",
      },
      {
        Header: "Harga Beli",
        accessor: "harga_beli",
        Cell: ({ row }) => <p>{formatRupiah(row.original.harga_beli)}</p>,
      },
      {
        Header: "Satuan",
        accessor: "satuan",
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Daftar Produk" icon={faBox} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="text-lg ">List Barang</p>
                  <Link to={"/inventory/import"}>
                    <Button showIcon={true} icon={faPlus} bg="success">
                      Import Excel
                    </Button>
                  </Link>
                  <Link to={"/inventory/create"}>
                    <Button showIcon={true} icon={faPlus}>
                      Tambah Barang
                    </Button>
                  </Link>
                </div>
                <hr></hr>
                <div>
                  <DatatableWithPaginate
                    columns={columns}
                    endpoint={"/inventory/get-barang"}
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
