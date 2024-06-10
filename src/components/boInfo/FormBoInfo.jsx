import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const FormBoInfo = () => {
  const [formValues, setFormValues] = useState({
    businessId: "",
    businessName: "",
    businessEmail: "",
    phoneNumber: "",
    mobilePhone: "",
    streetAddress: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const isFormValid = () => {
    const {
      businessId,
      businessName,
      businessEmail,
      phoneNumber,
      mobilePhone,
      streetAddress,
    } = formValues;
    return (
      businessId &&
      businessName &&
      businessEmail &&
      phoneNumber &&
      mobilePhone &&
      streetAddress &&
      checked
    );
  };

  return (
    <div className="mt-3 mb-10">
      <div className="bg-[#C1DAFA] px-5 pb-8">
        <Input
          label="Business ID"
          placeholder="Business ID"
          name="businessId"
          value={formValues.businessId}
          onChange={handleChange}
        />
        <Input
          label="Business Name"
          placeholder="Business Name"
          name="businessName"
          value={formValues.businessName}
          onChange={handleChange}
        />
        <Input
          label="Business Email"
          placeholder="Business Email"
          name="businessEmail"
          value={formValues.businessEmail}
          onChange={handleChange}
        />
        <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
          <Input
            label="Phone Number"
            placeholder="(021) - xxxxx"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
          <Input
            label="Mobile Phone"
            placeholder="+62 - xxxxx"
            name="mobilePhone"
            value={formValues.mobilePhone}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Street Address"
          placeholder="Street Address"
          name="streetAddress"
          value={formValues.streetAddress}
          onChange={handleChange}
        />
        <Select />
        <div className="form-control flex flex-row items-center mt-2">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="checkbox rounded-sm checkbox-info"
            />
          </label>
          <span className="label-text">
            Saya telah memeriksa ulang dan mengonfirmasi kembali semua informasi
            sudah benar dan jelas, serta dapat dipertanggungjawabkan sewaktu -
            waktu
          </span>
        </div>
        <div className="flex justify-end">
          <button
            disabled={!isFormValid()}
            className="btn bg-primary text-white rounded-md btn-sm hover:bg-primary border-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBoInfo;
