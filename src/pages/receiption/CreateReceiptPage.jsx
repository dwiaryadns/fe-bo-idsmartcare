import {
  faChevronDown,
  faReceipt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const CreateReceiptPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [conditions, setConditions] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const Toast = Swal.mixin({
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
  const handleClickSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/good-receipt/search`, {
        params: { po_id: search },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const updatedData = response.data.data;
      updatedData.barangs = updatedData.barangs.map((barang) => ({
        ...barang,
        barangDatang: barang.barangDatang || 0,
        jml_kekurangan: barang.qty - (barang.barangDatang || 0),
      }));

      setData(updatedData);
      setStep(2);
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (error) {
      setStep(1);
      if (error.response) {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
      setData([]);
    }
  };

  const handleChangeStatus = (index, val) => {
    setStatus((prevStatus) => {
      const newStatus = { ...prevStatus };
      newStatus[index] = val;
      return newStatus;
    });
  };

  const handleBarangDatangChange = (index, value) => {
    setData((prevData) => {
      const newData = { ...prevData };
      const barang = newData.barangs[index];
      const barangDatang = Math.max(
        0,
        Math.min(barang.qty, Number(value) || 0)
      );
      barang.barangDatang = barangDatang;
      barang.jml_kekurangan = barang.qty - barangDatang;
      return newData;
    });
  };

  const handleIncrement = (index) => {
    const barangDatang = data.barangs[index].barangDatang || 0;
    handleBarangDatangChange(index, barangDatang + 1);
  };

  const handleDecrement = (index) => {
    const barangDatang = data.barangs[index].barangDatang || 0;
    handleBarangDatangChange(index, barangDatang - 1);
  };

  const handleChangeCondition = (index, value) => {
    setConditions((prevConditions) => {
      const newConditions = { ...prevConditions };
      newConditions[index] = value;
      return newConditions;
    });
  };

  const [penerima, setPenerima] = useState();
  const [pengirim, setPengirim] = useState();
  const [pengecek, setPengecek] = useState();
  const [tanggal, setTanggal] = useState();
  const [note, setNote] = useState("");
  const [error, setError] = useState({});

  const handleChangeNote = (e) => {
    setNote(e.target.value);
    setError((prevError) => ({ ...prevError, note: "" }));
  };
  const handleChangePenerima = (e) => {
    setPenerima(e.target.value);
    setError((prevError) => ({ ...prevError, penerima: "" }));
  };

  const handleChangePengirim = (e) => {
    setPengirim(e.target.value);
    setError((prevError) => ({ ...prevError, pengirim: "" }));
  };

  const handleChangePengecek = (e) => {
    setPengecek(e.target.value);
    setError((prevError) => ({ ...prevError, pengecek: "" }));
  };

  const handleChangeTanggal = (e) => {
    const inputDate = e.target.value;
    const maxDate = new Date().toISOString().split("T")[0];
    const minDate = getTenYearsAgoDate();

    if (inputDate > maxDate) {
      setTanggal(maxDate);
    } else if (inputDate < minDate) {
      setTanggal(maxDate);
    } else {
      setTanggal(inputDate);
    }
    setError((prevError) => ({ ...prevError, tanggal: "" }));
  };

  const handleSave = async () => {
    const payload = {
      po_id: data.po_id,
      warehouse: data.warehouse,
      wfid: data.wfid,
      penerima: penerima,
      pengirim: pengirim,
      pengecek: pengecek,
      tanggal: tanggal,
      note: note,
      barangs: data.barangs.map((barang, index) => ({
        barang_id: barang.barang_id,
        nama: barang.nama,
        qty: barang.qty,
        barangDatang: barang.barangDatang,
        jml_kekurangan: barang.jml_kekurangan,
        status: status[index],
        kondisi: conditions[index],
      })),
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/good-receipt/save`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      Toast.fire({
        icon: "success",
        title: response.data.message,
      });

      navigate("/good-receipt");
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.errors;
        setError(errors);
        console.log(error);
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
    }
  };

  const detailPembelian = () => {
    return (
      <div className="bg-slate-100 rounded-md">
        <div className="flex flex-col items-center">
          <div className="collapse bg-blue-100">
            <input type="checkbox" checked={isOpen} onChange={toggleOpen} />
            <div
              className="collapse-title text-xl font-medium flex justify-between items-center place-items-center cursor-pointer"
              onClick={toggleOpen}
            >
              <p className=" font-bold text-lg text-center">Detail Pembelian</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 transform ${
                  isOpen ? "rotate-0" : "rotate-90"
                }`}
              />
            </div>
            {isOpen && (
              <div className="collapse-content">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>PO ID</th>
                      <td>{data.po_id}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Pembelian</th>
                      <td>{data.tanggal_po}</td>
                    </tr>
                    <tr>
                      <th>Supplier</th>
                      <td>{data.supplier}</td>
                    </tr>
                    <tr>
                      <th>Warehouse</th>
                      <td>{data.warehouse}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getTenYearsAgoDate = () => {
    const today = new Date();
    const tenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 10));
    return tenYearsAgo.toISOString().split("T")[0];
  };

  const detailPenerimaan = () => {
    return (
      <div className="mt-5">
        <div className="flex flex-col">
          <p className="mb-3 font-bold text-lg">Detail Penerimaan</p>
          <div className="grid md:grid-cols-4 gap-5">
            <div className="pb-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold text-base">
                    Nama Penerima <span className="text-red-800">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered rounded-md ${
                    error.penerima ? "input-error" : ""
                  }`}
                  placeholder="Nama Penerima"
                  value={penerima}
                  onChange={handleChangePenerima}
                />
                {error.penerima && (
                  <div className="text-xs text-error">{error.penerima}</div>
                )}
              </label>
            </div>
            <div className="pb-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold text-base">
                    Nama Pengirim <span className="text-red-800">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered rounded-md ${
                    error.pengirim ? "input-error" : ""
                  }`}
                  placeholder="Nama Pengirim"
                  value={pengirim} // value diambil dari state pengirim
                  onChange={handleChangePengirim} // onChange menggunakan fungsi handleChangePengirim
                />
                {error.pengirim && (
                  <div className="text-xs text-error">{error.pengirim}</div>
                )}
              </label>
            </div>
            <div className="pb-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold text-base">
                    Nama Pengecek <span className="text-red-800">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered rounded-md ${
                    error.pengecek ? "input-error" : ""
                  }`}
                  placeholder="Nama Pengecek"
                  value={pengecek} // value diambil dari state pengecek
                  onChange={handleChangePengecek} // onChange menggunakan fungsi handleChangePengecek
                />
                {error.pengecek && (
                  <div className="text-xs text-error">{error.pengecek}</div>
                )}
              </label>
            </div>
            <div className="pb-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold text-base">
                    Tanggal Penerimaan <span className="text-red-800">*</span>
                  </span>
                </div>
                <input
                  type="date"
                  className={`input input-bordered rounded-md ${
                    error.tanggal ? "input-error" : ""
                  }`}
                  placeholder="Tanggal Penerimaan"
                  value={tanggal} // value diambil dari state tanggal
                  onChange={handleChangeTanggal} // onChange menggunakan fungsi handleChangeTanggal
                  max={new Date().toISOString().split("T")[0]}
                  min={getTenYearsAgoDate()}
                />
                {error.tanggal && (
                  <div className="text-xs text-error">{error.tanggal}</div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const detailBarang = () => {
    return (
      <div className="overflow-x-auto">
        <div className="card bg-white rounded-md shadow-md">
          <div className="card-body">
            <p className="mb-3 font-bold text-lg">Detail Barang</p>
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Wajib diisi! Jika kosong berikan tanda{" "}
                <span className="font-extrabold"> {" - "} </span>{" "}
              </span>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Jumlah Pembeliaan</th>
                  <th>Barang Datang</th>
                  <th>Jumlah Kekurangan</th>
                  <th>Action</th>
                  <th>Kondisi</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.barangs &&
                  data.barangs.map((barang, index) => (
                    <tr key={index}>
                      <td>{barang.nama}</td>
                      <td>{barang.qty}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDecrement(index)}
                        >
                          -
                        </button>
                        <input
                          className="input input-sm max-w-14 text-center rounded-md input-bordered"
                          type="text"
                          value={barang.barangDatang || 0}
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
                      <td>{barang.jml_kekurangan}</td>
                      <td>
                        <div>
                          <button
                            onClick={() =>
                              handleChangeStatus(index, "Received")
                            }
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
                          <span className="text-red-500">
                            <div className="text-xs text-error"></div>
                          </span>
                        </div>
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
            <div className="mt-5">
              <textarea
                className={`textarea resize-none rounded-md textarea-bordered w-full`}
                placeholder="Note"
                onChange={(e) => handleChangeNote(e)}
              ></textarea>
            </div>
            <div className=" justify-end flex mt-5">
              <button
                onClick={handleSave}
                className="btn self-end bg-primary hover:bg-primary text-white px-10 rounded-md"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-row w-full ">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Good Receipt" icon={faReceipt} />
            <div className="pb-44">
              <div className="flex items-center justify-center my-5">
                <label className="input input-bordered rounded-md input-primary md:w-5/12 flex items-center gap-2">
                  <input
                    type="text"
                    onChange={handleSearchChange}
                    className="grow"
                    placeholder="Search by PO ID"
                  />
                  <FontAwesomeIcon
                    onClick={handleClickSearch}
                    className="hover:cursor-pointer"
                    icon={faSearch}
                  />
                </label>
              </div>
              {step == 2 ? (
                <div>
                  {detailPembelian()}
                  {detailPenerimaan()}
                  <hr className="my-10"></hr>
                  {detailBarang()}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
