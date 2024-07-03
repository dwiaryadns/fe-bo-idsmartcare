import { faCheck, faClone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export const ModalPayNow = ({ id, qr, type, va, refreshData }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const [isCopy, setIsCopy] = useState(false);
  const handlePayment = () => {
    navigate("/subscription");
    window.location.reload();
    modalRef.current.close();
  };

  const handleCopy = (e) => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  return (
    <div>
      <dialog id={id} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-lg px-10">
          <form method="dialog">
            <button
              onClick={handlePayment}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            {type === "qris" ? (
              <div>
                <div className="flex justify-between mt-10 items-center text-md border-b-2">
                  <p>Total Pembayaran</p>
                  <p>Rp 199.000</p>
                </div>
                <div className="flex justify-between mt-5 items-center text-md border-b-2">
                  <p>Jatuh Tempo</p>
                  <p>23 Jam 15 Menit 5 Detik</p>
                </div>
                <div className="flex flex-col justify-center">
                  <img className="w-72 self-center" src={qr} />
                </div>
              </div>
            ) : (
              <div>
                <div className="">
                  <div className="flex justify-between mt-10 items-center text-md border-b-2">
                    <p>Total Pembayaran</p>
                    <p>Rp 199.000</p>
                  </div>
                  <div className="flex justify-between mt-5 items-center text-md border-b-2">
                    <p>Jatuh Tempo</p>
                    <p>23 Jam 15 Menit 5 Detik</p>
                  </div>
                  <div className="flex justify-between mt-10 items-center mb-10">
                    <div> Kode Pembayaran</div>
                    <div className="flex gap-4 items-center">
                      <p className="text-lg">{va}</p>
                      <div
                        className={`${
                          isCopy ? "tooltip tooltip-open" : ""
                        }  tooltip-top`}
                        data-tip="Copied!"
                      >
                        <div
                          className={` transition duration-300 ease-in-out ${
                            isCopy ? " text-green-500" : "text-primary"
                          }`}
                          onClick={() => {
                            window.navigator.clipboard.writeText(va);
                            handleCopy();
                          }}
                        >
                          {isCopy ? (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-lg"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faClone}
                              className="cursor-pointer text-lg"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn bg-primary hover:bg-primary text-white btn-block rounded-md mb-0"
              onClick={handlePayment}
            >
              OK
            </button>
            <p className="text-center text-xs mt-1">
              Jika kamu sudah melakukan Pembayaran Click OK
            </p>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
