import Layout from "../../components/Layout";
import {
  faChevronLeft,
  faFile,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DetailFasyankesPage({ data, handleBack }) {
  console.log(data);
  return (
    <Layout title={`Detail Fasyankes  - ${data.name}`} icon={faHospital}>
      <div className="card">
        <div className="card-body shadow-md rounded-md">
          <InputApproved label={"Nama Fasyankes"} value={data.name} />
          <InputApproved label={"Email Fasyankes"} value={data.email} />
          <InputApproved label={"Tipe Fasyankes"} value={data.type} />
          <InputApproved label={"Nama PIC"} value={data.pic} />
          <InputApproved label={"Nomor PIC"} value={data.pic_number} />
          <InputApproved label={"Address"} value={data.address} />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <InputApproved label={"Latitude"} value={data.latitude} />
            <InputApproved label={"Longitude"} value={data.longitude} />
          </div>
          <InputApproved label={"Nomor PIC"} value={data.pic_number} />
          <InputApproved label={"Gudang"} value={data.warehouse.name} />

          {data.type === "Klinik" && data.legal_doc && (
            <div>
              <LegalDoc
                label={"Surat Izin Mendirikan Klinik (SIMK)"}
                url={data.legal_doc.simk}
              />
              <LegalDoc
                label={"Surat Izin Operasional Klinik"}
                url={data.legal_doc.siok}
              />
            </div>
          )}
          {data.type === "Apotek" && data.legal_doc && (
            <div>
              <LegalDoc
                label={"Surat Izin Prakter Apoteker (SIPA)"}
                url={data.legal_doc.sipa}
              />
              <LegalDoc
                label={"Surat Izin Apotek (SIA)"}
                url={data.legal_doc.sia}
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              className="btn bg-primary hover:bg-primary text-white rounded-md"
              onClick={handleBack}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Kembali
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function InputApproved({ label, value }) {
  return (
    <div className="form-control w-full flex md:flex-row flex-col  md:items-center mb-5">
      <div className="label min-w-56">
        <span className="label-text font-bold text-base">{label}</span>
      </div>

      <div className="w-full">
        <input
          type="text"
          value={value}
          disabled
          className={`input disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none input-bordered w-full input-primary rounded-md `}
        />
      </div>
    </div>
  );
}

function LegalDoc({ label, url }) {
  return (
    <div className="form-control w-full flex md:flex-row flex-col  md:items-center mb-5">
      <div className="label min-w-56">
        <span className="label-text font-bold text-base">{label}</span>
      </div>
      <a
        href={url}
        target="_blank"
        className="no-underline text-center gap-2 items-center w-full bg-blue-100 text-black p-3 rounded-md flex justify-center"
      >
        <FontAwesomeIcon icon={faFile} /> Lihat Dokumen
      </a>
    </div>
  );
}
