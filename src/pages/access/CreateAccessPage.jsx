import { useState } from "react";
import {
  faEye,
  faEyeSlash,
  faKey,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../dummy/axiosInstance";
import { API_BASE_URL } from "../../dummy/const";
import { useNavigate } from "react-router";
import { ToastAlert } from "../../components/Alert";

export default function CreateAccessPage() {
  const hakAksesOptions = {
    Gudang: [
      "Stok Gudang",
      "Penerimaan Barang",
      "Pemesanan Barang",
      "Distribusi Barang",
      "Stock Fasyankes",
      "Stock Opname",
      "History Stock Opname",
    ],
    Admin: ["Manajemen Gudang", "Fasyankes", "Pengadaan", "Persediaan"],
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // Added password confirmation
    role: "Admin",
    hakAkses: hakAksesOptions["Admin"],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        hakAkses: checked
          ? [...prev.hakAkses, value]
          : prev.hakAkses.filter((item) => item !== value),
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        role: value,
        hakAkses: hakAksesOptions[value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      permission: formData.hakAkses,
    };
    console.log(submissionData);

    try {
      const response = await axiosInstance.post(
        API_BASE_URL + "/delegate-access/store",
        submissionData
      );
      if (response.data.status === true) {
        ToastAlert("success", "Berhasil Menambahkan Hak Akses");
        navigate("/access");
      } else {
        ToastAlert("success", "Gagal Menambahkan Hak Akses");
      }
    } catch (error) {
      console.error(error);
      ToastAlert("error", error.response.data.message);
      setErrors(error.response.data.errors);
      console.log(errors);
    }
  };

  const [errors, setErrors] = useState({});

  return (
    <Layout title="Tambah Hak Akses" icon={faKey}>
      <div className="card">
        <div className="card-body shadow-md rounded-md">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col mb-3">
                <label className="font-bold">Nama</label>
                <input
                  type="text"
                  name="name" // Changed from "Nama" to "name" to match state key
                  placeholder="Nama"
                  className={`input ${
                    errors.name ? "input-error" : "input-primary"
                  }  input-bordered w-full rounded`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>
              <div className="flex flex-col w-full mb-3">
                <label className="font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`input  ${
                    errors.email ? "input-error" : "input-primary"
                  }  input-bordered rounded-md`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1  flex-col gap-3 mb-3">
                <div className="mb-3">
                  <label className="font-bold text-sm">Password</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input ${
                        errors.password ? "input-error" : "input-primary"
                      } w-full rounded-md pl-4 pr-10 p-2`}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      name="password"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {errors.password && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="font-bold text-sm">
                    Konfirmasi Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`input ${
                        errors.password_confirmation
                          ? "input-error"
                          : "input-primary"
                      } w-full rounded-md pl-4 pr-10 p-2`}
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      name="password_confirmation"
                      placeholder="Confirm Password"
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {errors.password_confirmation && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.password_confirmation}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label className="font-bold">Role</label>
                <div className="flex gap-4">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    className="radio radio-primary"
                    checked={formData.role === "Admin"}
                    onChange={handleChange}
                  />
                  Admin
                  <input
                    type="radio"
                    name="role"
                    value="Gudang"
                    className="radio radio-primary"
                    checked={formData.role === "Gudang"}
                    onChange={handleChange}
                  />
                  Gudang
                </div>
              </div>
              <div className="flex flex-col mb-3">
                <label className="font-bold">Hak Akses</label>
                {hakAksesOptions[formData.role].map((akses) => (
                  <div
                    className="form-control mb-1 flex flex-row gap-3"
                    key={akses}
                  >
                    <input
                      type="checkbox"
                      name="hakAkses"
                      value={akses}
                      className="checkbox checkbox-primary rounded-md checkbox-sm"
                      checked={formData.hakAkses.includes(akses)}
                      onChange={handleChange}
                    />
                    <span className="label-text">{akses}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                >
                  <FontAwesomeIcon icon={faSave} />
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
