import { syaratDanKetentuan } from "../tc";

export default function Approved({ type, dataLegal }) {
  const InputApprovedLegal = ({ label, link }) => {
    const redirectLink = () => {
      window.open(link, "_blank");
    };
    return (
      <div className="mt-3">
        <div className="label flex flex-col justify-start items-start">
          <span className="label-text font-bold text-base">{label}</span>
        </div>
        <div className="flex">
          <div className="w-full flex items-center text-center cursor-pointer hover:bg-blue-100 duration-300 rounded-lg input input-bordered">
            <input
              onClick={redirectLink}
              value={`${label}.pdf`}
              readOnly
              className="w-full text-[16px] items-center cursor-pointer truncate"
            />
            <button className="h-auto mr-[-10px] py-1 w-[180px] bg-primary hover:bg-slate-400 rounded-lg text-white font-bold text-[16px]">
              Pilih File
            </button>
          </div>
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
          <div className="text-sm bg-[#DFEBFD] p-5 rounded-md">
            <h3 className="font-bold italic mb-2">Syarat dan Ketentuan</h3>
            <ul className="italic  list-decimal">
              {syaratDanKetentuan.map((tc, index) => {
                return (
                  <div className="ml-4" key={index}>
                    <li>{tc}</li>
                  </div>
                );
              })}
            </ul>
          </div>
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
          <div className="text-sm bg-[#DFEBFD] p-5 rounded-md mt-5 mb-8">
            <h3 className="font-bold italic mb-2">Syarat dan Ketentuan</h3>
            <ul className="italic  list-decimal">
              {syaratDanKetentuan.map((tc, index) => {
                return (
                  <div className="ml-4" key={index}>
                    <li>{tc}</li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
