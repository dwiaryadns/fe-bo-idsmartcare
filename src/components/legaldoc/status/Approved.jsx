export default function Approved({ type, dataLegal }) {
  const InputApprovedLegal = ({ label, link }) => {
    const redirectLink = () => {
      window.open(link, "_blank");
    };
    return (
      <div className="mb-3">
        <div className="label flex flex-col justify-start items-start">
          <span className="label-text font-bold text-base">{label}</span>
        </div>
        <div className="flex">
          <input
            onClick={redirectLink}
            value={"Click Here"}
            readOnly
            className="w-full items-center text-center cursor-pointer hover:bg-blue-100 duration-300 rounded-r-none rounded-l-md input input-bordered"
          />
          <button className="btn bg-primary hover:bg-primary rounded-l-none rounded-r-md text-white font-bold">
            Change File
          </button>
        </div>
      </div>
    );
  };
  return (
    <div>
      {type === "Perorangan" ? (
        <div>
          <InputApprovedLegal label={"KTP"} link={dataLegal.ktp} />
          <InputApprovedLegal label={"NPWP"} link={dataLegal.npwp} />
          {dataLegal.iso != null ? (
            <InputApprovedLegal
              label={"Sertifikasi ISO"}
              link={dataLegal.iso}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <InputApprovedLegal
            label="KTP Direktur Berdasarkan Akta"
            link={dataLegal.ktp}
          />
          <InputApprovedLegal
            label="Akta Perusahaan (Perubahan/Terbaru)"
            link={dataLegal.akta}
          />
          <InputApprovedLegal
            label="SK Kemenkumham Akta (Perubahan/Terbaru)"
            link={dataLegal.sk_kemenkumham}
          />
          <InputApprovedLegal label="NPWP Perusahaan" link={dataLegal.npwp} />
          <InputApprovedLegal
            label="Nomor Induk Berusaha (NIB)"
            link={dataLegal.nib}
          />
          {dataLegal.iso != null ? (
            <InputApprovedLegal
              label={"Sertifikasi ISO"}
              link={dataLegal.iso}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
