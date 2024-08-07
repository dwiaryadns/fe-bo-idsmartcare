import { useRef, useState } from "react";
import {
  faAngleRight,
  faHome,
  faHospital,
  faInfoCircle,
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
import { useNavigate } from "react-router-dom";
import { CardPackage } from "./utils/CardPackage";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import Swal from "sweetalert2";
import Header from "../Header";
export const FormCreateFasyankes = () => {
  const free = [
    "Maximum 2 users",
    "3 days history data",
    "Limited Data",
    "Limited Features",
  ];
  const plus = [
    "Maximum 4 users",
    "Unlimited history data",
    "Unlimited data row in 5 years",
  ];
  const advanced = [
    "Unlimited users",
    "Unlimited history data",
    "Unlimited data row & storage",
  ];

  const packagePrices = {
    Apotek: {
      free: "0",
      plus: "199.000",
      plusAnnually: "159.000",
      advanced: "259.000",
      advancedAnnually: "195.000",
    },
    Klinik: {
      free: "0",
      plus: "249.000",
      plusAnnually: "199.000",
      advanced: "289.000",
      advancedAnnually: "231.000",
    },
  };
  const [duration, setDuration] = useState("Monthly");
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

  const [type, setType] = useState("");
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    nameFasyankes: "",
    picName: "",
    picPhoneNumber: "",
    emailFasyankes: "",
    password: "",
    confirmPassword: "",
  });

  const [warehouses, setWarehouse] = useState([]);

  const handleSelectWarehouse = (e) => {
    setFormData({ ...formData, warehouseId: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, warehouseId: "" }));
  };

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
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
  }, []);
  const [errors, setErrors] = useState({});

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

  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    warehouseName: "",
    warehouseAddress: "",
    picName: "",
    picNumber: "",
  });
  const [errorWarehouse, setErrorWarehouse] = useState({});
  const handleChangeInputWarehouse = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
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
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          modalRef.current.close();
          setWarehouse([response.data.data]);
        } else {
          const apiErrors = response.data.errors;
          const newApiErrors = {
            warehouseName: apiErrors.name ? apiErrors.name : "",
            warehouseAddress: apiErrors.address ? apiErrors.address : "",
            picName: apiErrors.pic ? apiErrors.pic : "",
            picNumber: apiErrors.contact ? apiErrors.contact : "",
          };
          setErrorWarehouse(newApiErrors);
        }
      })
      .catch(function (error) {
        modalRef.current.close();

        const apiErrors = error.response.data.errors;
        const newApiErrors = {
          warehouseName: apiErrors.name ? apiErrors.name : "",
          warehouseAddress: apiErrors.address ? apiErrors.address : "",
          picName: apiErrors.pic ? apiErrors.pic : "",
          picNumber: apiErrors.contact ? apiErrors.contact : "",
        };
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
        setErrorWarehouse(newApiErrors);
      });
  };

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState({});
  const [files, setFiles] = useState({});

  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [fasyankesId, setFasyankesId] = useState();

  const handleNext = () => {
    if (step === 1) {
      const payload = {
        type: type,
        duration: duration,
        price: choosePlan.price,
        username: formData.username,
        package_plan: choosePlan.paket == undefined ? "" : choosePlan.paket,
        warehouse_id:
          formData.warehouseId == undefined ? "" : formData.warehouseId,
        name: formData.nameFasyankes,
        address: formData.address,
        pic: formData.picName,
        pic_number: formData.picPhoneNumber,
        email: formData.emailFasyankes,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };
      axios
        .post(API_BASE_URL + "/fasyankes/store", payload, headers)
        .then(function (response) {
          if (response.data.status === true) {
            const data = response.data.data;
            console.log(response.data);
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            setFasyankesId(data.fasyankesId);
            setPayment({
              package: response.data.subscription.package_plan,
              duration: response.data.subscription.duration,
              type: data.type,
              price: packagePrices[data.type],
              fasyankes: data,
              subscription_id: response.data.subscription.id,
            });
            setStep(step + 1);
          } else {
            const apiErrors = response.data.errors;
            console.log(apiErrors);
            const newApiErrors = {
              type: apiErrors.type ? apiErrors.type : "",
              username: apiErrors.username ? apiErrors.username : "",
              duration: apiErrors.duration ? apiErrors.duration : "",
              package_plan: apiErrors.package_plan
                ? apiErrors.package_plan
                : "",
              nameFasyankes: apiErrors.name ? apiErrors.name : "",
              address: apiErrors.address ? apiErrors.address : "",
              warehouseId: apiErrors.warehouse_id ? apiErrors.warehouse_id : "",
              picName: apiErrors.pic ? apiErrors.pic : "",
              picPhoneNumber: apiErrors.pic_number ? apiErrors.pic_number : "",
              emailFasyankes: apiErrors.email ? apiErrors.email : "",
              password: apiErrors.password ? apiErrors.password : "",
              confirmPassword: apiErrors.password_confirmation
                ? apiErrors.password_confirmation
                : "",
            };
            setErrors(newApiErrors);
          }
        })
        .catch(function (error) {
          console.log(error);
          const apiErrors = error.response.data.errors;
          const newApiErrors = {
            type: apiErrors.type ? apiErrors.type : "",
            username: apiErrors.username ? apiErrors.username : "",
            duration: apiErrors.duration ? apiErrors.duration : "",
            package_plan: apiErrors.package_plan ? apiErrors.package_plan : "",
            nameFasyankes: apiErrors.name ? apiErrors.name : "",
            address: apiErrors.address ? apiErrors.address : "",
            warehouseId: apiErrors.warehouse_id ? apiErrors.warehouse_id : "",
            picName: apiErrors.pic ? apiErrors.pic : "",
            picPhoneNumber: apiErrors.pic_number ? apiErrors.pic_number : "",
            emailFasyankes: apiErrors.email ? apiErrors.email : "",
            password: apiErrors.password ? apiErrors.password : "",
            confirmPassword: apiErrors.password_confirmation
              ? apiErrors.password_confirmation
              : "",
          };
          setErrors(newApiErrors);
          Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
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

      axios
        .post(API_BASE_URL + "/legal-document-fasyankes/upload", formData, {
          headers: {
            ...headers.headers,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            Toast.fire({
              icon: "success",
              title: "Upload Legal Doc Successfully",
            });
            if (choosePlan.paket === "FREE") {
              navigate("/fasyankes");
            } else {
              setStep(step + 1);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          const errApi = error.response.data.errors;
          setErrors({
            sia: errApi.sia,
            sipa: errApi.sipa,
            simk: errApi.simk,
            siok: errApi.siok,
            password: errApi.password,
          });
          Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
        });
    }
  };

  const [checkbox, setCheckbox] = useState(false);
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <ul className="max-w-7xl timeline mb-10 flex justify-center">
        <li className="w-1/3">
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${step >= 1 ? "text-primary" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-xs md:text-lg">
            Info Fasyankes
          </div>
          <hr className={`${step >= 2 ? "bg-primary" : ""}`} />
        </li>
        <li className="w-1/3">
          <hr className={`${step >= 2 ? "bg-primary" : ""}`} />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${step >= 2 ? "text-primary" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-xs md:text-lg">
            Legal Document
          </div>
          <hr className={`${step >= 3 ? "bg-primary" : ""}`} />
        </li>
        <li className="w-1/3">
          <hr className={`${step >= 3 ? "bg-primary" : ""}`} />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${step >= 3 ? "text-primary" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-xs md:text-lg">
            Payment
          </div>
        </li>
      </ul>
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
            <div className="flex md:flex-row flex-col gap-5 justify-center  items-center">
              <button
                onClick={() => handleType("Apotek")}
                className={`btn rounded-md btn-sm min-w-80 ${
                  type === "Apotek"
                    ? "bg-primary hover:bg-primary text-white"
                    : "bg-grey hover:bg-grey"
                }`}
              >
                Apotek
              </button>
              <button
                onClick={() => handleType("Klinik")}
                className={`btn rounded-md btn-sm min-w-80 ${
                  type === "Klinik"
                    ? "bg-primary hover:bg-primary text-white"
                    : "bg-grey hover:bg-grey"
                }`}
              >
                Klinik
              </button>
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
            <div className="flex flex-row shadow-md justify-center gap-5 bg-base-100 mb-3 mx-2 md:mx-72 rounded-full p-2">
              <div
                onClick={() => handleChangeDuration("Monthly")}
                className={`${
                  duration === "Monthly" ? "bg-secondary text-white" : ""
                } p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Monthly
              </div>
              <div
                onClick={() => handleChangeDuration("Annually")}
                className={`${
                  duration === "Annually" ? "bg-secondary text-white" : ""
                } p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Annually (20% Off)
              </div>
            </div>

            {type && (
              <div className={`grid md:grid-cols-3 gap-5`}>
                <CardPackage
                  icon={faTag}
                  fitur={free}
                  title={"FREE"}
                  price={packagePrices[type].free}
                  handleChoosePlan={() =>
                    handleChoosePlan("FREE", packagePrices[type].free, "")
                  }
                  isPackage={choosePlan.paket}
                />
                <CardPackage
                  icon={faHome}
                  fitur={plus}
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
                  fitur={advanced}
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
            <div className="flex justify-center">
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
                    <span className="loading loading-dots loading-md text-center"></span>
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
                              value={formValues.warehouseName}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.warehouseName}
                            />
                            <InputWarehouse
                              label="Warehouse Address"
                              placeholder="Warehouse Address"
                              name="warehouseAddress"
                              value={formValues.warehouseAddress}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.warehouseAddress}
                            />
                            <InputWarehouse
                              label="PIC Name"
                              placeholder="PIC Name"
                              name="picName"
                              value={formValues.picName}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.picName}
                            />
                            <InputWarehouse
                              label="PIC Number"
                              placeholder="PIC Number"
                              name="picNumber"
                              value={formValues.picNumber}
                              onChange={handleChangeInputWarehouse}
                              errors={errorWarehouse.picNumber}
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
                      errors.warehouseId && "select-error"
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
                  {errors.warehouseId && (
                    <span className="text-red-600">{errors.warehouseId}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <Input
            type="text"
            label="Name Fasyankes"
            placeholder="Name Fasyankes"
            name="nameFasyankes"
            onChange={handleInputChange}
            value={formData.nameFasyankes}
            error={errors.nameFasyankes}
            tooltip="Informasi ini digunakan untuk mendetailkan data fasyankes yang akan didaftarkan"
          />
          <Input
            type="text"
            label="PIC Name"
            placeholder="PIC Name"
            name="picName"
            onChange={handleInputChange}
            value={formData.picName}
            error={errors.picName}
            tooltip="Nama PIC ini adalah nama untuk pihak yang bertanggung jawab operasional apotek"
          />
          <Input
            type="text"
            label="PIC Phone Number"
            placeholder="PIC Phone Number"
            name="picPhoneNumber"
            onChange={handleInputChange}
            value={formData.picPhoneNumber}
            error={errors.picPhoneNumber}
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
            type="email"
            label="Email Fasyankes"
            placeholder="Email Fasyankes"
            name="emailFasyankes"
            onChange={handleInputChange}
            value={formData.emailFasyankes}
            error={errors.emailFasyankes}
            tooltip="Email fasyankes yang akan dikirimkan seputar informasi penting dan dijadikan username admin"
          />

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
            name="confirmPassword"
            onChange={handleInputChange}
            value={formData.confirmPassword}
            error={errors.confirmPassword}
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
              disabled={!checkbox}
              className={`btn bg-primary  hover:bg-primary text-white rounded-md px-10`}
            >
              Next <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
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
