import {
  faCheck,
  faClone,
  faFilePdf,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../dummy/const";
import axios from "axios";
import Swal from "sweetalert2";

export const ModalPayNow = ({ id, qr, type, va, amount, refreshData }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const [isCopy, setIsCopy] = useState(false);
  const handlePayment = () => {
    navigate("/subscription");
    window.location.reload();
    modalRef.current.close();
  };

  const handleCopy = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  return (
    <div>
      <dialog id={id} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-lg px-10">
          <form method="dialog">
            {type === "qris" ? (
              <div>
                <div className="flex justify-between mt-10 items-center text-md border-b-2">
                  <p>Total Pembayaran</p>
                  <p>{amount}</p>
                </div>
                <div className="flex justify-between mt-5 items-center text-md border-b-2">
                  <p>Jatuh Tempo</p>
                  <p>23 Jam 15 Menit 5 Detik</p>
                </div>
                <div className="flex flex-col justify-center">
                  <img className="w-72 self-center" src={qr} />
                </div>
              </div>
            ) : (
              <div>
                <div className="">
                  <div className="flex justify-between mt-10 items-center text-md border-b-2">
                    <p>Total Pembayaran</p>
                    <p>{amount}</p>
                  </div>
                  <div className="flex justify-between mt-5 items-center text-md border-b-2">
                    <p>Jatuh Tempo</p>
                    <p>23 Jam 15 Menit 5 Detik</p>
                  </div>
                  <div className="flex justify-between mt-10 items-center mb-10">
                    <div> Kode Pembayaran</div>
                    <div className="flex gap-4 items-center">
                      <p className="text-lg">{va}</p>
                      <div
                        className={`${
                          isCopy ? "tooltip tooltip-open" : ""
                        }  tooltip-top`}
                        data-tip="Copied!"
                      >
                        <div
                          className={` transition duration-300 ease-in-out ${
                            isCopy ? " text-green-500" : "text-primary"
                          }`}
                          onClick={() => {
                            window.navigator.clipboard.writeText(va);
                            handleCopy();
                          }}
                        >
                          {isCopy ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-lg"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faClone}
                              className="cursor-pointer text-lg"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn bg-primary hover:bg-primary text-white btn-block rounded-md mb-0"
              onClick={handlePayment}
            >
              OK
            </button>
            <p className="text-center text-xs mt-1">
              Jika kamu sudah melakukan Pembayaran Click OK
            </p>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export const ModalDetailSupplier = ({ supplierId, data }) => {
  const modalRef = useRef();

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (value, field) => {
    window.navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 3000);
    });
  };

  const renderCopyIcon = (field, value) => (
    <div
      className={`tooltip ${
        copiedField === field ? "tooltip-open" : ""
      } tooltip-top`}
      data-tip="Copied!"
    >
      <div
        className={`transition duration-300 ease-in-out ${
          copiedField === field ? "text-green-500" : "text-primary"
        }`}
        onClick={() => handleCopy(value, field)}
      >
        {copiedField === field ? (
          <FontAwesomeIcon icon={faCheck} className="text-lg" />
        ) : (
          <FontAwesomeIcon icon={faClone} className="cursor-pointer text-lg" />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <dialog id={supplierId} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-5xl px-10 text-lg">
          <div className="flex justify-between bg-primary text-white rounded-md p-4 items-center text-md border-b-2">
            <p>Detail Supplier ( {data.supplier_id} )</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table text-lg">
              <tbody>
                <tr>
                  <td>Nama Supplier</td>
                  <td>{data.nama}</td>
                </tr>
                <tr>
                  <td>Tipe Supplier</td>
                  <td>{data.tipe}</td>
                </tr>
                <tr>
                  <td>Alamat Supplier</td>
                  <td>
                    {data.alamat}, {data.desa}, {data.kecamatan}, {data.kota},{" "}
                    {data.provinsi}, {data.kode_pos}
                  </td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>{data.website}</td>
                </tr>
                <tr>
                  <td>NPWP</td>
                  <td>{data.npwp}</td>
                </tr>
                <tr>
                  <td>Kontak</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.telp}
                      {renderCopyIcon("telp", data.telp)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.pic_email}
                      {renderCopyIcon("pic_email", data.pic_email)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Nama PIC</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.pic_name}
                      {renderCopyIcon("pic_name", data.pic_name)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Kontak PIC</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.pic_contact}
                      {renderCopyIcon("pic_contact", data.pic_contact)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Tanggal Kerjasama</td>
                  <td>
                    {data.start_pks_date} s.d. {data.end_pks_date}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export const ModalDetailWarehouse = ({ warehouse, fasyankes }) => {
  const modalRef = useRef();

  return (
    <div>
      <dialog id={warehouse} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-2xl px-10 text-lg">
          <div className="flex justify-between bg-primary text-white rounded-md p-4 items-center text-md border-b-2">
            {warehouse}
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Fasyankes</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {fasyankes.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                  </tr>
                ))}
                {fasyankes.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Belum ada Fasyankes terdaftar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

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

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
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
            <p className="font-bold ">List Good Receipt Note</p>
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
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Barang</th>
                      <th>Jumlah Beli</th>
                      <th className="text-center">Jumlah Datang</th>
                      <th>Jumlah Kurang</th>
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
                          <div className="flex flex-row justify-center">
                            <button
                              className="btn btn-sm rounded-r-none rounded-l-md btn-primary"
                              onClick={() => handleDecrement(index)}
                            >
                              -
                            </button>
                            <input
                              className="input input-bordered rounded-none input-sm max-w-20 text-center"
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
                              className="btn btn-sm rounded-l-none rounded-r-md btn-primary"
                              onClick={() => handleIncrement(index)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{receipt.jml_kurang}</td>
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
              </div>
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
export const ModalDetailPurchase = ({ poId, data, total }) => {
  const modalRef = useRef();
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <div>
      <dialog id={poId} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-5xl px-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Produk</th>
                    <th>Kuantitas</th>
                    <th>Catatan</th>
                    <th>Harga</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((detail, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{detail.barang.nama_barang}</td>
                      <td>{detail.jumlah}</td>
                      <td>{detail.notes}</td>
                      <td>{formatRupiah(detail.harga_satuan)}</td>
                      <td>{formatRupiah(detail.total_harga)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-right italic font-bold">
                      Total
                    </td>
                    <td> {formatRupiah(total)} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export const ModalOpname = ({ id, barang }) => {
  const modalRef = useRef();
  const [check, setCheck] = useState(false);
  // const [physicalStock, setPhysicalStock] = useState("");

  const handleCheckbox = () => {
    setCheck(!check);
  };

  // const handlePhysicalStockChange = (e) => {
  //   const inputValue = e.target.value;
  //   if (
  //     inputValue === "" ||
  //     (Number(inputValue) >= 0 && Number(inputValue) <= barang.stok)
  //   ) {
  //     setPhysicalStock(inputValue);
  //   }
  // };

  const [petugas, setPetugas] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const [jumlahFisik, setJumlahFisik] = useState(0);
  const [jumlahPenyesuaian, setJumlahPenyesuaian] = useState("");
  const handleJumlahFisik = (e) => {
    setJumlahFisik(e.target.value);
    setJumlahPenyesuaian(e.target.value - barang.stok);
  };
  const handleChangePetugas = (e) => {
    setPetugas(e.target.value);
  };
  const handleChangeKeterangan = (e) => {
    setKeterangan(e.target.value);
  };
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleSubmit = async () => {
    const payload = {
      petugas: petugas,
      barang_id: barang.barang.barang_id,
      keterangan: keterangan,
      jml_tercatat: barang.stok,
      jml_fisik: jumlahFisik,
      jml_penyesuaian: jumlahPenyesuaian,
      stock_gudang_id: barang.stock_gudang_id ? barang.stock_gudang_id : null,
      stok_barang_id: barang.stok_barang_id ? barang.stok_barang_id : null,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/stok-opname/store`,
        payload,
        headers
      );
      if (response.data.status === true) {
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
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan stok opname",
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
  };
  return (
    <div>
      <dialog id={id} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-6xl px-10 text-lg">
          <div className="flex justify-center bg-primary text-white rounded-md p-4 text-wrap items-center text-md border-b-2">
            Stok Opname; {barang.barang.nama_barang} -{" "}
            {barang.fasyankes_warehouse != undefined
              ? barang.fasyankes_warehouse.fasyankes.name
              : barang.warehouse.name}
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Nama Pertugas</th>
                  <th>Jumlah Tercatat</th>
                  <th>Jumlah Fisik</th>
                  <th>Jumlah Penyesuaian</th>
                  <th>Keterangan</th>
                  <th>Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Nama Petugas"
                      onChange={handleChangePetugas}
                      value={petugas}
                      className="input input-bordered input-sm rounded-md"
                    />
                  </td>
                  <td>
                    {barang.stok} {barang.barang.satuan}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={jumlahFisik}
                        onChange={handleJumlahFisik}
                        className="input max-w-16 input-bordered input-sm rounded-md"
                      />{" "}
                      {barang.barang.satuan}
                    </div>
                  </td>
                  <td>
                    {jumlahPenyesuaian} {barang.barang.satuan}
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Keterangan"
                      onChange={handleChangeKeterangan}
                      value={keterangan}
                      className="input input-bordered input-sm rounded-md"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      defaultChecked={check}
                      className="checkbox rounded-md checkbox-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!check}
              className="btn bg-primary text-white hover:bg-primary btn-sm mt-5 rounded-md"
            >
              Opname
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
