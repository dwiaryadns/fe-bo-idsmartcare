import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faBagShopping, faSave } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { DatatableWithPaginate } from "../../components/Datatable";
import axiosInstance from "../../dummy/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const CreateDistribusiPage = () => {
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
          <input
            type="text"
            content="numeric"
            className="input input-bordered input-primary input-sm rounded-md"
            onChange={(e) =>
              handleDetailChange(row.original.barang.barang_id, e.target.value)
            }
          />
        ),
      },
    ],
    []
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
  const handleDetailChange = useCallback((barangId, value) => {
    setDetails((prevDetails) => {
      const existingDetail = prevDetails.find(
        (detail) => detail.barang_id === barangId
      );
      if (existingDetail) {
        return prevDetails.map((detail) =>
          detail.barang_id === barangId ? { ...detail, jumlah: value } : detail
        );
      } else {
        return [...prevDetails, { barang_id: barangId, jumlah: value }];
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleSave = async () => {
    const payload = {
      warehouse_id: selectedWarehouse,
      fasyankes_id: selectedFasyankes,
      status: "Pending",
      keterangan: "",
      details: details.map((detail) => ({
        barang_id: detail.barang_id,
        jumlah: detail.jumlah,
      })),
    };
    console.log(payload);

    try {
      const response = await axiosInstance.post("/distribusi/store", payload);
      if (response.data.status === true) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/distribusi");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
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
                <div className="overflow-x-auto table-pin-rows">
                  {selectedWarehouse && (
                    <div>
                      <DatatableWithPaginate
                        columns={columns}
                        endpoint="/distribusi/get-barang"
                        params={params}
                      />
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleSave}
                          className="btn bg-primary hover:bg-primary text-white rounded-md"
                        >
                          <FontAwesomeIcon icon={faSave} /> Simpan
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
