import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFile from "./utils/InputFile";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const FormDocument = ({
  typeFasyankes,
  packagePlan,
  handlePrevious,
  handleNext,
  files,
  setFiles,
  handleChangePassword,
  password,
  errors,
  loading,
}) => {
  const type = "Apotek";
  const handleFileChange = (label) => (event) => {
    setFiles({
      ...files,
      [label]: event.target.files[0],
    });
  };

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
            <div className=" flex flex-col justify-start text-start">
              <span className="label-text font-bold text-base">
                Password <span className="text-red-600">*</span>
              </span>
              <span className="text-xs text-gray-500 mb-1">
                Password untuk melindungi data pribadi anda.
              </span>
            </div>
            <input
              type="password"
              placeholder="Password File"
              name="password"
              value={password}
              onChange={handleChangePassword}
              className={`input input-bordered w-full rounded-md input-primary  ${
                errors.password ? "input-error" : ""
              }`}
            />
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
                <span className="loading loading-dots loading-md"></span>
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
            <div className=" flex flex-col justify-start text-start">
              <span className="label-text font-bold text-base">
                Password <span className="text-red-600">*</span>
              </span>
              <span className="text-xs text-gray-500 mb-1">
                Password untuk melindungi data pribadi anda.
              </span>
            </div>
            <input
              type="password"
              placeholder="Password File"
              name="password"
              value={password}
              onChange={handleChangePassword}
              className={`input input-bordered w-full rounded-md input-primary  ${
                errors.password ? "input-error" : ""
              }`}
            />
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
                <span className="loading loading-dots loading-md"></span>
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
