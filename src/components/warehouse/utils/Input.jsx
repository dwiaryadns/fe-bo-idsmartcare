const Input = ({ label, placeholder, name, value, onChange, errors }) => {
  return (
    <div className="pb-3">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-base">
            {label} <span className="text-red-800">*</span>
          </span>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={`input input-bordered input-primary w-full rounded-md ${
            errors ? "border-red-600" : ""
          }`}
        />
        {errors && <span className="text-red-600">{errors}</span>}
      </label>
    </div>
  );
};

export default Input;
