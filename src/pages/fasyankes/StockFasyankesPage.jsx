import { faBox, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DatatablesInventory from "../../components/inventory/DatatablesInventory";
import { DatatableWithPaginate } from "../../components/Datatable";
import axios from "axios";
import { API_BASE_URL, headers } from "../../dummy/const";
import axiosInstance from "../../dummy/axiosInstance";

export const StockFasyankesPage = () => {
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
        Header: "Fasyankes",
        accessor: "fasyankes_warehouse.fasyankes.name",
      },
      {
        Header: "Nama Barang",
        accessor: "barang.nama_barang",
      },
      {
        Header: "Supplier",
        accessor: "barang.supplier.nama_supplier",
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
        accessor: "barang.satuan",
      },
      {
        Header: "Stok",
        accessor: "stok",
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

  const [fasyankes, setFasyankes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axiosInstance.get("/fasyankes");
        setFasyankes(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, []);

  const [fasyankesId, setFasyankesId] = useState();
  const handleSelectChange = (e) => {
    setFasyankesId(e.target.value);
  };
  const params = useMemo(() => ({ fasyankesId: fasyankesId }), [fasyankesId]);

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Stock Fasyankes" icon={faBox} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div>
                  <div>Filter Fasyankes</div>
                  <select
                    onChange={handleSelectChange}
                    className="select select-bordered w-full rounded-md"
                  >
                    <option selected hidden>
                      Pilih Fasyankes
                    </option>
                    {fasyankes.map((fas, index) => (
                      <option key={index} value={fas.fasyankesId}>
                        {fas.name}
                      </option>
                    ))}
                  </select>
                </div>
                <hr className="my-3" />
                <div className="overflow-x-auto table-pin-rows">
                  <DatatableWithPaginate
                    columns={columns}
                    endpoint="/inventory/get-stock-barang"
                    params={params}
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
