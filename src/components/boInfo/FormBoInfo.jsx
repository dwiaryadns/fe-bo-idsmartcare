import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { StateStatus } from "./StateStatus";
import { faHourglass, faSave } from "@fortawesome/free-solid-svg-icons";

const FormBoInfo = () => {
  const [loading, setLoading] = useState(true);
  const [stateStatus, setStateStatus] = useState(null);
  const [formValues, setFormValues] = useState({
    businessType: "",
    businessName: "",
    businessEmail: "",
    phoneNumber: "",
    mobilePhone: "",
    streetAddress: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    kodePos: "",
    checked: false,
  });

  const [boInfo, setBoInfo] = useState(null);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  console.log(selectedNames);

  const isFormValid = () => {
    const {
      businessName,
      businessEmail,
      phoneNumber,
      mobilePhone,
      businessType,
      streetAddress,
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
      phoneNumber &&
      mobilePhone &&
      businessType &&
      streetAddress &&
      provinsi &&
      kabupaten &&
      kecamatan &&
      desa &&
      kodePos &&
      checked
    );
  };

  const token = localStorage.getItem("token");

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/bo-info", headers);
        const data = response.data.data;
        setBoInfo(data);
        setStateStatus(data.status);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
      // businessId: formValues.businessId,
      businessType: formValues.businessType,
      businessName: formValues.businessName,
      businessEmail: formValues.businessEmail,
      phone: formValues.phoneNumber,
      mobile: formValues.mobilePhone,
      address: formValues.streetAddress,
      province: selectedNames.provinsi,
      city: selectedNames.kabupaten,
      subdistrict: selectedNames.kecamatan,
      village: selectedNames.desa,
      postal_code: formValues.kodePos,
    };

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
              Toast.fire({
                icon: "success",
                title: response.data.message,
              });
            })
            .catch((getError) => {
              console.log(getError);
            });
          console.log(response.data.message);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const message = error.response.data.errors;
          console.log(message);
          const newApiErrors = {
            // businessId: message.businessId ? message.businessId : "",
            businessName: message.businessName ? message.businessName : "",
            businessEmail: message.businessEmail ? message.businessEmail : "",
            phoneNumber: message.phone ? message.phone : "",
            mobilePhone: message.mobile ? message.mobile : "",
            streetAddress: message.address ? message.address : "",
            provinsi: message.province ? message.province : "",
            kabupaten: message.city ? message.city : "",
            kecamatan: message.subdistrict ? message.subdistrict : "",
            desa: message.village ? message.village : "",
            kodePos: message.postal_code ? message.postal_code : "",
          };
          setErrors(newApiErrors);
        }
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  const renderForm = () => {
    return (
      <div>
        <h4 className="text-lg font-bold mt-3">Business Information</h4>
        <p className="text-sm mb-2">
          Tell all about your business by entering a few business details to get
          started
        </p>
        <div className="bg-[#C1DAFA] px-5 pb-8">
          <div className="pb-3">
            <div className="label">
              <span className="label-text font-bold text-base">
                Business Type<span className="text-red-800">*</span>
              </span>
            </div>
            <select
              name="businessType"
              onChange={handleSelectType}
              value={formValues.businessType}
              className="select select-bordered w-full rounded-md"
            >
              <option value="">Select Business Type</option>
              <option value="Perusahaan">Perusahaan</option>
              <option value="Perorangan">Perorangan</option>
            </select>
          </div>
          <Input
            label="Business Name"
            placeholder="Business Name"
            name="businessName"
            value={formValues.businessName}
            onChange={handleChange}
            errors={errors.businessName}
          />
          <Input
            label="Business Email"
            placeholder="Business Email"
            name="businessEmail"
            value={formValues.businessEmail}
            onChange={handleChange}
            errors={errors.businessEmail}
          />
          <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
            <Input
              label="Phone Number"
              placeholder="(021) - xxxxx"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              errors={errors.phoneNumber}
            />
            <Input
              label="Mobile Phone"
              placeholder="+62 - xxxxx"
              name="mobilePhone"
              value={formValues.mobilePhone}
              onChange={handleChange}
              errors={errors.mobilePhone}
            />
          </div>
          <Input
            label="Street Address"
            placeholder="Street Address"
            name="streetAddress"
            value={formValues.streetAddress}
            onChange={handleChange}
            errors={errors.streetAddress}
          />
          <Select
            formValues={formValues}
            onSelectChange={handleSelectChange}
            errors={errors}
          />
          <Input
            label="Kode Pos"
            placeholder="Kode Pos"
            name="kodePos"
            value={formValues.kodePos}
            onChange={handleChange}
            errors={errors.kodePos}
            max={6}
          />
          <div className="form-control flex flex-row items-center mt-2">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                name="checked"
                checked={formValues.checked}
                onChange={() =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    checked: !prevValues.checked,
                  }))
                }
                className="checkbox rounded-sm checkbox-info"
              />
            </label>
            <span className="label-text">
              Saya telah memeriksa ulang dan mengonfirmasi kembali semua
              informasi sudah benar dan jelas, serta dapat dipertanggungjawabkan
              sewaktu - waktu
            </span>
          </div>
          <div className="flex justify-end">
            <button
              disabled={!isFormValid()}
              onClick={handleSubmitBoInfo}
              className="btn bg-primary text-white rounded-md btn-sm hover:bg-primary border-none"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InputApproved = ({ label, value }) => {
    return (
      <div className="form-control w-full flex md:flex-row flex-col  md:items-center mb-5">
        <div className="label min-w-52">
          <span className="label-text font-bold text-base">{label}</span>
        </div>

        <div className="w-full mr-3">
          <input
            type="text"
            value={value}
            disabled
            className={`input disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none input-bordered w-full input-primary rounded-md `}
          />
        </div>
      </div>
    );
  };

  const renderStateStatus = () => {
    if (stateStatus === null || stateStatus === undefined) {
      return renderForm();
    } else if (stateStatus === "apply") {
      return (
        <StateStatus
          icon={faSave}
          message="Data has been Submitted"
          status="apply"
          desc={
            "Data-data akan dicocokan dengan Legal Doc yang diupload silahkan upload "
          }
        />
      );
    } else if (stateStatus == "on review") {
      return (
        <StateStatus
          icon={faHourglass}
          message="On Review"
          status="on review"
          desc={"Data-data anda sedang direview"}
        />
      );
    } else if (stateStatus === "approved") {
      const addressFormat =
        boInfo.address +
        ", " +
        boInfo.village +
        ", " +
        boInfo.subdistrict +
        ", " +
        boInfo.city +
        ", Indonesia, " +
        boInfo.postal_code;
      return (
        <div className="flex mt-3 flex-col">
          <InputApproved label={"Business ID"} value={boInfo.businessId} />
          <InputApproved label={"Business Type"} value={boInfo.businessType} />
          <InputApproved label={"Business Name"} value={boInfo.businessName} />
          <InputApproved
            label={"Business Email"}
            value={boInfo.businessEmail}
          />
          <InputApproved label={"Phone Number"} value={boInfo.phone} />
          <InputApproved label={"Mobile Phone"} value={boInfo.mobile} />
          <div className="form-control w-full flex md:flex-row flex-col  md:items-center">
            <div className="label min-w-52">
              <span className="label-text font-bold text-base">
                Street Address
              </span>
            </div>

            <div className="w-full mr-3">
              <textarea
                value={addressFormat}
                disabled
                className="textarea resize-none disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none w-full textarea-bordered rounded-md textarea-primary textarea-sm"
              ></textarea>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div className="mt-3 mb-10">{renderStateStatus()}</div>;
};

export default FormBoInfo;
