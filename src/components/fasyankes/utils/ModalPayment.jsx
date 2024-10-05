import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

export default function ModalPayment({ data }) {
  const modalRef = useRef();
  const formatRupiah = (amount) => {
    return "Rp " + new Intl.NumberFormat("id-ID").format(amount);
  };
  const InfoBill = (info, instansi, alamat, email) => {
    return (
      <div>
        <div className="text-primary font-bold">{info}</div>
        <div className="font-bold">{instansi}</div>
        <div>{alamat} </div>
        <div>{email} </div>
      </div>
    );
  };
  const closeModal = () => {
    modalRef.current.close();
  };
  return (
    <>
      <dialog id="payment-modal" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-7xl">
          <div className="text-justify">
            <div className="flex justify-between">
              <div>
                <button
                  className="btn bg-primary text-white hover:bg-primary rounded-full"
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="font-bold">No. Invoice</td>
                    <td className="font-bold">:</td>
                    <td>[ INV_NUMBER ]</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Tanggal Tagihan</td>
                    <td className="font-bold">:</td>
                    <td>[ TGL_TAGIHAN ]</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Tanggal Jatuh Tempo</td>
                    <td className="font-bold">:</td>
                    <td>[ TGL_JATUH_TEMPO ]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              {InfoBill(
                "Dari :",
                "PT.Digital Nusantara Sinergi",
                "Jl. RP. Soeroso No.25 9, RT.9/RW.5,Cikini, Kec. Menteng, Kota Jakarta Pusat, DKI Jakarta 10330 +62 852 18982730",
                "info@dnstech.co.id"
              )}

              {InfoBill(
                "Ke :",
                data.fasyankes.name,
                data.fasyankes.address,
                data.fasyankes.email
              )}

              <div className="flex flex-col text-end">
                <div>Pembayaran : </div>
                <div>[METODE PEMBAYARAN]</div>
              </div>
            </div>
            <div className="mt-9 mb-10">
              <div className="font-bold">
                Total Amount Due : {formatRupiah(data.total)}
              </div>
              <div className="text-xs">ORDER ID : [ORDER_ID]</div>
              <div className="mt-5">
                <table className="table">
                  <thead className="bg-primary text-white rounded-md">
                    <tr>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-bold">
                      <td>
                        {data.type} - {data.package}
                      </td>
                      <td>
                        Rp {data.package === "Plus" ? data.price.plus : ""}
                        {data.package === "Advanced" ? data.price.advanced : ""}
                        {data.package === "FREE" ? data.price.free : ""}
                      </td>
                    </tr>
                    {data.duration === "Annually" && (
                      <tr>
                        <td className="text-end font-bold italic">
                          Diskon 20% - (Annually)
                        </td>
                        <td>{formatRupiah(data.diskon)}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="text-end font-bold italic">Tax</td>
                      <td>{formatRupiah(data.tax)}</td>
                    </tr>

                    <tr>
                      <td className="text-end font-bold italic">Total</td>
                      <td className="text-primary font-bold">
                        {formatRupiah(data.total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
