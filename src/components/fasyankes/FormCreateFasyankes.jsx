import { useRef, useState } from "react";
import {
  faAngleRight,
  faHome,
  faHospital,
  faInfoCircle,
  faPaperPlane,
  faPlus,
  faSave,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./utils/Input";
import InputWarehouse from "../../components/warehouse/utils/Input";
import { FormDocument } from "./FormDocument";
import { FormPembayaranFasyankes } from "./FormPembayaranFasyankes";
import { useLocation, useNavigate } from "react-router-dom";
import { CardPackage } from "./utils/CardPackage";
import { useEffect } from "react";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL } from "../../dummy/const";
import Header from "../Header";
import StepBar from "./utils/StepBar";
import { packagePrices, plan } from "./utils/package";
import { ToastAlert } from "../Alert";
import Loading from "../Loading";
import Select from "../boInfo/Select";
export const FormCreateFasyankes = () => {
  const [duration, setDuration] = useState("Monthly");
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [warehouses, setWarehouse] = useState([]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [errorWarehouse, setErrorWarehouse] = useState({});
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState({});
  const [files, setFiles] = useState({});
  const [password, setPassword] = useState("");
  const [fasyankesId, setFasyankesId] = useState(null);
  const [checkbox, setCheckbox] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [newState, setNewState] = useState(false);
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const location = useLocation();
  const [choosePlan, setChoosePlan] = useState({
    paket: "",
    price: "",
    duration: duration,
  });

  const handleChoosePlan = (paket, price, duration) => {
    setChoosePlan({
      paket: paket,
      price: price,
      duration: duration,
    });
    setErrors((prevErrors) => ({ ...prevErrors, package_plan: "" }));
  };

  const handleSelectWarehouse = (e) => {
    setFormData({ ...formData, warehouse_id: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, warehouse_id: "" }));
  };
  useEffect(() => {
    axios
      .get(API_BASE_URL + "/warehouses", headers)
      .then(function (response) {
        setWarehouse(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    const newStep = location.state?.step;
    const newType = location.state?.type;
    const newPayments = location.state?.payments;
    if (newPayments) {
      setFasyankesId(newPayments.fasyankes.fasyankesId);
      setPayment((prevPayment) => {
        const newPaymentState = {
          ...newPayments,
          type: newType,
          price: packagePrices[newType],
        };
        console.log("Previous payment state:", prevPayment);
        console.log("New payment state:", newPaymentState);
        return newPaymentState;
      });
    }
    if (newStep == 2) {
      setLoading(false);
      setStep(newStep);
      setType(newType);
      setNewState(true);
    } else if (newStep == 3) {
      setStep(newStep);
      setNewState(true);
    }
  }, [location.state]);

  const handleType = (e) => {
    setType(e);
    setErrors((prevErrors) => ({ ...prevErrors, type: "" }));
  };

  const handleChangeDuration = (e) => {
    setDuration(e);
    setChoosePlan("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const [selectedNames, setSelectedNames] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  if (selectedNames.desa === "Pilih Kelurahan") {
    setErrors((prevErrors) => ({
      ...prevErrors,
      desa: "Kelurahan wajib diisi",
    }));
    return;
  }

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

  const handleChangeInputWarehouse = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmitWarehouse = () => {
    const payload = {
      name: formValues.warehouseName,
      address: formValues.warehouseAddress,
      pic: formValues.picName,
      contact: formValues.picNumber,
    };
    axios
      .post(API_BASE_URL + "/warehouses/store", payload, headers)
      .then(function (response) {
        if (response.data.status === true) {
          navigate("/fasyankes/create");
          ToastAlert("success", response.data.message);
          modalRef.current.close();
          setWarehouse([response.data.data]);
        } else {
          const apiErrors = response.data.errors;
          setErrorWarehouse(apiErrors);
          return;
        }
      })
      .catch(function (error) {
        const apiErrors = error.response.data.errors;
        ToastAlert("error", error.response.data.message);
        setErrorWarehouse(apiErrors);
        return;
      });
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleNext = () => {
    setLoadingNext(true);
    if (step === 1) {
      const payload = {
        fasyankesId: fasyankesId,
        type: type,
        duration: duration,
        latitude: formData.latitude,
        longitude: formData.longitude,
        price: choosePlan.price,
        username: formData.username,
        package_plan: choosePlan.paket == undefined ? "" : choosePlan.paket,
        warehouse_id:
          formData.warehouse_id == undefined ? "" : formData.warehouse_id,
        name: formData.name,
        address: formData.address,
        pic: formData.pic,
        pic_number: formData.pic_number,
        email: formData.email,
        province: selectedNames.provinsi,
        city: selectedNames.kabupaten,
        subdistrict: selectedNames.kecamatan,
        village: selectedNames.desa,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };
      axios
        .post(API_BASE_URL + "/fasyankes/store", payload, headers)
        .then(function (response) {
          if (response.data.status === true) {
            const data = response.data.data;
            ToastAlert("success", response.data.message);
            setFasyankesId(data.fasyankesId);
            setLoadingNext(false);
            setPayment({
              package: response.data.subscription.package_plan,
              duration: response.data.subscription.duration,
              type: data.type,
              price: packagePrices[data.type],
              // price: "5000",
              fasyankes: data,
              subscription_id: response.data.subscription.id,
            });
            setStep(step + 1);
            setCheckbox(false);
          } else {
            setLoadingNext(false);
            const apiErrors = response.data.errors;
            setErrors(apiErrors);
          }
        })
        .catch(function (error) {
          setLoadingNext(false);
          const apiErrors = error.response.data.errors;
          setErrors(apiErrors);
          ToastAlert("error", error.response.data.message);
        });
    } else {
      setLoading(true);
      const formData = new FormData();
      Object.keys(files).forEach((label) => {
        formData.append(label, files[label]);
      });
      formData.append("type", type);
      formData.append("password", password);
      formData.append("fasyankes_id", fasyankesId);
      formData.append(
        "package_plan",
        newState ? payment.package : choosePlan.paket
      );

      axios
        .post(API_BASE_URL + "/legal-document-fasyankes/upload", formData, {
          headers: {
            ...headers.headers,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === true) {
            setLoading(false);
            ToastAlert("success", "Berhasil Upload Dokument Legal");
            const isFree =
              newState && payment.package === "FREE" ? true : false;
            if (choosePlan.paket === "FREE" || isFree) {
              navigate("/fasyankes");
            } else {
              setStep(step + 1);
            }
          } else {
            setLoading(false);
            ToastAlert("error", response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          const errApi = error.response.data.errors;
          setErrors(errApi);
          ToastAlert("error", error.response.data.message);
        });
    }
  };

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const handlePrevious = () => {
    setStep(newState ? step : step - 1);
    setLoadingNext(false);
    setErrors((prev) => {
      return { ...prev, sia: "", sipa: "", simk: "", siok: "", password: "" };
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleGetOtp = async () => {
    setLoadingOTP(true);
    if (formData.email === "") {
      setLoadingOTP(false);
      ToastAlert("error", "Masukkan Email Anda");
      return;
    }
    try {
      const response = await axios.post(
        API_BASE_URL + "/fasyankes/send-otp",
        { email: formData.email },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (response.data.status === true) {
        setOtpId(response.data.otp_id);
        setLoadingOTP(false);
        ToastAlert("success", response.data.message);
      } else {
        setLoadingOTP(false);
        ToastAlert("error", response.data.message);
      }
    } catch (error) {
      setLoadingOTP(false);
      ToastAlert("error", "Gagal Mengambil OTP");
    }
  };
  const handleSendOtp = () => {
    if (otp === "") {
      ToastAlert("error", "Masukkan OTP!");
      return;
    }
    const payload = {
      email: formData.email,
      otp: otp,
      otp_id: otpId,
    };

    axios
      .post(API_BASE_URL + "/store-otp", payload, {
        headers: {
          Authorization: `Bearer ${ACCESS_HEADER}`,
        },
      })
      .then(function (response) {
        if (response.data.status === true) {
          setIsSuccess(true);
          ToastAlert("success", "Berhasil Verfikasi Email");
        } else {
          setIsSuccess(false);
          ToastAlert("error", response.data.message);
        }
      })
      .catch(function (error) {
        setIsSuccess(false);
        ToastAlert("error", error.response.data.message);
      });
  };

  return (
    <div>
      <StepBar step={step} />
      {step === 1 ? (
        <div className="pb-10">
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold text-base">
                Type Of Fasyankes<span className="text-red-600 mr-2">*</span>
                <div
                  className="tooltip tooltip-info"
                  data-tip="Pilih tipe fasyankes yang akan Anda daftarkan ke idSmartCare"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-gray-500 cursor-pointer"
                  />
                </div>
              </span>
            </div>
            <div className="flex justify-center">
              <div className="flex md:flex-row flex-col gap-2 justify-center border border-gray-300 rounded-lg p-1 w-full items-center md:w-[660px]">
                <button
                  onClick={() => handleType("Apotek")}
                  className={`btn rounded-md btn-sm w-full md:w-[340px] lg:w-80 ${
                    type === "Apotek"
                      ? "bg-primary hover:bg-primary text-white"
                      : "bg-grey hover:bg-grey"
                  }`}
                >
                  Apotek
                </button>
                <button
                  onClick={() => handleType("Klinik")}
                  className={`btn rounded-md btn-sm w-full md:w-[340px] lg:w-80 ${
                    type === "Klinik"
                      ? "bg-primary hover:bg-primary text-white"
                      : "bg-grey hover:bg-grey"
                  }`}
                >
                  Klinik
                </button>
              </div>
            </div>
            {errors.type && <span className="text-red-600">{errors.type}</span>}
          </div>
          <div className="w-full">
            <div className="label">
              <span className="label-text font-bold text-base">
                Package Plan<span className="text-red-600 mr-2">*</span>
                <div
                  className="tooltip tooltip-info "
                  data-tip="Pilih plan sesuai dengan kebutuhan"
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-gray-500 cursor-pointer"
                  />
                </div>
              </span>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex flex-col md:flex-row gap-2 justify-center items-center border border-gray-300 rounded-lg p-1 w-full md:w-[660px]">
                <button
                  onClick={() => handleChangeDuration("Monthly")}
                  className={`btn rounded-md btn-sm w-full md:w-[340px] lg:md:w-80 ${
                    duration === "Monthly"
                      ? "bg-secondary hover:bg-secondary text-white"
                      : ""
                  } p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => handleChangeDuration("Annually")}
                  className={`btn rounded-md btn-sm w-full md:w-[340px] lg:md:w-80 ${
                    duration === "Annually"
                      ? "bg-secondary hover:bg-secondary text-white"
                      : ""
                  } p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
                >
                  Tahunan (Disc. 20%)
                </button>
              </div>
            </div>
            {/* <div className="flex flex-row shadow-md justify-center gap-5 bg-base-100 mb-3 mx-2 md:mx-48 rounded-full p-2">
              <div
                onClick={() => handleChangeDuration("Monthly")}
                className={`${
                  duration === "Monthly" ? "bg-secondary text-white" : ""
                } p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Bulanan
              </div>
              <div
                onClick={() => handleChangeDuration("Annually")}
                className={`${
                  duration === "Annually" ? "bg-secondary text-white" : ""
                } p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Tahunan (Diskon 20%)
              </div>
            </div> */}

            {type && (
              <div className={`grid md:grid-cols-3 gap-5 mt-3`}>
                <CardPackage
                  icon={faTag}
                  fitur={plan.free}
                  title={"FREE"}
                  price={packagePrices[type].free}
                  handleChoosePlan={() =>
                    handleChoosePlan("FREE", packagePrices[type].free, "")
                  }
                  isPackage={choosePlan.paket}
                />
                <CardPackage
                  icon={faHome}
                  fitur={plan.plus}
                  title={"Plus"}
                  isPopular={true}
                  price={packagePrices[type].plus}
                  disc={packagePrices[type].plusAnnually}
                  isAnually={duration === "Annually"}
                  handleChoosePlan={() =>
                    handleChoosePlan(
                      "Plus",
                      duration === "Annually"
                        ? packagePrices[type].plusAnnually
                        : packagePrices[type].plus,
                      duration
                    )
                  }
                  isPackage={choosePlan.paket}
                />
                <CardPackage
                  icon={faHospital}
                  fitur={plan.advanced}
                  title={"Advanced"}
                  price={packagePrices[type].advanced}
                  disc={packagePrices[type].advancedAnnually}
                  isAnually={duration === "Annually"}
                  handleChoosePlan={() =>
                    handleChoosePlan(
                      "Advanced",
                      duration === "Annually"
                        ? packagePrices[type].advancedAnnually
                        : packagePrices[type].advanced,
                      duration
                    )
                  }
                  isPackage={choosePlan.paket}
                />
              </div>
            )}
          </div>
          {type === "" ? (
            <div className="flex justify-center mt-3">
              Select Type of Fasyankes first
            </div>
          ) : (
            ""
          )}
          {errors.package_plan && (
            <span className="text-red-600">{errors.package_plan}</span>
          )}
          <div className="flex mt-3">
            <div className="form-control w-full flex md:flex-row flex-col md:items-center">
              <div className="label min-w-72">
                <span className="label-text font-bold text-base">
                  Select Warehouse <span className="text-red-600">*</span>
                  <div
                    className="tooltip tooltip-info ms-1"
                    data-tip="Pilih Warehouse yang akan dimasukkan ke fasyankes"
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-gray-500 cursor-pointer"
                    />
                  </div>
                </span>
              </div>

              {warehouses.length == 0 ? (
                <div className="w-full">
                  {loading ? (
                    <span className="text-primary">
                      <Loading type={"dots"} size={"md"} />
                    </span>
                  ) : (
                    <div>
                      <button
                        className="btn btn-block rounded-md bg-primary text-white hover:bg-primary"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add Warehouse
                      </button>
                      <dialog id="my_modal_3" className="modal" ref={modalRef}>
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                            <InputWarehouse
                              label="Warehouse Name"
                              placeholder="Warehouse Name"
                              name="warehouseName"
                              value={formValues.name}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.name}
                            />
                            <InputWarehouse
                              label="Warehouse Address"
                              placeholder="Warehouse Address"
                              name="warehouseAddress"
                              value={formValues.address}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.address}
                            />
                            <InputWarehouse
                              label="PIC Name"
                              placeholder="PIC Name"
                              name="picName"
                              value={formValues.pic}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.pic}
                            />
                            <InputWarehouse
                              label="PIC Number"
                              placeholder="PIC Number"
                              name="picNumber"
                              value={formValues.contact}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.contact}
                            />
                          </form>
                          <button
                            onClick={handleSubmitWarehouse}
                            className="btn bg-primary text-white hover:bg-primary rounded-md btn-block mt-3"
                          >
                            <FontAwesomeIcon icon={faSave} /> Submit
                          </button>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </div>
                  )}
                </div>
              ) : (
                <div className="form-control w-full">
                  <select
                    onChange={handleSelectWarehouse}
                    className={`select select-info rounded-md ${
                      errors.warehouse_id && "select-error"
                    }`}
                  >
                    <option disabled selected>
                      Select Warehouse
                    </option>
                    {warehouses.map((w, index) => (
                      <option key={index} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                  {errors.warehouse_id && (
                    <span className="text-red-600">{errors.warehouse_id}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <Input
            type="text"
            label="Name Fasyankes"
            placeholder="Name Fasyankes"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            error={errors.name}
            tooltip="Informasi ini digunakan untuk mendetailkan data fasyankes yang akan didaftarkan"
          />
          <Input
            type="text"
            label="PIC Name"
            placeholder="PIC Name"
            name="pic"
            onChange={handleInputChange}
            value={formData.pic}
            error={errors.pic}
            tooltip="Nama PIC ini adalah nama untuk pihak yang bertanggung jawab operasional apotek"
          />
          <Input
            type="number"
            label="PIC Phone Number"
            placeholder="PIC Phone Number"
            name="pic_number"
            onChange={handleInputChange}
            value={formData.pic_number}
            error={errors.pic_number}
            tooltip="Nomor PIC yang dapat dihubungi terkait dengan fasyankes yang didaftarkan"
          />
          <Input
            type="text"
            label="Address"
            placeholder="Address"
            name="address"
            onChange={handleInputChange}
            value={formData.address}
            error={errors.address}
            tooltip="Alamat fasyankes yang didaftarkan"
          />
          <Input
            type="number"
            label="Latitude"
            placeholder="Latitude"
            name="latitude"
            onChange={handleInputChange}
            value={formData.latitude}
            error={errors.latitude}
            tooltip="Latitude yang valid dari Google Maps"
          />
          <Input
            type="number"
            label="Longitude"
            placeholder="Longitude"
            name="longitude"
            onChange={handleInputChange}
            value={formData.longitude}
            error={errors.longitude}
            tooltip="Longitude yang valid dari Google Maps"
          />

          <div
            className={` ${isSuccess ? "w-full" : "flex md:flex-row flex-col"}`}
          >
            <Input
              type="email"
              label="Email Fasyankes"
              placeholder="Email Fasyankes"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              error={errors.email}
              tooltip="Email fasyankes yang akan dikirimkan seputar informasi penting dan dijadikan username admin"
            />
            <button
              onClick={handleGetOtp}
              className={`btn ${
                isSuccess ? "hidden" : ""
              } mt-3 bg-primary hover:bg-primary text-white rounded-md ml-3`}
            >
              {loadingOTP ? (
                <Loading type={"spinner"} size={"sm"} />
              ) : (
                "Kirim OTP"
              )}
            </button>
          </div>

          <div
            className={`${
              isSuccess ? "hidden" : "flex flex-col md:flex-row mt-2"
            } `}
          >
            <div className="form-control w-full flex flex-col md:flex-row md:items-center">
              <div className="label md:min-w-72 mb-2 md:mb-0">
                <span className="label-text font-bold text-base"></span>
              </div>
              <div className="relative flex flex-col md:flex-row md:items-center gap-3 w-full">
                <input
                  type="number"
                  value={otp}
                  onChange={handleOtpChange}
                  className="input input-primary rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                  placeholder="Kode OTP"
                />
                <button
                  disabled={
                    otpId === null || otpId === undefined ? "disabled" : ""
                  }
                  onClick={handleSendOtp}
                  className="btn bg-primary hover:bg-primary text-white rounded-md w-full md:w-auto"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
          <Select
            formValues={formValues}
            onSelectChange={handleSelectChange}
            errors={errors}
          />

          {isSuccess ? (
            <div>
              <div className="my-4">
                <Header title="Credential Data" icon={faUser} />
              </div>

              <Input
                type="text"
                label="Username"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                error={errors.username}
                tooltip="Username untuk login masuk ke halaman admin"
              />
              <Input
                type="password"
                label="Password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                error={errors.password}
                tooltip="Password untuk login masuk ke halaman admin"
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                name="password_confirmation"
                onChange={handleInputChange}
                value={formData.password_confirmation}
                error={errors.password_confirmation}
                tooltip="Confirm password untuk memastikan password yang sudah di buat"
              />
              <div className="form-control mt-10">
                <label className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    onClick={handleCheckbox}
                    className="checkbox checkbox-primary rounded-md"
                  />
                  <span className="label-text">
                    Dengan membuat akun, Anda setuju dengan{" "}
                    <a
                      href="/syarat-dan-ketentuan"
                      target="_blank"
                      className="font-bold italic text-primary"
                    >
                      Syarat dan Ketentuan
                    </a>{" "}
                    serta{" "}
                    <a
                      href="/kebijakan-privasi"
                      target="_blank"
                      className="font-bold italic text-primary"
                    >
                      Kebijakan Privasi{" "}
                    </a>
                    <span className="font-bold"> idSmartCare.</span>
                  </span>
                </label>
              </div>
              <div className="flex justify-end mt-5">
                <button
                  onClick={handleNext}
                  disabled={!checkbox || loadingNext}
                  className={`btn bg-primary  hover:bg-primary text-white rounded-md px-10`}
                >
                  {loadingNext ? (
                    <Loading type={"spinner"} size={"sm"} />
                  ) : (
                    <div>
                      Next <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : step === 2 ? (
        <FormDocument
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          typeFasyankes={type}
          packagePlan={choosePlan.paket}
          files={files}
          setFiles={setFiles}
          handleChangePassword={handleChangePassword}
          password={password}
          errors={errors}
          loading={loading}
          isNewStep={newState}
        />
      ) : (
        <FormPembayaranFasyankes
          handlePrevious={handlePrevious}
          payment={payment}
        />
      )}
    </div>
  );
};
