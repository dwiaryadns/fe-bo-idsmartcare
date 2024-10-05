import {
  faAngleLeft,
  faCreditCard,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastAlert } from "../Alert";
import ModalPayment from "./utils/ModalPayment";

export const FormPembayaranFasyankes = ({ handlePrevious, payment }) => {
  console.log("payment");
  console.log(payment);
  const [diskon, setDiskon] = useState(0);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [snapToken, setSnapToken] = useState();
  const [tax, setTax] = useState(0);
  const [dataPayment, setDataPayment] = useState(payment);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    let calculatedDiskon = 0;
    let calculatedSubtotal = 0;

    const convertToNumber = (value) => {
      const numValue = parseInt(value.toString().replace(/\D/g, ""), 10);
      return isNaN(numValue) ? 0 : numValue;
    };
    console.log(
      convertToNumber(payment.price.plus) -
        convertToNumber(payment.price.plusAnnually)
    );
    if (payment.duration === "Annually") {
      if (payment.package === "Plus") {
        calculatedDiskon =
          convertToNumber(payment.price.plus) -
          convertToNumber(payment.price.plusAnnually);
        calculatedSubtotal = convertToNumber(payment.price.plusAnnually);
      } else if (payment.package === "Advanced") {
        calculatedDiskon =
          convertToNumber(payment.price.advanced) -
          convertToNumber(payment.price.advancedAnnually);
        calculatedSubtotal = convertToNumber(payment.price.advancedAnnually);
      }
    } else {
      if (payment.package === "Plus") {
        calculatedSubtotal = convertToNumber(payment.price.plus);
      } else if (payment.package === "Advanced") {
        calculatedSubtotal = convertToNumber(payment.price.advanced);
      } else if (payment.package === "FREE") {
        calculatedSubtotal = convertToNumber(payment.price.free);
      }
    }
    setDiskon(calculatedDiskon);
    setSubtotal(calculatedSubtotal);
    const calculatedTax = Math.round(calculatedSubtotal * (11 / 100));
    setTax(calculatedTax);
    const calculatedTotal = calculatedSubtotal + calculatedTax;
    setTotal(calculatedTotal);
    setDataPayment({
      ...dataPayment,
      total: calculatedTotal,
      subtotal: calculatedSubtotal,
      tax: calculatedTax,
      diskon: calculatedDiskon,
    });
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };
  const handlePayment = async () => {
    const payload = {
      amount: total,
      package: payment.package,
      type: payment.type,
      name: payment.fasyankes.name,
      email: payment.fasyankes.email,
      tax: tax,
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

  const handleCheckInvoice = () => {
    document.getElementById("payment-modal").showModal();
  };

  useEffect(() => {
    if (snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Success:", result);
          navigate("/fasyankes");
          ToastAlert("success", "Pembayaran Berhasil");
        },
        onPending: (result) => {
          console.log("Pending:", result);
          navigate("/subscription");
          ToastAlert("success", "Pembayaran Pending");
        },
        onError: (result) => {
          console.log("Pending:", result);
          ToastAlert("success", "Pembayaran Gagal");
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
      <ModalPayment data={dataPayment} />
      <div className="font-bold text-xl">Pembayaran</div>
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
        <>
          <hr className="mb-3" />
          <div className="flex justify-between items-center my-4">
            <h5 className="text-lg">Disc 20% (Annually)</h5>
            <span className="font-bold">Rp {formatRupiah(diskon)}</span>
          </div>
        </>
      )}
      <hr className="mb-3" />
      <div className="flex justify-end items-center my-4 gap-6">
        <span className="font-bold ">PPN (11%)</span>
        <span className="font-bold">Rp {formatRupiah(tax)}</span>
      </div>

      <hr className="mb-3" />
      <div className="flex justify-end items-center my-4 gap-6">
        <span className="font-bold italic">Total</span>
        <span className="font-bold">Rp {formatRupiah(total)}</span>
      </div>
      <hr />
      {/* <div className="font-bold text-xl my-3">Voucher</div>
      <div className="flex md:flex-row flex-col ">
        <input
          placeholder="Masukkan Kode Voucher"
          className="input input-md w-full  input-primary rounded-md"
        />
        <button className="btn btn-md bg-primary hover:bg-primary text-white rounded-md">
          Verifikasi
        </button>
      </div> */}
      {snapToken && <div id="snap-checkout" />}
      <div className="flex gap-3 items-center mt-3">
        <input
          type="checkbox"
          onClick={handleCheckbox}
          className="checkbox checkbox-primary rounded-md"
        />

        <p className="text-sm">
          Dengan melakukan pembayaran, kamu setuju dengan{" "}
          <Link
            target="_blank"
            to={"/fasyankes/syarat-ketentuan-pembelian"}
            className="text-primary italic font-bold"
          >
            {" "}
            Syarat dan Ketentuan Pembelian
          </Link>{" "}
          di idSmartCare.
        </p>
      </div>
      <button
        onClick={handleCheckInvoice}
        className="btn btn-block btn-primary hover:btn-primary text-white rounded-md my-4"
      >
        <FontAwesomeIcon icon={faFileInvoice} /> Lihat Invoice
      </button>
      <button
        onClick={handlePayment}
        disabled={!checkbox}
        className="btn btn-block  btn-warning hover:btn-warning text-white rounded-md"
      >
        <FontAwesomeIcon icon={faCreditCard} /> Bayar
      </button>
      <button
        onClick={handlePrevious}
        className="hidden mt-10 btn bg-primary p-5 content-center hover:bg-primary text-white rounded-md btn-sm items-center"
      >
        <FontAwesomeIcon icon={faAngleLeft} /> Kembali
      </button>
    </div>
  );
};
