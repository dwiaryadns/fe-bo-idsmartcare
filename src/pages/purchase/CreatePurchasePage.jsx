import { faTag } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import Swal from "sweetalert2";
import { RincianPembelianPage } from "./RincianPembelianPage";
import { DatatableWithPaginate } from "../../components/Datatable";

export const CreatePurchasePage = () => {
  const [tanggalPemesanan, setTanggalPemesanan] = useState(
    localStorage.getItem("tanggalPemesanan") || ""
  );
  const [warehouses, setWarehouses] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState(
    localStorage.getItem("selectedSupplier") || ""
  );
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );

  const handleChangeCheckbox = (item) => {
    if (selectedSupplier && item.supplier.nama_supplier !== selectedSupplier) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Dalam 1 transaksi hanya dapat memasukkan barang yang berasal dari 1 supplier yang sama.",
      });
      return;
    }

    setSelectedItems((prevItems) => {
      const isSelected = prevItems.some(
        (i) => i.supplier_barang_id === item.supplier_barang_id
      );
      const updatedItems = isSelected
        ? prevItems.filter(
            (i) => i.supplier_barang_id !== item.supplier_barang_id
          )
        : [...prevItems, item];

      if (updatedItems.length === 0) {
        setSelectedSupplier("");
      } else if (!isSelected) {
        setSelectedSupplier(item.supplier.nama_supplier);
      }

      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
      setCount(updatedItems.length);

      return updatedItems;
    });
  };
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Choise",
        accessor: "",
        Cell: ({ row }) => (
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                checked={selectedItems.some(
                  (i) =>
                    i.supplier_barang_id === row.original.supplier_barang_id
                )}
                onChange={() => handleChangeCheckbox(row.original)}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        ),
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
        Cell: ({ row }) => (
          <p> {formatRupiah(row.original.barang.harga_beli)}</p>
        ),
      },
    ],
    [selectedItems, selectedSupplier]
  );

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/warehouses`, headers);
        setWarehouses(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWarehouse();

    const today = new Date().toISOString().split("T")[0];
    setTanggalPemesanan(today);

    localStorage.setItem("tanggalPemesanan", today);
  }, []);

  console.log(warehouses);
  useEffect(() => {
    localStorage.setItem("selectedSupplier", selectedSupplier);
  }, [selectedSupplier]);

  const [step, setStep] = useState(1);

  const handlePesan = () => {
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Pilih barang yang ingin dipesan terlebih dahulu.",
      });
      return;
    }
    setStep(2);
  };

  const previous = () => {
    setStep(step - 1);
  };

  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const handleSelectWarehouse = (event) => {
    setErrors((prevErrors) => ({ ...prevErrors, warehouse: "" }));
    const selectedValue = event.target.value;
    setSelectedWarehouse(selectedValue);
  };

  const [poName, setPoName] = useState();
  const handleChangePoName = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, po_name: "" }));
    setPoName(e.target.value);
  };

  const [errors, setErrors] = useState({});

  const getData = JSON.parse(localStorage.getItem("selectedItems")) || [];
  const handleStepPage = () => (
    <div>
      {step === 1 ? (
        <div>
          <DatatableWithPaginate
            columns={columns}
            endpoint={"/purchase/get-barang-supplier"}
          />
        </div>
      ) : (
        <RincianPembelianPage
          previous={previous}
          warehouse={selectedWarehouse}
          po={poName}
          data={getData}
          setErrors={setErrors}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Purchase" icon={faTag} />
            <div className="bg-blue-100 mb-5 ">
              <div className="grid gap-5 md:grid-cols-3 rounded-b-md px-10 py-5">
                <div className="flex w-full flex-col">
                  <label className="font-bold mb-2">Supplier</label>
                  <input
                    className="input input-bordered rounded-md input-primary"
                    placeholder="Supplier"
                    value={selectedSupplier}
                    readOnly
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="font-bold mb-2">Tanggal Pemesanan</label>
                  <input
                    type="date"
                    readOnly
                    value={tanggalPemesanan}
                    className="input input-bordered rounded-md input-primary"
                    placeholder="Tanggal Pemesanan"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="font-bold mb-2">Warehouse</label>
                  <select
                    onChange={handleSelectWarehouse}
                    className="select select-bordered w-full rounded-md select-primary"
                  >
                    <option disabled selected>
                      Pilih Warehouse
                    </option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </select>
                  {errors.warehouse && (
                    <span className="text-red-500">{errors.warehouse}</span>
                  )}
                </div>
              </div>
              {step === 2 ? (
                <div className="flex px-10 pb-5 flex-col">
                  <label className="font-bold mb-2">PO Name</label>
                  <input
                    onChange={(e) => handleChangePoName(e)}
                    className={`w-full input input-bordered input-primary rounded-md ${
                      errors.po_name ? "input-error" : ""
                    }`}
                  />
                  {errors.po_name && (
                    <span className="text-red-500">{errors.po_name}</span>
                  )}
                </div>
              ) : (
                ""
              )}
              <div
                className={`flex w-full justify-end px-5 pb-5 ${
                  step === 2 ? "hidden" : ""
                }`}
              >
                <button
                  onClick={handlePesan}
                  className="bg-primary btn hover:bg-primary text-white"
                >
                  <p className="font-bold text-lg">Pesan Sekarang </p>
                  <div className="badge badge-info text-white"> {count} </div>
                </button>
              </div>
            </div>
            {handleStepPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchasePage;
