import {
  faCheck,
  faHourglass,
  faLegal,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InputFile from "../components/legaldoc/InputFile";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, headers } from "../dummy/const";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import StatusLegal from "../components/legaldoc/StatusLegal";
import { data } from "autoprefixer";

const LegalDocumentPage = () => {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [isBoInfo, setIsBoInfo] = useState(false);
  const [files, setFiles] = useState({});

  const [dataLegal, setDataLegal] = useState();

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/bo-info", headers);
        const legalDoc = response.data.data.bisnis_owner.legal_doc_bo;
        if (legalDoc != null) {
          setStatus(legalDoc.status);
        }
        if (response) {
          const businessType = response.data.data.businessType;
          setType(businessType);
          setIsBoInfo(true);
          if (legalDoc.status === "approved") {
            setDataLegal(JSON.stringify(legalDoc));
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (label) => (event) => {
    setFiles({
      ...files,
      [label]: event.target.files[0],
    });
    setErrors((prevErrors) => ({ ...prevErrors, [label]: "" }));
  };

  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const Toast = Swal.mixin({
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

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(files).forEach((label) => {
      formData.append(label, files[label]);
    });
    formData.append("password", password);
    formData.append("type", type);

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
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    } catch (error) {
      setLoading(false);
      const errApi = error.response.data.errors;
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
      setErrors({
        ktp: errApi.ktp,
        akta: errApi.akta,
        npwp: errApi.npwp,
        sk_kemenkumham: errApi.sk_kemenkumham,
        nib: errApi.nib,
        iso: errApi.iso,
        password: errApi.password,
      });
    }
  };

  const renderInput = () => {
    if (type === "Perusahaan") {
      return (
        <div>
          <InputFile
            label="KTP Direktur Berdasarkan Akta"
            errors={errors.ktp}
            onFileChange={handleFileChange("ktp")}
          />
          <InputFile
            label="Akta Perusahaan (Perubahan/Terbaru)"
            errors={errors.akta}
            onFileChange={handleFileChange("akta")}
          />
          <InputFile
            label="SK Kemenkumham Akta (Perubahan/Terbaru)"
            errors={errors.ktp}
            onFileChange={handleFileChange("sk_kemenkumham")}
          />
          <InputFile
            label="NPWP Perusahaan"
            errors={errors.npwp}
            onFileChange={handleFileChange("npwp")}
          />
          <InputFile
            label="Nomor Induk Berusaha (NIB)"
            errors={errors.nib}
            onFileChange={handleFileChange("nib")}
          />
          <InputFile
            label="Sertifikasi ISO"
            errors={errors.iso}
            isRequired={false}
            onFileChange={handleFileChange("iso")}
          />
          <label className="form-control w-full">
            <div className=" flex flex-col justify-start text-start">
              <span className="label-text font-bold text-base">
                Password <span className="text-red-800">*</span>
              </span>
              <span className="text-xs text-gray-500 mb-1">
                Password untuk melindungi data pribadi anda.
              </span>
            </div>
            <input
              type="password"
              placeholder="Password File"
              name="password"
              value={password}
              onChange={(e) => handleChangePassword(e)}
              className={`input input-bordered w-full rounded-md input-primary ${
                errors.password ? "input-error" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </label>
          <div className="flex justify-end">
            <button
              className="btn bg-primary text-white btn-sm mb-10 mt-5 p-5 content-center rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else if (type === "Perorangan") {
      return (
        <div>
          <InputFile
            label="KTP"
            errors={errors.ktp}
            onFileChange={handleFileChange("ktp")}
          />
          <InputFile
            label="NPWP"
            errors={errors.npwp}
            onFileChange={handleFileChange("npwp")}
          />
          <InputFile
            label="Sertifikasi ISO"
            errors={errors.iso}
            isRequired={false}
            onFileChange={handleFileChange("iso")}
          />
          <label className="form-control w-full">
            <div className=" flex flex-col justify-start text-start">
              <span className="label-text font-bold text-base">
                Password <span className="text-red-800">*</span>
              </span>
              <span className="text-xs text-gray-500 mb-1">
                Password ini digunakan untuk mengakses file yang anda upload
              </span>
            </div>
            <input
              type="password"
              placeholder="Password File"
              name="password"
              value={password}
              onChange={(e) => handleChangePassword(e)}
              className={`input input-bordered w-full rounded-md input-primary ${
                errors.password ? "input-error" : ""
              } `}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </label>
          <div className="flex justify-end">
            <button
              className="btn bg-primary text-white btn-sm mb-10 mt-5 p-5 content-center rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }
  };

  const InputApprovedLegal = ({ label, link }) => {
    const redirectLink = () => {
      window.open(link, "_blank");
    };
    return (
      <div className="mb-3">
        <div className="label flex flex-col justify-start items-start">
          <span className="label-text font-bold text-base">{label}</span>
        </div>
        <div className="flex">
          <input
            onClick={redirectLink}
            value={"Click Here"}
            readOnly
            className="w-full items-center text-center cursor-pointer hover:bg-blue-100 duration-300 rounded-r-none rounded-l-md input input-bordered"
          />
          <button className="btn bg-primary hover:bg-primary rounded-l-none rounded-r-md text-white font-bold">
            Change File
          </button>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    if (status == null) {
      return renderInput();
    } else if (status === "apply") {
      return (
        <StatusLegal
          desc={"Legal Document akan direview terlebih dahulu oleh Pihak Kami."}
          icon={faSave}
          message={"Legal Document Has Been Submitted"}
        />
      );
    } else if (status === "on review") {
      return (
        <StatusLegal
          desc={"Legal Document sedang di review dahulu oleh Pihak Kami."}
          icon={faHourglass}
          message={"On Review"}
        />
      );
    } else if (status === "approved") {
      const dataFix = JSON.parse(dataLegal);
      console.log(dataFix);
      return (
        <div>
          {type === "Perorangan" ? (
            <div>
              <InputApprovedLegal label={"KTP"} link={dataFix.ktp} />
              <InputApprovedLegal label={"NPWP"} link={dataFix.npwp} />
              {dataFix.iso != null ? (
                <InputApprovedLegal
                  label={"Sertifikasi ISO"}
                  link={dataFix.iso}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              <InputApprovedLegal
                label="KTP Direktur Berdasarkan Akta"
                link={dataFix.ktp}
              />
              <InputApprovedLegal
                label="Akta Perusahaan (Perubahan/Terbaru)"
                link={dataFix.akta}
              />
              <InputApprovedLegal
                label="SK Kemenkumham Akta (Perubahan/Terbaru)"
                link={dataFix.sk_kemenkumham}
              />
              <InputApprovedLegal label="NPWP Perusahaan" link={dataFix.npwp} />
              <InputApprovedLegal
                label="Nomor Induk Berusaha (NIB)"
                link={dataFix.nib}
              />
              {dataFix.iso != null ? (
                <InputApprovedLegal
                  label={"Sertifikasi ISO"}
                  link={dataFix.iso}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Dokumen Legal" icon={faLegal} />
            {loading ? (
              <div className="flex justify-center mt-32">
                <span className="loading loading-spinner text-primary loading-lg"></span>
              </div>
            ) : (
              <div>
                {isBoInfo ? (
                  renderPage()
                ) : (
                  <div role="alert" className="alert alert-warning mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
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
                      Please Complete your Business Owner Info data! {"  "}
                      <Link to="/bo-info" className="font-bold underline">
                        Click Here!
                      </Link>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentPage;
