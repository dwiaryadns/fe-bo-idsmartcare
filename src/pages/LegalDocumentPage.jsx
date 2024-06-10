import { faLegal } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InputFile from "../components/legaldoc/InputFile";
import { useState } from "react";
import StatusLegal from "../components/legaldoc/StatusLegal";

const LegalDocumentPage = () => {
  const [type, setType] = useState(true);
  const handleType = () => {
    setType(!type);
  };

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Legal Document" icon={faLegal} />
            <div>
              <button onClick={() => handleType(!type)}>
                {type ? "Perusahaan" : "Perorangan"}
              </button>

              {type ? (
                <>
                  <InputFile label="KTP Direktur Berdasarkan Akta" />
                  <InputFile label="Akta Perusahaan (Perubahan/Terbaru)" />
                  <InputFile label="SK Kemenkumham Akta (Perubahan/Terbaru)" />
                  <InputFile label="NPWP Perusahaan" />
                  <InputFile label="Nomor Induk Berusaha (NIB)" />
                  <InputFile label="Sertifikasi ISO" isRequired="false" />
                </>
              ) : (
                <>
                  <InputFile label="KTP" />
                  <InputFile label="NPWP" />
                  <InputFile label="Sertifikasi ISO" isRequired="false" />
                </>
              )}

              <div className="flex justify-end">
                <button className="btn bg-primary text-white btn-sm mb-10 mt-5 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentPage;
