import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFile from "./InputFile";
import { syaratDanKetentuan } from "./tc";
import { useState } from "react";

export default function Form({
  type,
  errors,
  handleFileChange,
  handleChangePassword,
  password,
  showPassword,
  handleSubmit,
  setShowPassword,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleIsChecked = () => {
    setIsChecked(!isChecked);
  };

  if (type === "Perusahaan") {
    return (
      <div>
        <InputFile
          label="KTP Direktur Berdasarkan Akta"
          errors={errors.ktp}
          onFileChange={handleFileChange("ktp")}
        />
        <InputFile
          label="Akta Perusahaan (Perubahan/Terbaru)"
          errors={errors.akta}
          onFileChange={handleFileChange("akta")}
        />
        <InputFile
          label="SK Kemenkumham Akta (Perubahan/Terbaru)"
          errors={errors.sk_kemenkumham}
          onFileChange={handleFileChange("sk_kemenkumham")}
        />
        <InputFile
          label="NPWP Perusahaan"
          errors={errors.npwp}
          onFileChange={handleFileChange("npwp")}
        />
        <InputFile
          label="Nomor Induk Berusaha (NIB)"
          errors={errors.nib}
          onFileChange={handleFileChange("nib")}
        />
        <InputFile
          label="Sertifikasi ISO"
          errors={errors.iso}
          isRequired={false}
          onFileChange={handleFileChange("iso")}
        />
        <label className="form-control w-full">
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

        <div className="text-sm bg-[#DFEBFD] p-5 mt-3 rounded-md">
          <h3 className="font-bold italic mb-2">Syarat dan Ketentuan</h3>
          <ul className="italic list-decimal">
            {syaratDanKetentuan.map((tc, index) => {
              return (
                <div className="ml-4" key={index}>
                  <li>{tc}</li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="form-control flex flex-row items-center mt-2">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              name="checked"
              className="checkbox rounded-sm checkbox-info"
              onClick={handleIsChecked}
            />
          </label>
          <span className="label-text">
            Saya telah membaca dan memahami syarat dan ketentuan dokumen legal
            diatas.
          </span>
        </div>

        <div className="flex justify-end">
          <button
            className="btn bg-primary text-white btn-sm mb-10 mt-5 p-5 content-center rounded-md"
            onClick={handleSubmit}
            disabled={!isChecked}
          >
            Submit
          </button>
        </div>
      </div>
    );
  } else if (type === "Perorangan") {
    return (
      <div>
        <InputFile
          label="KTP"
          errors={errors.ktp}
          onFileChange={handleFileChange("ktp")}
        />
        <InputFile
          label="NPWP"
          errors={errors.npwp}
          onFileChange={handleFileChange("npwp")}
        />
        <InputFile
          label="Sertifikasi ISO"
          errors={errors.iso}
          isRequired={false}
          onFileChange={handleFileChange("iso")}
        />
        <label className="form-control w-full">
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

        <div className="text-sm bg-[#DFEBFD] p-5 mt-3 rounded-md">
          <h3 className="font-bold italic mb-2">Syarat dan Ketentuan</h3>
          <ul className="italic list-decimal">
            {syaratDanKetentuan.map((tc, index) => {
              return (
                <div className="ml-4" key={index}>
                  <li>{tc}</li>
                </div>
              );
            })}
          </ul>
        </div>

        <div className="form-control flex flex-row items-center mt-2">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              name="checked"
              className="checkbox rounded-sm checkbox-info"
              onClick={handleIsChecked}
            />
          </label>
          <span className="label-text">
            Saya telah membaca dan memahami syarat dan ketentuan dokumen legal
            diatas.
          </span>
        </div>

        <div className="flex justify-end">
          <button
            className="btn bg-primary text-white btn-sm mb-10 mt-5 p-5 content-center rounded-md"
            onClick={handleSubmit}
            disabled={!isChecked}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
