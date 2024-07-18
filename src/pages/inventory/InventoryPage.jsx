import { faBox, faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import DataTableWarehouse from "../../components/warehouse/DatatableWarehouse";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import DatatablesInventory from "../../components/inventory/DatatablesInventory";

export const InventoryPage = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Choise",
        accessor: "",
      },
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
        Cell: ({ row }) => <p>{row.original.supplier.nama_supplier}</p>,
      },
      {
        Header: "Harga",
        accessor: "harga",
        Cell: ({ row }) => <p>Rp {row.original.barang.harga_beli}</p>,
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
                  <p className="md:text-lg text-sm">List Of Barang</p>
                  {/*<Link
                    className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                    to={"/warehouse/create"}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Inventory
                  </Link> */}
                </div>
                <hr></hr>
                <div className="overflow-x-auto table-pin-rows">
                  {/* <DatatablesInventory columns={columns} />*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
