export const Input = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
  errors,
  max,
  min,
  isOptional,
}) => {
  return (
    <div className="">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-base">
            {label} {isOptional ? "" : <span className="text-red-600">*</span>}
          </span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={type !== "date" ? max : undefined} // maxLength hanya jika bukan tipe date
          max={type === "date" ? max : undefined} // max hanya jika tipe date
          min={type === "date" ? min : undefined}
          className={`input input-bordered input-primary w-full rounded-md ${
            errors ? "border-red-400" : ""
          }`}
        />
        {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
      </label>
    </div>
  );
};
