import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { Input } from "../../components/supplier/Input";
import Select from "../../components/boInfo/Select";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const CreateSupplierPage = () => {
  const [type, setType] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setFormValues((prevValues) => ({
      ...prevValues,
      tipe_supplier: selectedType,
    }));
  };
  const [formValues, setFormValues] = useState({
    nama_supplier: "",
    alamat: "",
    nomor_telepon: "",
    email: "",
    tipe_supplier: "",
    kontak_person: "",
    nomor_kontak_person: "",
    email_kontak_person: "",
    start_pks_date: "",
    end_pks_date: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    kode_pos: "",
    nomor_npwp: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nomor_npwp" && value.length > 16) return;
    if (name === "kode_pos" && value.length > 5) return;
    if (name === "nomor_telepon" && value.length > 16) return;
    if (name === "nomor_kontak_person" && value.length > 16) return;
    if (name === "start_pks_date") {
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Tanggal tidak valid",
        }));
        return;
      }
    }
    if (name === "end_pks_date") {
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
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const [selectedNames, setSelectedNames] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  const handleSelectChange = (name, value, text) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setSelectedNames((prevNames) => ({
      ...prevNames,
      [name]: text,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    const updatedFormValues = {
      ...formValues,
      provinsi: selectedNames.provinsi,
      kabupaten: selectedNames.kabupaten,
      kecamatan: selectedNames.kecamatan,
      desa: selectedNames.desa,
    };

    try {
      const response = await axios.post(
        API_BASE_URL + "/supplier/store",
        updatedFormValues,
        headers
      );
      if (response.data.status === true) {
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
        setFormValues({
          nama_supplier: "",
          alamat: "",
          nomor_telepon: "",
          email: "",
          tipe_supplier: "",
          kontak_person: "",
          nomor_kontak_person: "",
          email_kontak_person: "",
          start_pks_date: "",
          end_pks_date: "",
          provinsi: "",
          kabupaten: "",
          kecamatan: "",
          desa: "",
          kode_pos: "",
          nomor_npwp: "",
        });
        navigate("/supplier");
      }
    } catch (error) {
      console.log(error.response);
      setErrors({
        nama_supplier: error.response.data.errors.nama_supplier,
        alamat: error.response.data.errors.alamat,
        nomor_telepon: error.response.data.errors.nomor_telepon,
        email: error.response.data.errors.email,
        tipe_supplier: error.response.data.errors.tipe_supplier,
        kontak_person: error.response.data.errors.kontak_person,
        nomor_kontak_person: error.response.data.errors.nomor_kontak_person,
        email_kontak_person: error.response.data.errors.email_kontak_person,
        start_pks_date: error.response.data.errors.start_pks_date,
        end_pks_date: error.response.data.errors.end_pks_date,
        provinsi: error.response.data.errors.provinsi,
        kabupaten: error.response.data.errors.kabupaten,
        kecamatan: error.response.data.errors.kecamatan,
        desa: error.response.data.errors.desa,
        kode_pos: error.response.data.errors.kode_pos,
        nomor_npwp: error.response.data.errors.nomor_npwp,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Supplier" icon={faIndustry} />
            <div className="card shadow-md">
              <div className="card-body">
                <p className="text-2xl text-primary font-bold">
                  Tambah Supplier
                </p>
                <div>
                  <Input
                    value={formValues.nama_supplier}
                    errors={errors.nama_supplier}
                    type={"text"}
                    label={"Nama Supplier"}
                    placeholder={"Nama Supplier"}
                    name={"nama_supplier"}
                    onChange={handleChange}
                  />

                  <div className="pb-3">
                    <div className="label">
                      <span className="label-text font-bold text-base">
                        Tipe Supplier <span className="text-red-600">*</span>
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 border-red-600">
                      <button
                        className={`btn rounded-md ${
                          type === "Distributor"
                            ? "bg-primary hover:bg-primary  text-white"
                            : "bg-gray-200 text-black"
                        }`}
                        onClick={() => handleTypeChange("Distributor")}
                      >
                        Distributor
                      </button>
                      <button
                        className={`btn rounded-md ${
                          type === "Produsen"
                            ? "bg-primary hover:bg-primary text-white"
                            : "bg-gray-200 text-black"
                        }`}
                        onClick={() => handleTypeChange("Produsen")}
                      >
                        Produsen
                      </button>
                      <button
                        className={`btn rounded-md ${
                          type === "Grosir"
                            ? "bg-primary hover:bg-primary text-white"
                            : "bg-gray-200 text-black"
                        }`}
                        onClick={() => handleTypeChange("Grosir")}
                      >
                        Grosir
                      </button>
                    </div>
                    {errors && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.tipe_supplier}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 grid-cols-1">
                    <Input
                      value={formValues.nomor_telepon}
                      errors={errors.nomor_telepon}
                      type={"number"}
                      label={"Kontak Supplier"}
                      placeholder={"Kontak Supplier"}
                      name={"nomor_telepon"}
                      max={16}
                      onChange={handleChange}
                    />
                    <Input
                      value={formValues.email}
                      errors={errors.email}
                      type={"text"}
                      label={"Email Supplier"}
                      placeholder={"Email Supplier"}
                      name={"email"}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    value={formValues.nomor_npwp}
                    errors={errors.nomor_npwp}
                    type={"number"}
                    label={"Nomor NPWP"}
                    placeholder={"Nomor NPWP"}
                    name={"nomor_npwp"}
                    max={16}
                    onChange={handleChange}
                  />
                  <Input
                    value={formValues.website}
                    errors={errors.website}
                    type={"text"}
                    label={"Website"}
                    placeholder={"Website"}
                    name={"website"}
                    onChange={handleChange}
                    isOptional={true}
                  />
                  <Input
                    value={formValues.alamat}
                    errors={errors.alamat}
                    type={"text"}
                    label={"Alamat Supplier"}
                    placeholder={"Alamat Supplier"}
                    name={"alamat"}
                    onChange={handleChange}
                  />
                  <Select
                    formValues={formValues}
                    onSelectChange={handleSelectChange}
                    errors={errors}
                    isSupplier={true}
                  />
                  <Input
                    value={formValues.kode_pos}
                    errors={errors.kode_pos}
                    type={"number"}
                    label={"Kode Pos"}
                    placeholder={"Kode Pos"}
                    name={"kode_pos"}
                    max={5}
                    onChange={handleChange}
                  />
                  <div className="grid md:grid-cols-2 gap-5 grid-cols-1">
                    <Input
                      value={formValues.kontak_person}
                      errors={errors.kontak_person}
                      type={"text"}
                      label={"Nama PIC"}
                      placeholder={"Nama PIC"}
                      name={"kontak_person"}
                      onChange={handleChange}
                    />
                    <Input
                      value={formValues.nomor_kontak_person}
                      errors={errors.nomor_kontak_person}
                      type={"number"}
                      label={"Kontak PIC"}
                      placeholder={"Kontak PIC"}
                      name={"nomor_kontak_person"}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    value={formValues.email_kontak_person}
                    errors={errors.email_kontak_person}
                    type={"text"}
                    label={"Email PIC"}
                    placeholder={"Email PIC"}
                    name={"email_kontak_person"}
                    onChange={handleChange}
                  />

                  <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <Input
                      value={formValues.start_pks_date}
                      errors={errors.start_pks_date}
                      type={"date"}
                      label={"Tanggal Kerjasama"}
                      placeholder={"Tanggal Kerjasama"}
                      name={"start_pks_date"}
                      onChange={handleChange}
                    />
                    <Input
                      value={formValues.end_pks_date}
                      errors={errors.end_pks_date}
                      type={"date"}
                      label={"Tanggal Selesai Kerjasama"}
                      placeholder={"Tanggal Kerjasama"}
                      name={"end_pks_date"}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-block mt-5 rounded-md mb-10 bg-primary hover:bg-primary text-white"
                  >
                    Tambah
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
