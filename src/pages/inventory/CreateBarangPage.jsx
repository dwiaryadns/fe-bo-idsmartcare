import { faBox, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Input } from "../../components/inventory/Input";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AsyncPaginate } from "react-select-async-paginate";
import { Link, useNavigate } from "react-router-dom";

import { ToastAlert } from "../../components/Alert";

export const CreateBarangPage = () => {
  const [formValues, setFormValues] = useState({
    nama_barang: "",
  });
  const satuans = [
    "Pcs",
    "Botol",
    "Kapsul",
    "Tablet",
    "Ampul",
    "Kaplet",
    "Pill",
    "Puyer",
    "Patch",
  ];
  const [kategori, setKategori] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [errors, setErrors] = useState({});
  const [isKfa, setIsKfa] = useState();
  const handleIsKfa = (e) => {
    setIsKfa(e);
    setFormValues((prev) => ({
      ...prev,
      isKfa: e,
    }));
    if (e != "KFA") {
      setFormValues((prev) => ({
        ...prev,
        nama_barang: "",
      }));
    }
  };

  const formatRupiah = (value) => {
    const numberString = value.replace(/[^0-9]/g, "");
    return numberString
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/^/, "Rp ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "harga_beli" || name === "harga_jual"
        ? formatRupiah(value)
        : value;
    if (name === "expired_at") {
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Tanggal tidak valid",
        }));
        return;
      }
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    console.log(errors);
  };
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const kategoriBarang = await axios.get(
          `${API_BASE_URL}/inventory/get-kategori`,
          headers
        );
        setKategori(kategoriBarang.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSupplier = async () => {
      try {
        const suppliersBarang = await axios.get(
          `${API_BASE_URL}/supplier`,
          headers
        );
        setSupplier(suppliersBarang.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchKategori();
    fetchSupplier();
  }, []);

  const handleAsyncPaginateChange = (selectedOption) => {
    setValue(selectedOption);
    if (selectedOption) {
      setFormValues((prevValues) => ({
        ...prevValues,
        nama_barang: selectedOption.label,
        kfa_poa_code: selectedOption.value,
      }));
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);

  const tokenKfa = "IDsM4RtcaR32024*@>";
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const responseKfa = await axios.get(API_BASE_URL + "/master-kfa/pov/poa", {
      headers: {
        Authorization: `${tokenKfa}`,
      },
      params: {
        search: searchQuery,
        page: page,
        perPage: 10,
      },
    });

    const { data, current_page, last_page } = responseKfa.data.data;
    const options = data.map((item) => ({
      value: item.kfa_poa_code,
      label: item.poa_desc,
    }));

    console.log(value);
    return {
      options,
      hasMore: current_page < last_page,
      additional: {
        page: current_page + 1,
      },
    };
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const resSubmit = await axios.post(
        API_BASE_URL + "/inventory/store-barang",
        formValues,
        headers
      );
      if (resSubmit.data.status === true) {
        ToastAlert("success", resSubmit.data.message);
        setFormValues({});
        navigate("/daftar-produk");
      } else {
        ToastAlert("error", resSubmit.data.message);
      }
    } catch (error) {
      ToastAlert("error", error.response.data.message);
      const simplifiedErrors = Object.keys(error.response.data.errors).reduce(
        (acc, key) => {
          acc[key] = error.response.data.errors[key];
          return acc;
        },
        {}
      );
      setErrors(simplifiedErrors);
    }
  };
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Daftar Produk" icon={faBox} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="w-full">
                  <div className="label">
                    <span className="label-text font-bold text-base">
                      Sumber Data <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 border-red-600">
                    <button
                      className={`btn rounded-md ${
                        isKfa === "KFA"
                          ? "bg-primary hover:bg-primary  text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => handleIsKfa("KFA")}
                    >
                      KFA
                    </button>
                    <button
                      className={`btn rounded-md ${
                        isKfa === "Non KFA"
                          ? "bg-primary hover:bg-primary text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => handleIsKfa("Non KFA")}
                    >
                      Non KFA
                    </button>
                  </div>
                </div>
                {isKfa === "KFA" ? (
                  <div className="w-full">
                    <div className="label">
                      <span className="label-text font-bold text-base">
                        DATA KFA <span className="text-red-600">*</span>
                      </span>
                    </div>
                    <AsyncPaginate
                      value={value}
                      loadOptions={loadOptions}
                      onChange={handleAsyncPaginateChange}
                      additional={{
                        page: 1,
                      }}
                      inputValue={inputValue}
                      onInputChange={setInputValue}
                    />
                  </div>
                ) : (
                  ""
                )}

                <Input
                  label={"Nama Barang"}
                  placeholder={"Nama Barang"}
                  name="nama_barang"
                  type={"text"}
                  errors={errors.nama_barang}
                  value={formValues.nama_barang}
                  onChange={handleChange}
                />
                <div className="w-full">
                  <div className="label">
                    <span className="label-text font-bold text-base">
                      Kategori Barang <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <select
                    name="kategori_id"
                    value={formValues.kategori_id}
                    onChange={handleSelectChange}
                    className={`select  ${
                      errors.kategori_id ? "select-error" : "select-primary"
                    } w-full rounded-md`}
                  >
                    <option disabled selected>
                      Pilih Kategori
                    </option>
                    {kategori.map((k, index) => (
                      <option key={index} value={k.kategori_id}>
                        {k.nama}
                      </option>
                    ))}
                  </select>
                  {errors.kategori_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.kategori_id}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <div className="label">
                    <span className="label-text font-bold text-base">
                      Supplier Barang <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <div className="flex">
                    <select
                      name="supplier_id"
                      value={formValues.supplier_id}
                      onChange={handleSelectChange}
                      className={`select ${
                        errors.supplier_id ? "select-error" : "select-primary"
                      }  w-full rounded-l-md rounded-r-none`}
                    >
                      <option disabled selected>
                        Pilih Supplier
                      </option>
                      {supplier.map((sup, index) => (
                        <option key={index} value={sup.supplier_id}>
                          {sup.nama_supplier}
                        </option>
                      ))}
                    </select>
                    <Link
                      className="bg-primary rounded-r-md rounded-l-none btn hover:bg-primary text-white"
                      to={"/supplier/create"}
                    >
                      +
                    </Link>
                  </div>
                  {errors.supplier_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.supplier_id}
                    </p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <div className="w-full">
                    <div className="label">
                      <span className="label-text font-bold text-base">
                        Harga Beli <span className="text-red-600">*</span>
                      </span>
                    </div>
                    <label
                      className={`input ${
                        errors.harga_beli ? "input-error" : "input-primary"
                      } input-bordered rounded-md  flex items-center gap-2`}
                    >
                      <input
                        name="harga_beli"
                        value={formValues.harga_beli}
                        onChange={handleChange}
                        type="text"
                        className="grow"
                      />
                    </label>
                    {errors.harga_beli && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.harga_beli}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <div className="label">
                      <span className="label-text font-bold text-base">
                        Harga Jual <span className="text-red-600">*</span>
                      </span>
                    </div>
                    <label
                      className={`input ${
                        errors.harga_jual ? "input-error" : "input-primary"
                      } input-bordered rounded-md  flex items-center gap-2`}
                    >
                      <input
                        type="text"
                        className="grow"
                        name="harga_jual"
                        value={formValues.harga_jual}
                        onChange={handleChange}
                      />
                    </label>
                    {errors.harga_jual && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.harga_jual}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="label">
                    <span className="label-text font-bold text-base">
                      Satuan Barang <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <select
                    name="satuan"
                    value={formValues.satuan}
                    onChange={handleSelectChange}
                    className={`select ${
                      errors.satuan ? "select-error" : "select-primary"
                    }  w-full rounded-md`}
                  >
                    <option disabled selected>
                      Pilih Satuan
                    </option>
                    {satuans.map((satuan, index) => (
                      <option key={index} value={satuan}>
                        {satuan}
                      </option>
                    ))}
                  </select>
                  {errors.satuan && (
                    <p className="text-red-500 text-xs mt-1">{errors.satuan}</p>
                  )}
                </div>
                <Input
                  type={"date"}
                  name={"expired_at"}
                  value={formValues.expired_at}
                  errors={errors.expired_at}
                  label={"Tanggal Kadaluarsa"}
                  onChange={handleChange}
                />

                <div className="flex flex-col">
                  <div className="label">
                    <span className="label-text font-bold text-base">
                      Deskripsi <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <textarea
                    value={formValues.deskripsi}
                    onChange={handleChange}
                    name="deskripsi"
                    className={`textarea ${
                      errors.deskripsi ? "textarea-error" : "textarea-primary"
                    }  resize-none rounded-md`}
                    placeholder="Deskripsi"
                  ></textarea>
                  {errors.deskripsi && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.deskripsi}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleSubmit}
                    className="btn bg-primary rounded-md mt-5 mb-10 hover:bg-primary text-white btn-block"
                  >
                    <FontAwesomeIcon icon={faPlus} /> Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
