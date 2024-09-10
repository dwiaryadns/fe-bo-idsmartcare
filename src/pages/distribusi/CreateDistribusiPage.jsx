import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faBagShopping, faSave } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { DatatableWithPaginate } from "../../components/Datatable";
import axiosInstance from "../../dummy/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

export const CreateDistribusiPage = () => {
  const [quantities, setQuantities] = useState({});

  const handleIncrement = (barangId, maxStock) => {
    setQuantities((prev) => {
      const currentQuantity = prev[barangId] || 0;
      if (currentQuantity < maxStock) {
        const newQuantity = currentQuantity + 1;
        updateDetails(barangId, newQuantity); // Memperbarui detail setelah kuantitas berubah
        return { ...prev, [barangId]: newQuantity };
      }
      return prev;
    });
  };

  const handleDecrement = (barangId) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[barangId] || 0) - 1, 0);
      updateDetails(barangId, newQuantity);
      return { ...prev, [barangId]: newQuantity };
    });
  };

  const handleQuantityChange = (barangId, value) => {
    let parsedValue = parseInt(value, 10);

    if (value.startsWith("0")) {
      parsedValue = parseInt(value.slice(1), 10);
    }

    if (value === "" || isNaN(parsedValue) || parsedValue < 0) {
      parsedValue = 0;
    }

    setQuantities((prev) => ({
      ...prev,
      [barangId]: parsedValue,
    }));

    updateDetails(barangId, parsedValue);
  };

  const updateDetails = useCallback((barangId, quantity) => {
    setDetails((prevDetails) => {
      const existingDetailIndex = prevDetails.findIndex(
        (detail) => detail.barang_id === barangId
      );

      if (existingDetailIndex !== -1) {
        const newDetails = [...prevDetails];
        newDetails[existingDetailIndex] = {
          ...newDetails[existingDetailIndex],
          jumlah: quantity,
        };
        return newDetails;
      } else {
        return [...prevDetails, { barang_id: barangId, jumlah: quantity }];
      }
    });
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Distribusi ID",
        accessor: "stock_gudang_id",
      },
      {
        Header: "Barang",
        accessor: "barang.nama_barang",
      },
      {
        Header: "Stok",
        accessor: "stok",
      },
      {
        Header: "Jumlah yang di distribusi",
        accessor: "jumlah_distribusi",
        Cell: ({ row }) => (
          <div className="flex flex-row justify-start">
            <button
              className="btn btn-sm rounded-r-none rounded-l-md btn-primary"
              onClick={() => handleDecrement(row.original.barang.barang_id)}
            >
              -
            </button>
            <input
              type="number"
              className="input input-bordered input-primary input-sm rounded-none max-w-20 text-center"
              value={quantities[row.original.barang.barang_id] || 0}
              onChange={(e) =>
                handleQuantityChange(
                  row.original.barang.barang_id,
                  e.target.value
                )
              }
            />
            <button
              className="btn btn-sm rounded-l-none rounded-r-md btn-primary"
              onClick={() =>
                handleIncrement(
                  row.original.barang.barang_id,
                  row.original.stok
                )
              }
            >
              +
            </button>
          </div>
        ),
      },
    ],
    [quantities]
  );

  const [warehouse, setWarehouse] = useState([]);
  const [fasyankes, setFasyankes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleSelectWarehouse = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedWarehouse(selectedId);

    const selectedWh = warehouse.find((wh) => wh.id === selectedId);
    if (selectedWh) {
      setFasyankes(selectedWh.fasyankes);
    }
  };

  const [selectedFasyankes, setSelectedFasyankes] = useState(null);
  const handleSelectFasyankes = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedFasyankes(selectedId);
  };

  const [details, setDetails] = useState([]);
  // const handleDetailChange = useCallback((barangId, value) => {
  //   setDetails((prevDetails) => {
  //     const existingDetail = prevDetails.find(
  //       (detail) => detail.barang_id === barangId
  //     );
  //     if (existingDetail) {
  //       return prevDetails.map((detail) =>
  //         detail.barang_id === barangId ? { ...detail, jumlah: value } : detail
  //       );
  //     } else {
  //       return [...prevDetails, { barang_id: barangId, jumlah: value }];
  //     }
  //   });
  // }, []);

  const navigate = useNavigate();
  const handleSave = async () => {
    setLoading(true);
    const payload = {
      warehouse_id: selectedWarehouse,
      fasyankes_id: selectedFasyankes,
      status: "Pending",
      keterangan: "",
      details: details.filter((detail) => detail.jumlah > 0),
    };
    console.log(payload);

    try {
      const response = await axiosInstance.post("/distribusi/store", payload);
      if (response.data.status === true) {
        setLoading(false);
        ToastAlert("success", response.data.message);
        navigate("/distribusi");
      }
    } catch (error) {
      setLoading(false);
      ToastAlert("error", error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchWarehouse = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/warehouses");
        setWarehouse(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, []);

  const params = useMemo(
    () => ({ warehouse_id: selectedWarehouse }),
    [selectedWarehouse]
  );

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Create Distribusi" icon={faBagShopping} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
                  <div>
                    <label className="font-bold">Dari Gudang</label>
                    <select
                      onChange={handleSelectWarehouse}
                      className="select select-bordered w-full rounded-md select-primary"
                    >
                      <option selected hidden>
                        Pilih Gudang
                      </option>
                      {warehouse.map((wh, index) => (
                        <option key={index} value={wh.id}>
                          {wh.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold">Ke Fasyankes</label>
                    <select
                      onChange={handleSelectFasyankes}
                      className="select select-bordered w-full rounded-md select-primary"
                    >
                      <option selected hidden>
                        Pilih Fasyankes
                      </option>
                      {fasyankes.map((fasy, index) => (
                        <option key={index} value={fasy.fasyankesId}>
                          {fasy.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <hr className="my-2" />
                <div>
                  {selectedWarehouse && (
                    <div>
                      <DatatableWithPaginate
                        columns={columns}
                        endpoint="/distribusi/get-barang"
                        params={params}
                      />
                      <div className="flex justify-end mt-4">
                        <button
                          disabled={loading}
                          onClick={handleSave}
                          className="btn bg-primary hover:bg-primary text-white rounded-md"
                        >
                          {loading ? (
                            <Loading type={"bars"} size={"md"} />
                          ) : (
                            <span>
                              <FontAwesomeIcon icon={faSave} /> Simpan
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
