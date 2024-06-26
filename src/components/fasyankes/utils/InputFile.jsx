const InputFile = (props) => {
  return (
    <div className="mb-3">
      <div className="label flex flex-col justify-start items-start">
        <span className="label-text font-bold text-base">
          {props.label} <span className="text-red-600">*</span>
        </span>
        <span className="text-xs text-gray-500">
          Unggah {props.label} dalam format PDF dengan ukuran maksimal 20MB
        </span>
      </div>
      <input
        type="file"
        className={`file-input file-input-bordered file-input-info w-full rounded-md ${
          props.error ? "file-input-error" : ""
        }`}
        onChange={props.onFileChange}
      />
      {props.error && (
        <p className="text-red-500 text-xs mt-1">{props.error}</p>
      )}
    </div>
  );
};

export default InputFile;
