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
          className={`input input-bordered w-full rounded-md ${
            errors ? "border-red-500" : ""
          }`}
        />
        {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
      </label>
    </div>
  );
};

export default Input;
