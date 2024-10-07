import Input from "./Input";
import Select from "./Select";

export default function Form({
  handleSelectType,
  formValues,
  handleChange,
  errors,
  handleSubmitBoInfo,
  handleSelectChange,
  setFormValues,
  isFormValid,
  datas,
}) {
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
              Business Type<span className="text-red-600">*</span>
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
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            errors={errors.phone}
          />
          <Input
            label="Mobile Phone"
            placeholder="+62 - xxxxx"
            name="mobile"
            value={formValues.mobile}
            onChange={handleChange}
            errors={errors.mobile}
          />
        </div>
        <Input
          label="Street Address"
          placeholder="Street Address"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          errors={errors.address}
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
          max={5}
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
            Saya telah memeriksa ulang dan mengonfirmasi kembali semua informasi
            sudah benar dan jelas, serta dapat dipertanggungjawabkan sewaktu -
            waktu
          </span>
        </div>
        <div className="flex justify-end">
          {datas !== "pentest" && (
            <button
              disabled={!isFormValid()}
              onClick={handleSubmitBoInfo}
              className="btn bg-primary text-white rounded-md btn-sm hover:bg-primary border-none"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
