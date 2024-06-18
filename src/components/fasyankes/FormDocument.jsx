import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFile from "./utils/InputFile";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const FormDocument = ({ typeFasyankes, handlePrevious, handleNext }) => {
  return (
    <div>
      {typeFasyankes === "Apotek" ? (
        <div>
          <InputFile label="Surat Izin Apotak (SIA)" />
          <InputFile label="Surat Izin Praktek Apoteker (SIPA)" />
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
              Next <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      ) : typeFasyankes === "Klinik" ? (
        <div>
          <InputFile label="Surat Izin Mendirikan Klinik (SIMK)" />
          <InputFile label="Surat Izin Operasional Klinik" />
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
              Next <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
