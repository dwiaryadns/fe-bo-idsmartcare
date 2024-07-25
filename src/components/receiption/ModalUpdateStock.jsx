import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL, headers } from "../../dummy/const";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export const ModalUpdateStock = ({ grn_id, data, file_grn }) => {
  const modalRef = useRef();

  const [conditions, setConditions] = useState("");

  const handleChangeCondition = (index, value) => {
    setConditions((prevConditions) => {
      const newConditions = { ...prevConditions };
      newConditions[index] = value;
      return newConditions;
    });
  };
  useEffect(() => {
    setDatas(data);
  }, [data]);

  const [datas, setDatas] = useState([]);

  const handleBarangDatangChange = (index, value) => {
    setDatas((prevData) => {
      const newData = [...prevData];
      const barang = newData[index];
      const barangDatang = Math.max(
        0,
        Math.min(barang.jumlah, Number(value) || 0)
      );

      barang.jml_datang = barangDatang;
      barang.jml_kurang = barang.jumlah - barangDatang;
      return newData;
    });
  };

  const handleIncrement = (index) => {
    const barangDatang = datas[index].jml_datang || 0;
    handleBarangDatangChange(index, barangDatang + 1);
  };

  const handleDecrement = (index) => {
    const barangDatang = datas[index].jml_datang || 0;
    handleBarangDatangChange(index, barangDatang - 1);
  };
  const [status, setStatus] = useState("");
  const handleChangeStatus = (index, val) => {
    setStatus((prevStatus) => {
      const newStatus = { ...prevStatus };
      newStatus[index] = val;
      return newStatus;
    });
  };

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const payload = {
      barangs: datas.map((barang, index) => ({
        detil_penerimaan_id: barang.detil_penerimaan_id,
        penerimaan_id: barang.penerimaan_id,
        nama: barang.barang.nama_barang,
        qty: barang.jumlah,
        barang_id: barang.barang_id,
        jml_datang: barang.jml_datang,
        jml_kurang: barang.jml_kurang,
        // status: status[index],
        kondisi: conditions[index],
      })),
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/good-receipt/update`,
        payload,
        headers
      );
      console.log(response);
      setLoading(false);
      if (response.data.status === true) {
        window.location.reload();
        modalRef.current.close();
        Swal.fire({
          icon: "success",
          title: response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <dialog id={grn_id} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-7xl md:min-h-20 px-10">
          <div className="bg-primary rounded-md p-5 text-white">
            <p>{grn_id}</p>
          </div>
          <div className="p-5 rounded-md">
            <p className="font-bold ">List GRN</p>
            <hr className="mb-3"></hr>
            {file_grn.map((grn, index) => (
              <div className="text-lg my-2" key={index}>
                <div className="grid md:grid-cols-3 justify-start items-start">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      className="text-red-700"
                      icon={faFilePdf}
                    />
                    {grn.url_file === null || grn.url_file === "" ? (
                      <p className="text-sm ml-1">Sedang dalam proses...</p>
                    ) : (
                      <a
                        className="text-sm underline ml-1"
                        href={grn.url_file}
                        target="_blank"
                        key={index}
                      >
                        {grn.grn_id}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : data.length >= 1 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Jumlah Beli</th>
                    <th>Jumlah Datang</th>
                    <th>Jumlah Kurang</th>
                    <th>Status</th>
                    <th>Kondisi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((receipt, index) => (
                    <tr key={index}>
                      <td>{receipt.detil_penerimaan_id}</td>
                      <td>{receipt.barang.nama_barang}</td>
                      <td>{receipt.jumlah}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDecrement(index)}
                        >
                          -
                        </button>
                        <input
                          className="input text-center input-sm max-w-14 rounded-md input-bordered"
                          type="text"
                          value={receipt.jml_datang || 0}
                          onChange={(e) =>
                            handleBarangDatangChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <button
                          className="btn btn-sm"
                          onClick={() => handleIncrement(index)}
                        >
                          +
                        </button>
                      </td>
                      <td>{receipt.jml_kurang}</td>
                      <td>
                        <button
                          onClick={() => handleChangeStatus(index, "Received")}
                          className={`btn btn-sm ${
                            status[index] === "Received"
                              ? "bg-primary hover:bg-primary text-white"
                              : ""
                          }`}
                        >
                          Received
                        </button>
                        <button
                          onClick={() => handleChangeStatus(index, "Retur")}
                          className={`btn btn-sm ${
                            status[index] === "Retur"
                              ? "bg-primary hover:bg-primary text-white"
                              : ""
                          }`}
                        >
                          Retur
                        </button>
                      </td>
                      <td>
                        <input
                          className="input input-bordered rounded-md"
                          type="text"
                          placeholder="Kondisi"
                          value={conditions[index] || ""}
                          onChange={(e) =>
                            handleChangeCondition(index, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end ">
                <button
                  onClick={handleUpdate}
                  className="btn bg-primary hover:bg-primary text-white mt-10"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {loading ? (
          ""
        ) : (
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        )}
      </dialog>
    </div>
  );
};
