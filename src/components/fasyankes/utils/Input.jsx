import {
  faEye,
  faEyeSlash,
  faInfoCircle,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex mt-3">
      <div className="form-control w-full flex md:flex-row flex-col md:items-center">
        <div className="label min-w-72">
          <span className="label-text font-bold text-base">
            {label}
            <span className="text-red-600 mr-1">*</span>
            <div className="tooltip tooltip-info" data-tip={tooltip}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-gray-500 cursor-pointer"
              />
            </div>
          </span>
        </div>
        <div className="w-full">
          <div className="relative">
            <input
              type={`${type === "password" && showPassword ? "text" : type}`}
              placeholder={placeholder}
              name={name}
              onChange={onChange}
              value={value}
              className={`input input-bordered w-full input-primary rounded-md pr-10 ${
                error ? "border-red-600" : ""
              }`}
            />

            {type === "password" && (
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            )}
            {name === "email" ? <div></div> : ""}
          </div>
          {error && (
            <span className="text-red-600 mt-1 text-sm block">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
