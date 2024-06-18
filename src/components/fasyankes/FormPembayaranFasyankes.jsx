import { faAngleLeft, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const FormPembayaranFasyankes = ({ handlePrevious, payment }) => {
  const [diskon, setDiskon] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let calculatedDiskon = 0;
    let calculatedTotal = 0;

    if (payment.duration === "Annually") {
      if (payment.package === "Plus") {
        calculatedDiskon = payment.price.plus - payment.price.plusAnnually;
        calculatedTotal = payment.price.plusAnnually;
      } else if (payment.package === "Advanced") {
        calculatedDiskon = payment.price.advanced - payment.price.advancedAnnually;
        calculatedTotal = payment.price.advancedAnnually;
      }
    } else {
      if (payment.package === "Plus") {
        calculatedTotal = payment.price.plus;
      } else if (payment.package === "Advanced") {
        calculatedTotal = payment.price.advanced;
      } else if (payment.package === "FREE") {
        calculatedTotal = payment.price.free;
      }
    }

    setDiskon(calculatedDiskon);
    setTotal(calculatedTotal);
  }, [payment]);

  return (
    <div>
      <div className="font-bold text-xl">Payment</div>
      <hr />
      <div className="flex justify-between items-center my-4">
        <h5 className="text-lg">
          {payment.type} - {payment.package}
        </h5>
        <span className="font-bold">
          Rp {payment.package === "Plus" ? payment.price.plus : ""}
          {payment.package === "Advanced" ? payment.price.advanced : ""}
          {payment.package === "FREE" ? payment.price.free : ""}
        </span>
      </div>
      {payment.duration === "Annually" && (
        <div className="flex justify-between items-center my-4">
          <h5 className="text-lg">Disc 20% (Annually)</h5>
          <span className="font-bold">Rp {diskon}.000</span>
        </div>
      )}
      <hr className="mb-3" />
      <div className="flex justify-end items-center my-4 gap-6">
        <span className="font-bold italic">Total</span>
        <span className="font-bold">Rp {total}</span>
      </div>
      <hr />
      <button className="btn btn-block btn-warning hover:btn-warning text-white rounded-md">
        <FontAwesomeIcon icon={faCreditCard} /> Payment
      </button>
      <button
        onClick={handlePrevious}
        className="mt-10 btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
      >
        <FontAwesomeIcon icon={faAngleLeft} /> Previous
      </button>
    </div>
  );
};
