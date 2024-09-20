import { faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const"; // Remove headers import here
import { Link } from "react-router-dom";
import axiosInstance from "../../dummy/axiosInstance";

import { DatatableWithPaginate } from "../../components/Datatable";
import { CenterAlert } from "../../components/Alert";
import Loading from "../../components/Loading";
import Button from "../../components/Button";

export const StockWarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectGudang, setSelectGudang] = useState();
  const [selectedWarehouseName, setSelectedWarehouseName] = useState("");
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleCheckboxChange = async (barang_id, isJual) => {
    try {
      const response = await axiosInstance.post("/warehouses/update-isjual", {
        stock_gudang_id: barang_id,
        isJual: !isJual,
      });
      const updatedItem = response.data.data;
      setStockData((prevData) =>
        prevData.map((item) =>
          item.barang_id === barang_id
            ? { ...item, isJual: updatedItem.isJual }
            : item
        )
      );
    } catch (error) {
      CenterAlert("error", "Oops...", "Terjadi Kesahalan Server");
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Barang ID",
        accessor: "barang_id",
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
        accessor: "barang.harga_beli",
        Cell: ({ row }) => {
          return formatRupiah(row.original.barang.harga_beli);
        },
      },
      {
        Header: "Stok",
        accessor: "stok",
      },
      {
        Header: "Status",
        accessor: "",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={() =>
              handleCheckboxChange(
                row.original.stock_gudang_id,
                row.original.isJual
              )
            }
            defaultChecked={row.original.isJual}
          />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/warehouses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWarehouses(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  const handleChangeSelectGudang = async (event) => {
    const warehouseId = event.target.value;
    const warehouseName = event.target.selectedOptions[0].text;
    setSelectGudang(warehouseId);
    setSelectedWarehouseName(warehouseName);
    setLoading(true);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/warehouses/stock-gudang`,
        {
          params: { warehouse_id: warehouseId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStockData(response.data.data.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const WarehouseLengthCondition = () => {
    if (warehouses.length === 1) {
      return (
        <div>
          <div>
            <span className="font-bold text-lg">
              Stock Barang - Gudang {warehouses[0].name}{" "}
            </span>
            <hr className="my-2"></hr>
            <DatatableWithPaginate
              columns={columns}
              endpoint="/warehouses/stock-gudang"
              params={{ warehouse_id: selectGudang }}
            />
          </div>
        </div>
      );
    } else if (warehouses.length > 1) {
      return (
        <div className="">
          <label className="font-bold">Pilih Gudang</label>
          <select
            onChange={handleChangeSelectGudang}
            value={selectGudang}
            className="select select-bordered select-primary rounded-md w-full mb-5"
          >
            <option selected hidden>
              Pilih Gudang
            </option>
            {warehouses.map((wh, index) => (
              <option key={index} value={wh.id}>
                {wh.name}
              </option>
            ))}
          </select>
          {selectGudang ? (
            <div>
              <hr className="mb-3"></hr>
              <span className="font-bold text-lg">
                Stock Barang - Gudang {selectedWarehouseName}{" "}
              </span>
              <div>
                <DatatableWithPaginate
                  columns={columns}
                  endpoint="/warehouses/stock-gudang"
                  params={{ warehouse_id: selectGudang }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center">
          <span>Data gudang tidak ditemukan</span>
          <Link to={"/warehouse/create"}>
            <Button icon={faPlus} showIcon={true}>
              Tambah Gudang
            </Button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Stok Gudang" icon={faWarehouse} />
            <div className="card shadow-md ">
              <div className="card-body">
                {loading ? (
                  <div className="flex flex-col justify-center items-center text-primary text-center">
                    <Loading type={"spinner"} size={"lg"} />
                    <span className="text-xs text-primary mt-2">Tunggu...</span>
                  </div>
                ) : (
                  WarehouseLengthCondition()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
