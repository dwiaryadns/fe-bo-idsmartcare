const InputFile = (props) => {
  return (
    <div className="mb-3">
      <div className="label flex flex-col justify-start items-start">
        <span className="label-text font-bold text-base">
          {props.label}{" "}
          <span className="text-red-600">
            {" "}
            {props.isRequired ? "(optional)" : "*"}
          </span>
        </span>
        <span className="text-xs text-gray-500">
          Unggah foto {props.label} Direktur dalam format PDF dengan ukuran maksimal 20MB
        </span>
      </div>
      <input
        type="file"
        className="file-input file-input-bordered file-input-info w-full rounded-md "
      />
    </div>
  );
};

export default InputFile;
