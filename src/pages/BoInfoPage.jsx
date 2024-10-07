import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Apply from "../components/boInfo/status/Apply";
import OnReview from "../components/boInfo/status/OnReview";
import Pending from "../components/boInfo/status/Pending";
import Rejected from "../components/boInfo/status/Rejected";
import Approved from "../components/boInfo/status/Approved";
import Form from "../components/boInfo/Form";
import { API_BASE_URL } from "../dummy/const";
import { getData } from "../dummy/pentest";
import { CenterAlert, ToastAlert } from "../components/Alert";
import Loading from "../components/Loading";
const BoInfoPage = () => {
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [stateStatus, setStateStatus] = useState(null);
  const [boInfo, setBoInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    kodePos: "",
    checked: false,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const data = getData();
    setDatas(data.role);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
  const isFormValid = () => {
    const {
      businessName,
      businessEmail,
      phone,
      mobile,
      businessType,
      address,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      kodePos,
      checked,
    } = formValues;
    return (
      businessName &&
      businessEmail &&
      phone &&
      mobile &&
      businessType &&
      address &&
      provinsi &&
      kabupaten &&
      kecamatan &&
      desa &&
      kodePos &&
      checked
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/bo-info", headers);
        const data = response.data.data;
        setBoInfo(data);
        setStateStatus(data.status);
        setLoading(false);
        setFormValues({
          ...data,
          kodePos: data.postal_code || "",
          checked: false,
        });
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectType = (e) => {
    handleChange(e);
  };

  const handleSubmitBoInfo = async (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      ...formValues,
      province: selectedNames.provinsi,
      city: selectedNames.kabupaten,
      subdistrict: selectedNames.kecamatan,
      village: selectedNames.desa,
      postal_code: formValues.kodePos,
    };
    console.log(payload);

    await axios
      .post(API_BASE_URL + "/bo-info/store", payload, headers)
      .then((response) => {
        if (response.data.status === true) {
          axios
            .get(API_BASE_URL + "/bo-info", headers)
            .then((getResponse) => {
              setBoInfo(getResponse.data.data);
              setStateStatus(getResponse.data.data.status);
              navigate("/bo-info");
              setLoading(false);
              ToastAlert("success", response.data.message);
            })
            .catch((getError) => {
              CenterAlert("error", "Oops...", getError.response.data.message);
            });
        } else {
          CenterAlert("error", "Oops...", response.data.message);
        }
      })
      .catch((error) => {
        ToastAlert("error", error.response.data.message);
        const message = error.response.data.errors;
        setErrors({
          ...message,
          provinsi: message.province || "",
          kabupaten: message.city || "",
          kecamatan: message.subdistrict || "",
          desa: message.village || "",
          kodePos: message.postal_code || "",
        });
        setLoading(false);
      });
  };
  const renderForm = () => {
    return (
      <Form
        datas={datas}
        errors={errors}
        handleChange={handleChange}
        formValues={formValues}
        handleSelectChange={handleSelectChange}
        handleSelectType={handleSelectType}
        handleSubmitBoInfo={handleSubmitBoInfo}
        isFormValid={isFormValid}
        setFormValues={setFormValues}
      />
    );
  };
  const renderStateStatus = () => {
    if (loading) {
      return (
        <div className="flex justify-center mt-32 text-primary">
          <Loading type={"spinner"} size={"lg"} />
        </div>
      );
    } else {
      if (stateStatus === null || stateStatus === undefined) {
        return renderForm();
      } else if (stateStatus === "apply") {
        return <Apply />;
      } else if (stateStatus == "on review") {
        return <OnReview />;
      } else if (stateStatus == "pending") {
        return <Pending boInfo={boInfo}>{renderForm()}</Pending>;
      } else if (stateStatus === "rejected") {
        return <Rejected reason={boInfo?.reason} />;
      } else if (stateStatus === "approved") {
        return <Approved boInfo={boInfo} />;
      }
    }
  };
  return (
    <Layout title="Informasi Bisnis Owner" icon={faInfoCircle}>
      <div className="mt-3 mb-10">{renderStateStatus()}</div>;
    </Layout>
  );
};

export default BoInfoPage;
