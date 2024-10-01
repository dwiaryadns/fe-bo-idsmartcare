import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL } from "../../dummy/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import bgLogin from "../../assets/bg-login.png";
import logoLogin from "../../assets/logo.png";
import imgOtp from "../../assets/img-otp.png";
import { CenterAlert, ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

export const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [countdownSendOtp, setCountdownSendOtp] = useState(120);
  const [countdownVerifyOtp, setCountdownVerifyOtp] = useState(300);
  const [isSendButtonActive, setIsSendButtonActive] = useState(false);
  const [isVerifyButtonActive, setIsVerifyButtonActive] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const verifyStartTime = localStorage.getItem("verify_countdown_start_time");
    const resendStartTime = localStorage.getItem("resend_countdown_start_time");

    const currentTime = Math.floor(Date.now() / 1000);

    if (verifyStartTime) {
      const verifyElapsedTime = currentTime - parseInt(verifyStartTime, 10);
      const verifyRemainingTime = 300 - verifyElapsedTime;
      if (verifyRemainingTime > 0) {
        setCountdownVerifyOtp(verifyRemainingTime);
      } else {
        setIsVerifyButtonActive(true);
        setCountdownVerifyOtp(0);
      }
    } else {
      localStorage.setItem("verify_countdown_start_time", currentTime);
    }

    if (resendStartTime) {
      const resendElapsedTime = currentTime - parseInt(resendStartTime, 10);
      const resendRemainingTime = 120 - resendElapsedTime;
      if (resendRemainingTime > 0) {
        setCountdownSendOtp(resendRemainingTime);
      } else {
        setIsSendButtonActive(true);
        setCountdownSendOtp(0);
      }
    } else {
      localStorage.setItem("resend_countdown_start_time", currentTime);
    }
  }, []);

  useEffect(() => {
    if (countdownVerifyOtp > 0) {
      const verifyTimer = setTimeout(
        () => setCountdownVerifyOtp(countdownVerifyOtp - 1),
        1000
      );
      return () => clearTimeout(verifyTimer);
    } else {
      setIsVerifyButtonActive(true);
    }
  }, [countdownVerifyOtp]);

  useEffect(() => {
    if (countdownSendOtp > 0) {
      const resendTimer = setTimeout(
        () => setCountdownSendOtp(countdownSendOtp - 1),
        1000
      );
      return () => clearTimeout(resendTimer);
    } else {
      setIsSendButtonActive(true);
    }
  }, [countdownSendOtp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const location = useLocation();
  const otpId = location.state?.otpId;
  const [resendOtpId, setResentOtpId] = useState();

  const [step, setStep] = useState(0);
  const handleClickHere = () => {
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
    setNewEmail(null);
  };

  const [newEmail, setNewEmail] = useState(null);
  const handleNewEmail = (e) => {
    const value = e.target.value;
    const validEmailChars = /^[A-Z0-9._%+-@]*$/i;

    if (validEmailChars.test(value)) {
      setNewEmail(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      newEmail: "",
      email: "",
    }));
  };

  const handleSendOtp = () => {
    if (!otp) {
      ToastAlert("error", "OTP Wajib Diisi.");
      return;
    }
    setLoading(true);
    const payload = {
      email: email,
      otp: otp,
      otp_id:
        resendOtpId == null || resendOtpId == undefined ? otpId : resendOtpId,
      is_register: true,
    };
    axios
      .post(API_BASE_URL + "/store-otp", payload, {
        headers: {
          Authorization: `Bearer ${ACCESS_HEADER}`,
        },
      })
      .then(function (response) {
        if (response.data.status === true) {
          setTimeout(() => {
            setLoading(false);
            ToastAlert("success", "Verifikasi Berhasil");
            setTimeout(() => {
              localStorage.clear();
              navigate("/login");
            }, 1500);
          }, 2000);
        } else {
          setLoading(false);
          ToastAlert("error", response.data.message);
        }
      })
      .catch(function (error) {
        setLoading(false);
        ToastAlert("error", error.response.data.message);
      });
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(API_BASE_URL + "/resend-otp", {
        email: email,
      });
      if (response.data.status === true) {
        setStep(0);
        setResentOtpId(response.data.otp_id);
        setCountdownSendOtp(120);
        setIsSendButtonActive(false);
        setOtp("");
        ToastAlert("success", "Silahkan Cek Email Kembali");
        localStorage.setItem(
          "resend_countdown_start_time",
          Math.floor(Date.now() / 1000)
        );
        setCountdownSendOtp(120);
      } else {
        setLoading(false);
        CenterAlert("error", "Oops...", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      ToastAlert("error", error.response.data.message);
    }
  };

  const handleSubmitClickHere = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_BASE_URL + "/change-email", {
        old_email: email,
        new_email: newEmail,
      });
      if (response.data.status === true) {
        setStep(0);
        setLoading(false);
        setResentOtpId(response.data.otp_id);
        localStorage.setItem("email", newEmail);
        ToastAlert("success", "Email Berhasil Diubah");
        localStorage.setItem(
          "resend_countdown_start_time",
          Math.floor(Date.now() / 1000)
        );
        setCountdownSendOtp(120);
        setIsSendButtonActive(false);
      } else {
        setLoading(false);
        CenterAlert("error", "Oops...", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      ToastAlert("error", error.response.data.message);
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={bgLogin}
        className="absolute inset-0 w-full h-full z-0"
        alt="Background"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
        <div className="card md:w-11/12 bg-gradient-to-b from-cyan-500 to-white shadow-xl">
          <div className="flex justify-end mr-5">
            <img src={logoLogin} className="w-60 mt-5" alt="Logo" />
          </div>
          <div className="card-body">
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={imgOtp} className="min-w-96" alt="OTP" />
                {step === 0 ? (
                  <div>
                    <div className="max-w-2xl mt-0">
                      <h1 className="text-5xl font-bold text-primary">
                        Verifikasi Email Anda
                      </h1>

                      <p className="py-6">
                        Kami telah mengirim email ke{" "}
                        <span className="font-bold">{email}</span> untuk
                        memverifikasi alamat email Anda dan mengaktifkan akun
                        Anda. Kode OTP di dalam email akan kedaluwarsa dalam 5
                        menit.
                      </p>

                      <div className="mb-3 flex">
                        <input
                          type="text"
                          onChange={(e) => setOtp(e.target.value)}
                          className={`input input-bordered w-full rounded-l-md rounded-r-none ${
                            otp.length === 6 ? "disabled" : ""
                          }`}
                          placeholder="Kode OTP"
                        />
                        <button
                          onClick={handleSendOtp}
                          className={`btn bg-primary border-none rounded-l-none hover:bg-primary rounded-md ${
                            isVerifyButtonActive ? "bg-primary" : ""
                          } text-white`}
                        >
                          {loading ? (
                            <Loading type={"bars"} size={"sm"} />
                          ) : (
                            <FontAwesomeIcon icon={faPaperPlane} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs font-bold">
                        {countdownVerifyOtp > 0
                          ? `OTP Kadaluarsa dalam : ${formatTime(
                              countdownVerifyOtp
                            )}`
                          : ""}
                      </p>
                      {countdownVerifyOtp == 0 ? (
                        <div className="mt-4">
                          <button
                            disabled={!isSendButtonActive}
                            onClick={handleResendOtp}
                            className={`btn bg-primary border-none hover:bg-primary rounded-md ${
                              isSendButtonActive ? "bg-primary" : ""
                            } text-white`}
                          >
                            {isSendButtonActive
                              ? "Kirim Ulang OTP"
                              : `${formatTime(countdownSendOtp)}`}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      <p className="text-xs mt-5">
                        <span
                          onClick={handleClickHere}
                          className="font-bold cursor-pointer hover:underline hover:text-primary transition duration-300 ease-in-out"
                        >
                          Klik di sini
                        </span>{" "}
                        jika Anda tidak menerima email atau ingin mengubah
                        alamat email yang Anda gunakan untuk mendaftar.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-2xl">
                    <h1 className="text-5xl font-bold text-primary">
                      Masukkan Email Baru
                    </h1>{" "}
                    <p className="py-6">
                      Kami tidak dapat menyelesaikan verifikasi dengan email{" "}
                      <span className="font-bold">{email}</span>. Silakan
                      masukkan alamat email baru untuk menerima kode OTP yang
                      baru.
                    </p>
                    <div className="flex items-center mt-5 w-full gap-1">
                      <input
                        className={`input ${
                          errors.newEmail || errors.email
                            ? "input-error"
                            : "input-primary"
                        }  w-full rounded-md`}
                        placeholder="Masukkan Email Baru"
                        value={newEmail}
                        onChange={handleNewEmail}
                      />

                      <button
                        onClick={handleSubmitClickHere}
                        className="btn bg-primary hover:bg-primary text-white rounded-md border-none"
                      >
                        {loading ? (
                          <Loading type={"bars"} size={"sm"} />
                        ) : (
                          "Kirim"
                        )}
                      </button>
                    </div>
                    <span className="text-xs flex text-red-600">
                      {errors.newEmail ||
                        (errors.email && (
                          <div>
                            {errors.newEmail && errors.newEmail}
                            {errors.email && errors.email}
                          </div>
                        ))}
                    </span>
                    <button
                      onClick={handleBack}
                      className="btn mt-5 btn-sm bg-info hover:bg-info text-white rounded-md border-none"
                    >
                      <FontAwesomeIcon icon={faChevronCircleLeft} />
                      Kembali
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
