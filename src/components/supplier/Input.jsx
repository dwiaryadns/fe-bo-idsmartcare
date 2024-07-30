export const Input = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
  errors,
  max,
  isOptional,
}) => {
  return (
    <div className="pb-3">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-base">
            {label}{" "}
            {isOptional ? (
              <span className="text-red-600">(optional)</span>
            ) : (
              <span className="text-red-600">*</span>
            )}
          </span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={max}
          className={`input input-bordered input-primary w-full rounded-md ${
            errors ? "border-red-400" : ""
          }`}
        />
        {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
      </label>
    </div>
  );
};
