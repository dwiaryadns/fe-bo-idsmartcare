import {
  faAngleLeft,
  faCreditCard,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { API_BASE_URL, headers } from "../../dummy/const";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const FormPembayaranFasyankes = ({ handlePrevious, payment }) => {
  const [diskon, setDiskon] = useState(0);
  const [total, setTotal] = useState(0);
  console.log(total);

  console.log(payment);
  useEffect(() => {
    let calculatedDiskon = 0;
    let calculatedTotal = 0;

    if (payment.duration === "Annually") {
      if (payment.package === "Plus") {
        calculatedDiskon = payment.price.plus - payment.price.plusAnnually;
        calculatedTotal = payment.price.plusAnnually;
      } else if (payment.package === "Advanced") {
        calculatedDiskon =
          payment.price.advanced - payment.price.advancedAnnually;
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

  console.log(payment.fasyankes);
  const navigate = useNavigate();

  const [snapToken, setSnapToken] = useState();
  
  const handlePayment = async () => {
    const payload = {
      amount: total,
      package: payment.package,
      type: payment.type,
      name: payment.fasyankes.name,
      email: payment.fasyankes.email,
      pic_number: payment.fasyankes.pic_number,
      subscription_plan_id: payment.subscription_id,
    };
    const response = await axios.post(
      API_BASE_URL + "/create-transaction",
      payload,
      headers
    );
    setSnapToken(response.data.snap_token);
  };

  useEffect(() => {
    if (snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Success:", result);
          navigate("/fasyankes");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Pembayaran Berhasil",
          });
        },
        onPending: (result) => {
          console.log("Pending:", result);
          navigate("/subscription");

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "warning",
            title: "Pembayaran Anda Pending",
          });
        },
        onError: (result) => {
          console.log("Error:", result);
        },
        onClose: () => {
          console.log(
            "Customer closed the popup without finishing the payment"
          );
        },
      });
    }
  }, [snapToken]);

  const [checkbox, setCheckbox] = useState(false);
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

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

      {snapToken && <div id="snap-checkout" />}
      <div className="flex">
        <input
          type="checkbox"
          onClick={handleCheckbox}
          className="checkbox checkbox-primary rounded-md"
        />
        <p className="text-sm">
          Dengan melakukan pembayaran, kamu setuju dengan Syarat dan Ketentuan
          pembelian di idSmartCare.
        </p>
      </div>
      <button className="btn btn-block btn-primary hover:btn-primary text-white rounded-md my-4">
        <FontAwesomeIcon icon={faFileInvoice} /> View Invoice
      </button>
      <button
        onClick={handlePayment}
        className="btn btn-block btn-warning hover:btn-warning text-white rounded-md"
      >
        <FontAwesomeIcon icon={faCreditCard} /> Payment
      </button>
      <button
        onClick={handlePrevious}
        className="hidden mt-10 btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
      >
        <FontAwesomeIcon icon={faAngleLeft} /> Previous
      </button>
    </div>
  );
};
