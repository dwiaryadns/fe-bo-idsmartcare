import {
  faExclamationTriangle,
  faHourglass,
  faLegal,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../dummy/const";
import { Link } from "react-router-dom";
import { ToastAlert } from "../components/Alert";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Status from "../components/Status";
import Form from "../components/legaldoc/Form";
import Approved from "../components/legaldoc/status/Approved";
import Pending from "../components/legaldoc/status/Pending";

const LegalDocumentPage = () => {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [isBoInfo, setIsBoInfo] = useState(false);
  const [files, setFiles] = useState({});
  const [password, setPassword] = useState("");
  const [dataLegal, setDataLegal] = useState();
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

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
          setDataLegal(legalDoc);
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

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(files).forEach((label) => {
      formData.append(label, files[label]);
    });
    formData.append("password", password);
    formData.append("type", type);
    if (status === "pending") {
      formData.append("id", dataLegal.id);
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

  const renderInput = () => {
    return (
      <Form
        errors={errors}
        handleChangePassword={handleChangePassword}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        password={password}
        type={type}
      />
    );
  };
  const renderPage = () => {
    if (status == null) {
      return renderInput();
    } else if (status === "apply") {
      return (
        <Status
          status={"apply"}
          desc={"Legal Document akan direview terlebih dahulu oleh Pihak Kami."}
          icon={faSave}
          message={"Dokumen Legal telah Dikirim."}
        />
      );
    } else if (status === "on review") {
      return (
        <Status
          status={"on review"}
          desc={"Legal Document sedang di periksa dahulu oleh Pihak Kami."}
          icon={faHourglass}
          message={"Sedang Periksa"}
        />
      );
    } else if (status === "rejected") {
      return (
        <Status
          icon={faExclamationTriangle}
          message="Data Anda telah Ditolak."
          status="rejected"
          desc={"Data-data anda ditolak karena " + dataLegal.reason}
        />
      );
    } else if (status === "pending") {
      return (
        <Status status={"pending"}>
          <Pending reason={dataLegal?.reason}>{renderInput()}</Pending>
        </Status>
      );
    } else if (status === "approved") {
      return (
        <Status status={"approved"}>
          <Approved type={type} dataLegal={dataLegal} />
        </Status>
      );
    }
  };

  return (
    <Layout title="Dokumen Legal" icon={faLegal}>
      {loading ? (
        <div className="flex justify-center mt-32 text-primary">
          <Loading type={"spinner"} size={"lg"} />
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
    </Layout>
  );
};

export default LegalDocumentPage;
