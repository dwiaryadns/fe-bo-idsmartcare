import { faCircleInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  type,
  label,
  placeholder,
  name,
  onChange,
  value,
  error,
  tooltip,
}) => {
  return (
    <div className="flex mt-3">
      <div className="form-control w-full flex md:flex-row flex-col  md:items-center">
        <div className="label min-w-72 ">
          <span className="label-text font-bold text-base">
            {label}
            <span className="text-red-800 mr-1">*</span>
            <div className="tooltip tooltip-info " data-tip={tooltip}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-gray-500 cursor-pointer"
              />
            </div>
          </span>
        </div>

        <div className="w-full mr-3">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            className={`input input-bordered w-full input-primary rounded-md ${
              error ? "border-red-600 " : ""
            }`}
          />
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default Input;
