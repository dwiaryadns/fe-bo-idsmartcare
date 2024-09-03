import { useState } from "react";
import { faKey, faSave } from "@fortawesome/free-solid-svg-icons";
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
    Admin: [
      "Manajemen Gudang - semua",
      "Fasyankes",
      "Pengadaan - semua",
      "Persediaan - semua",
    ],
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // Added password confirmation
    role: "Admin",
    hakAkses: hakAksesOptions["Admin"],
  });

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
        hakAkses: hakAksesOptions[value], // Update hakAkses based on selected role
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      permission: formData.hakAkses, // Attach the selected permissions
    };
    console.log(submissionData);

    try {
      const response = await axiosInstance.post(
        API_BASE_URL + "/delegate-access/store",
        submissionData
      );
      // swal fire top end
      if (response.data.status === true) {
        ToastAlert("success", "Berhasil Menambahkan Hak Akses");
        navigate("/access"); // Redirect to access list page after successful submission
      } else {
        ToastAlert("success", "Gagal Menambahkan Hak Akses");
      }
    } catch (error) {
      console.error(error);
      ToastAlert("error", "Terjadi Kesalahan Server");
    }
  };

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
                  className="input input-primary input-bordered w-full rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full mb-3">
                <label className="font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-primary input-bordered rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex md:flex-row flex-col gap-3 mb-3">
                <div className="flex flex-col w-full">
                  <label className="font-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-primary input-bordered rounded-md"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-bold">Confirm Password</label>
                  <input
                    type="password"
                    name="password_confirmation" // Added password confirmation input
                    placeholder="Confirm Password"
                    className="input input-primary input-bordered rounded-md"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
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
