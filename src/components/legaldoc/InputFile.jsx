const InputFile = ({ label, isRequired, onFileChange, errors }) => {
  return (
    <div className="mb-3">
      <div className="label flex flex-col justify-start items-start">
        <span className="label-text font-bold text-base">
          {label}{" "}
          <span className="text-red-600">
            {" "}
            {isRequired === false ? "(optional)" : "*"}
          </span>
        </span>
        <span className="text-xs text-gray-500">
          Unggah foto {label} dalam format PDF dengan ukuran maksimal 20MB
        </span>
      </div>
      <input
        type="file"
        className={`file-input file-input-bordered file-input-info w-full rounded-md ${
          errors ? "file-input-error" : ""
        }`}
        onChange={onFileChange}
      />
      {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
    </div>
  );
};

export default InputFile;
