import {
  faChevronCircleLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const RincianPembelianPage = ({
  previous,
  data,
  po,
  warehouse,
  setErrors,
}) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(data.map(() => 1));
  const [descriptions, setDescriptions] = useState(data.map(() => ""));

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    let parsedValue = parseInt(value, 10);

    if (value.startsWith("0")) {
      parsedValue = parseInt(value.slice(1), 10);
    }

    if (value === "" || isNaN(parsedValue) || parsedValue <= 0) {
      newQuantities[index] = 0;
    } else {
      newQuantities[index] = parsedValue;
    }

    setQuantities(newQuantities);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const calculateSubtotal = (harga, quantity) => {
    return harga * quantity;
  };

  const calculateTotal = () => {
    return data.reduce((total, barang, index) => {
      return (
        total + calculateSubtotal(barang.barang.harga_beli, quantities[index])
      );
    }, 0);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleSave = async () => {
    const payload = {
      barang: data.map((barang, index) => ({
        barang_id: barang.barang_id,
        qty: quantities[index],
        notes: descriptions[index],
      })),
      warehouse_id: warehouse,
      supplier_id: data[0].supplier_id,
      po_name: po,
      total: calculateTotal(),
    };

    const token = localStorage.getItem("token");
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.post(
        API_BASE_URL + "/purchase/store",
        payload,
        headers
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        navigate(`/purchase`);
        localStorage.removeItem("selectedSupplier");
        localStorage.removeItem("selectedItems");
      } else {
        Swal.fire({
          icon: "error",
          title: "Data gagal disimpan",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
    } catch (error) {
      console.log(error);
      setErrors({
        warehouse: error.response.data.errors.wfid,
        po_name: error.response.data.errors.po_name,
      });
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama Produk</th>
              <th className=" text-center">Kuantitas</th>
              <th>Harga Jual</th>
              <th>Subtotal</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((barang, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{barang.barang.nama_barang}</td>
                <td>
                  <div className="flex flex-row justify-center">
                    <button
                      className="btn btn-sm rounded-r-none rounded-l-md btn-primary"
                      onClick={() => handleDecrement(index)}
                    >
                      -
                    </button>
                    <input
                      className="input input-bordered rounded-none input-sm max-w-20 text-center"
                      type="number"
                      min="0" // Allow zero value
                      value={quantities[index]}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                    <button
                      className="btn btn-sm rounded-l-none rounded-r-md btn-primary"
                      onClick={() => handleIncrement(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{formatRupiah(barang.barang.harga_beli)}</td>
                <td>
                  {formatRupiah(
                    calculateSubtotal(
                      barang.barang.harga_beli,
                      quantities[index]
                    )
                  )}
                </td>
                <td>
                  <input
                    className="input input-bordered rounded-md"
                    value={descriptions[index]}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="text-right">
                <span className="italic font-bold">Total</span>
              </td>
              <td className="font-bold">{formatRupiah(calculateTotal())}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-10 mb-10">
        <button
          onClick={previous}
          className="bg-primary hover:bg-primary text-white btn"
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} className="text-lg" />
          Previous
        </button>
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary text-white btn px-10"
        >
          Pesan
          <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
        </button>
      </div>
    </div>
  );
};
