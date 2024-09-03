import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFile from "./utils/InputFile";
import {
  faAngleLeft,
  faAngleRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Loading from "../Loading";

export const FormDocument = ({
  typeFasyankes,
  handlePrevious,
  handleNext,
  files,
  setFiles,
  handleChangePassword,
  password,
  errors,
  loading,
}) => {
  const handleFileChange = (label) => (event) => {
    setFiles({
      ...files,
      [label]: event.target.files[0],
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {typeFasyankes === "Apotek" ? (
        <div>
          <InputFile
            label="Surat Izin Apotak (SIA)"
            onFileChange={handleFileChange("sia")}
            error={errors.sia}
          />
          <InputFile
            label="Surat Izin Praktek Apoteker (SIPA)"
            onFileChange={handleFileChange("sipa")}
            error={errors.sipa}
          />
          <label className="form-control w-full mb-3">
            <div className="flex flex-col justify-start text-start">
              <span className="label-text font-bold text-base">
                Password <span className="text-red-600">*</span>
              </span>
              <span className="text-xs text-gray-500 mb-1">
                Password untuk melindungi data pribadi anda.
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password File"
                name="password"
                value={password}
                onChange={(e) => handleChangePassword(e)}
                className={`input input-bordered w-full rounded-md input-primary ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </label>
          <div className="flex justify-end gap-3">
            <button
              onClick={handlePrevious}
              className="btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Previous
            </button>

            <button
              onClick={handleNext}
              className="btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
            >
              {loading ? (
                <Loading type={"dots"}  size={"md"} />
              ) : (
                <div>
                  Next <FontAwesomeIcon icon={faAngleRight} />
                </div>
              )}
            </button>
          </div>
        </div>
      ) : typeFasyankes === "Klinik" ? (
        <div>
          <InputFile
            onFileChange={handleFileChange("simk")}
            label="Surat Izin Mendirikan Klinik (SIMK)"
            error={errors.simk}
          />
          <InputFile
            onFileChange={handleFileChange("siok")}
            label="Surat Izin Operasional Klinik"
            error={errors.siok}
          />
          <label className="form-control w-full mb-3">
            <div className="flex flex-col justify-start text-start">
              <span className="label-text font-bold text-base">
                Password <span className="text-red-600">*</span>
              </span>
              <span className="text-xs text-gray-500 mb-1">
                Password untuk melindungi data pribadi anda.
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password File"
                name="password"
                value={password}
                onChange={(e) => handleChangePassword(e)}
                className={`input input-bordered w-full rounded-md input-primary ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </label>
          <div className="flex justify-end gap-3">
            <button
              onClick={handlePrevious}
              className="btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Previous
            </button>

            <button
              onClick={handleNext}
              className="btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
            >
              {loading ? (
                <Loading type={"dots"}  size={"md"} />
              ) : (
                <div>
                  Next <FontAwesomeIcon icon={faAngleRight} />
                </div>
              )}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
