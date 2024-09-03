import {
  faBox,
  faFileExcel,
  faInfoCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import templateExcel from "../../dummy/Template-Data-Obat.xlsx";
import { ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

export const ImportBarangPage = () => {
  const lists = [
    "Edit file Excel dengan memasukkan data berupa informasi barang, seperti kode produk, tipe produk, nama produk, dan harga beli.",
    "Pastikan format Excel tidak diubah agar sistem idSmartCare tetap dapat mengenali file tersebut.",
    "File Excel yang akan di import hanya maksimal sebesar 2 Mb.",
    "Jika anda ingin melakukan Import dengan data yang banyak dan menggunakan file besar, harap melakukan import file bertahap untuk menghindari terjadinya kegagalan upload file Excel.",
    "Jika produk sudah terdaftar dalam sistem idSmartCare, proses impor melalui Excel akan gagal untuk mencegah terjadinya duplikasi produk.",
    "Jika Anda mengalami kendala atau menemukan Bug dalam melakukan import data melalui Excel, harap untuk menghubungi tim support kami.",
    "Harap unduh file Excel di bawah ini untuk melihat format yang dapat dikenali oleh sistem idSmartCare.",
  ];
  const [file, setFile] = useState(null);
  const [importedData, setImportedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [errors, setErrors] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [isShow, setIsShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      setLoading(false);
      ToastAlert("warning", "Silakan pilih file untuk diunggah.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/inventory/import-barang`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.errors && response.data.errors.length > 0) {
        setErrors(response.data.errors);
        ToastAlert(
          "warning",
          "Import Gagal dengan beberapa error. Silakan periksa detail di bawah."
        );
      } else {
        setImportedData(response.data.data);
        ToastAlert("success", "Import Berhasil");
      }
      setIsShow(true);
      setLoading(false);
    } catch (error) {
      console.error("Import error:", error);
      setIsShow(false);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        if (error.response.status == 422) {
          ToastAlert("warning", error.response.data.message);
        } else {
          ToastAlert(
            "error",
            "Import Gagal. Silakan periksa detail error di bawah."
          );
        }
      } else {
        ToastAlert(
          "error",
          "Import Gagal. Terjadi kesalahan yang tidak terduga."
        );
      }
      setLoading(false);
    }
  };

  return (
    <Layout title={"Import Barang"} icon={faBox}>
      <div className="card mt-3">
        <div className="card-body shadow-md rounded-md">
          <div className="border border-primary p-4 rounded-md">
            <div role="alert" className="alert bg-secondary text-white ">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>Petunjuk dan Ketentuan</span>
            </div>
            <ul className="list-disc px-6 text-primary text-xs ">
              {lists.map((list, index) => (
                <li key={index} className="my-2">
                  {list}
                </li>
              ))}
            </ul>
            <div className="flex justify-center text-center items-center p-3">
              <a
                href={templateExcel}
                className="btn rounded-md bg-success hover:bg-success text-white btn-sm"
                download="Template-Data-Obat.xlsx"
              >
                <FontAwesomeIcon icon={faFileExcel} /> Download Template
              </a>
            </div>
          </div>
          <div>
            <form
              className="flex md:flex-row flex-col md:gap-0 gap-2 w-full mt-5"
              onSubmit={handleSubmit}
            >
              <input
                type="file"
                className="file-input  file-input-bordered file-input-primary rounded-md w-full "
                onChange={handleFileChange}
              />
              <button
                className="btn bg-primary hover:bg-primary text-white rounded-md"
                type="submit"
              >
                {loading ? <Loading type={"bars"} size={"sm"} /> : "Upload"}
              </button>
            </form>
            {importedData && isShow && errors.length <= 0 && (
              <div>
                <h3>Data yang Diimpor:</h3>
                <ul>
                  {importedData.map((item, index) => (
                    <li key={index}>{item.nama_barang}</li>
                  ))}
                </ul>
              </div>
            )}

            {errors.length > 0 && (
              <div className="bg-error rounded-md p-5 mt-3 text-white">
                <h3 className="font-bold text-lg">
                  {" "}
                  <FontAwesomeIcon icon={faWarning} /> Error pada saat import:
                </h3>
                <ul className="list-disc">
                  {errors.map((error, index) => (
                    <li key={index} className="ml-5">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
