import { faBox, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import DatatablesInventory from "../../components/inventory/DatatablesInventory";

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
        accessor: "kfa",
        Cell: ({ row }) => <p>{row.original.barang_id}</p>,
      },
      {
        Header: "Nama Barang",
        accessor: "nama_barang",
        Cell: ({ row }) => <p>{row.original.barang.nama_barang}</p>,
      },
      {
        Header: "Supplier",
        accessor: "supplier_barang_id",
        Cell: ({ row }) => <p>{row.original.barang.supplier.nama_supplier}</p>,
      },
      {
        Header: "Harga Beli",
        accessor: "harga_beli",
        Cell: ({ row }) => (
          <p>{formatRupiah(row.original.barang.harga_beli)}</p>
        ),
      },
      {
        Header: "Harga Jual",
        accessor: "harga_jual",
        Cell: ({ row }) => (
          <p>{formatRupiah(row.original.barang.harga_jual)}</p>
        ),
      },
      {
        Header: "Satuan",
        accessor: "satuan",
        Cell: ({ row }) => <p>{row.original.barang.satuan}</p>,
      },
      {
        Header: "Stok",
        accessor: "stok",
        Cell: ({ row }) => <p>{row.original.stok}</p>,
      },
      {
        Header: "Aksi",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex flex-row">
            <button className="bg-primary btn-sm rounded-md hover:bg-primary text-white btn">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        ),
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
            <Header title="Inventory" icon={faBox} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="md:text-lg text-sm">List Barang</p>
                  <Link
                    className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                    to={"/inventory/create"}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Inventory
                  </Link>
                </div>
                <hr></hr>
                <div className="overflow-x-auto table-pin-rows">
                  <DatatablesInventory columns={columns} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
