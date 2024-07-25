import { faCheck, faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export const ModalDetailSupplier = ({ supplierId, data }) => {
  const modalRef = useRef();

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (value, field) => {
    window.navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 3000);
    });
  };

  const renderCopyIcon = (field, value) => (
    <div
      className={`tooltip ${
        copiedField === field ? "tooltip-open" : ""
      } tooltip-top`}
      data-tip="Copied!"
    >
      <div
        className={`transition duration-300 ease-in-out ${
          copiedField === field ? "text-green-500" : "text-primary"
        }`}
        onClick={() => handleCopy(value, field)}
      >
        {copiedField === field ? (
          <FontAwesomeIcon icon={faCheck} className="text-lg" />
        ) : (
          <FontAwesomeIcon icon={faClone} className="cursor-pointer text-lg" />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <dialog id={supplierId} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-5xl px-10 text-lg">
          <div className="flex justify-between bg-primary text-white rounded-md p-4 items-center text-md border-b-2">
            <p>Detail Supplier ( {data.supplier_id} )</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table text-lg">
              <tbody>
                <tr>
                  <td>Nama Supplier</td>
                  <td>{data.nama}</td>
                </tr>
                <tr>
                  <td>Tipe Supplier</td>
                  <td>{data.tipe}</td>
                </tr>
                <tr>
                  <td>Alamat Supplier</td>
                  <td>
                    {data.alamat}, {data.desa}, {data.kecamatan}, {data.kota},{" "}
                    {data.provinsi}, {data.kode_pos}
                  </td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>{data.website}</td>
                </tr>
                <tr>
                  <td>NPWP</td>
                  <td>{data.npwp}</td>
                </tr>
                <tr>
                  <td>Kontak</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.telp}
                      {renderCopyIcon("telp", data.telp)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.pic_email}
                      {renderCopyIcon("pic_email", data.pic_email)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Nama PIC</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.pic_name}
                      {renderCopyIcon("pic_name", data.pic_name)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Kontak PIC</td>
                  <td>
                    <div className="flex flex-row gap-3">
                      {data.pic_contact}
                      {renderCopyIcon("pic_contact", data.pic_contact)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Tanggal Kerjasama</td>
                  <td>
                    {data.start_pks_date} s.d. {data.end_pks_date}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
