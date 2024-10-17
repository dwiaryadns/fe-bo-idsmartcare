import { useState } from "react";
import { syaratDanKetentuan } from "../tc";
import { ToastAlert } from "../../Alert";
import { API_BASE_URL } from "../../../dummy/const";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Approved({ type, dataLegal }) {
  const [selectedFiles, setSelectedFiles] = useState({}); // Store multiple selected files
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("approved");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [updatedAt, setUpdatedAt] = useState(dataLegal.updated_at);

  // Function to check if more than 30 days have passed
  const isEligibleForUpdate = (date) => {
    const currentDate = new Date();
    const updatedAtDate = new Date(date);
    const differenceInTime = currentDate - updatedAtDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays > 30;
  };

  const handleFileChange = (label, file) => {
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [label.toLowerCase()]: file, // Store file for the corresponding label
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    // Append selected files to formData
    Object.keys(selectedFiles).forEach((label) => {
      if (selectedFiles[label]) {
        formData.append(label, selectedFiles[label]);
      }
    });

    formData.append("password", password);
    formData.append("type", type);

    if (status === "approved") {
      formData.append("id", dataLegal.id); // Add id if status is approved
    }

    try {
      const response = await axios.post(
        API_BASE_URL + "/legal-document-bo/upload",
        formData,
        {
          headers: {
            ...headers.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setStatus("apply");
        setLoading(false);
        ToastAlert("success", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const errApi = error.response.data.errors;
      ToastAlert("error", error.response.data.message);
      setErrors(errApi);
    }
  };

  const triggerFileInput = (label) => {
    if (!isEligibleForUpdate(updatedAt)) {
      ToastAlert(
        "error",
        "Maaf, Anda hanya dapat mengganti dokumen setiap 30 hari sekali."
      );
      return;
    } else {
      document.getElementById(`fileInput-${label}`).click();
    }
  };

  const InputApprovedLegal = ({ label, link }) => {
    const [fileName, setFileName] = useState(`${label}.pdf`);

    const handleFileChangeInner = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        handleFileChange(label, file); // Pass label to handleFileChange
      }
    };

    return (
      <div className="mt-3">
        <div className="label flex flex-col justify-start items-start">
          <span className="label-text font-bold text-base">{label}</span>
        </div>
        <div className="flex">
          <div className="w-full flex items-center text-center cursor-pointer hover:bg-blue-100 duration-300 rounded-lg input input-bordered">
            <input
              onClick={() => window.open(link, "_blank")}
              value={fileName}
              readOnly
              className="w-full text-[16px] items-center cursor-pointer truncate"
            />
            <button
              onClick={() => triggerFileInput(label)}
              className="h-auto py-1 w-[180px] bg-primary hover:bg-slate-400 rounded-lg text-white font-bold text-[16px]"
            >
              Pilih File
            </button>
            <input
              type="file"
              id={`fileInput-${label}`}
              style={{ display: "none" }}
              onChange={handleFileChangeInner}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {type === "Perorangan" ? (
        <div>
          <InputApprovedLegal label="KTP" link={dataLegal.ktp} />
          <InputApprovedLegal label="NPWP" link={dataLegal.npwp} />
          {dataLegal.iso && (
            <InputApprovedLegal label="Sertifikasi ISO" link={dataLegal.iso} />
          )}
          {Object.keys(selectedFiles).length > 0 && (
            <div>
              <label className="form-control w-full mt-5">
                <div className="flex flex-col justify-start text-start">
                  <span className="label-text font-bold text-base">
                    Password <span className="text-red-600">*</span>
                  </span>
                  <span className="text-xs text-gray-500 mb-1">
                    Password untuk melindungi data pribadi anda.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password File"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    className={`input input-bordered w-full rounded-md input-primary ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </label>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary bg-primary hover:bg-primary btn-sm text-white rounded-lg px-5"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          )}
          <div className="text-sm bg-[#DFEBFD] p-5 rounded-md mt-5">
            <h3 className="font-bold italic mb-2">Syarat dan Ketentuan</h3>
            <ul className="italic list-decimal">
              {syaratDanKetentuan.map((tc, index) => (
                <div className="ml-4" key={index}>
                  <li>{tc}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <InputApprovedLegal
            label="KTP Direktur Berdasarkan Akta"
            link={dataLegal.ktp}
          />
          <InputApprovedLegal
            label="Akta Perusahaan (Perubahan/Terbaru)"
            link={dataLegal.akta}
          />
          <InputApprovedLegal
            label="SK Kemenkumham Akta (Perubahan/Terbaru)"
            link={dataLegal.sk_kemenkumham}
          />
          <InputApprovedLegal label="NPWP Perusahaan" link={dataLegal.npwp} />
          <InputApprovedLegal
            label="Nomor Induk Berusaha (NIB)"
            link={dataLegal.nib}
          />
          {dataLegal.iso && (
            <InputApprovedLegal label="Sertifikasi ISO" link={dataLegal.iso} />
          )}
          {Object.keys(selectedFiles).length > 0 && (
            <div>
              <label className="form-control w-full mt-5">
                <div className="flex flex-col justify-start text-start">
                  <span className="label-text font-bold text-base">
                    Password <span className="text-red-600">*</span>
                  </span>
                  <span className="text-xs text-gray-500 mb-1">
                    Password untuk melindungi data pribadi anda.
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password File"
                    name="password"
                    value={password}
                    onChange={handleChangePassword}
                    className={`input input-bordered w-full rounded-md input-primary ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </label>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          )}
          <div className="text-sm bg-[#DFEBFD] p-5 rounded-md mt-5">
            <h3 className="font-bold italic mb-2">Syarat dan Ketentuan</h3>
            <ul className="italic list-decimal">
              {syaratDanKetentuan.map((tc, index) => (
                <div className="ml-4" key={index}>
                  <li>{tc}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
