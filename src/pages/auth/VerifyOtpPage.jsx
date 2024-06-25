import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL, API_OTP_URL } from "../../dummy/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import bgLogin from "../../assets/bg-login.png";
import logoLogin from "../../assets/logo.png";
import imgOtp from "../../assets/img-otp.png";
import Swal from "sweetalert2";

export const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [countdownSendOtp, setCountdownSendOtp] = useState(120); // 2 minutes
  const [countdownVerifyOtp, setCountdownVerifyOtp] = useState(300); // 5 minutes
  const [isSendButtonActive, setIsSendButtonActive] = useState(false);
  const [isVerifyButtonActive, setIsVerifyButtonActive] = useState(false);
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
  const handleSendOtp = () => {
    setLoading(true);
    const payload = {
      email: email, // Ini harus diganti dengan email atau data yang benar sesuai dengan API Anda
      otp: otp,
      otp_id: otpId,
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
            Swal.fire({
              icon: "success",
              title: "Verification Successfully",
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

            setTimeout(() => {
              localStorage.clear();
              navigate("/login");
            }, 1500);
          }, 2000);
        }
      })
      .catch(function (error) {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      });
  };

  const handleResendOtp = () => {
    localStorage.setItem(
      "resend_countdown_start_time",
      Math.floor(Date.now() / 1000)
    );
    setCountdownSendOtp(120);
    setIsSendButtonActive(false);
    setOtp("");

    const payload = {
      email: email,
    };
    axios
      .post(API_BASE_URL + "/resend-otp", payload)
      .then(function (response) {
        if (response.data.status === true) {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <div className="max-w-2xl mt-0">
                  <h1 className="text-5xl font-bold text-primary">
                    Verify Your Email
                  </h1>
                  <p className="py-6">
                    We’ve sent an email to{" "}
                    <span className="font-bold">{email}</span> to verify your
                    email address and activate your account. The OTP Code in the
                    email will expire in 5 minutes.
                  </p>
                  <div className="mb-3 flex">
                    <input
                      type="text"
                      onChange={(e) => setOtp(e.target.value)}
                      className={`input input-bordered w-full rounded-l-md rounded-r-none ${
                        otp.length === 6 ? "disabled" : ""
                      }`}
                      placeholder="OTP Code"
                    />
                    <button
                      onClick={handleSendOtp}
                      className={`btn bg-primary border-none rounded-l-none hover:bg-primary rounded-md ${
                        isVerifyButtonActive ? "bg-primary" : ""
                      } text-white`}
                    >
                      {loading ? (
                        <span className="loading loading-bars loading-sm"></span>
                      ) : (
                        <FontAwesomeIcon icon={faPaperPlane} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-bold">
                    {countdownVerifyOtp > 0
                      ? `OTP Expired in : ${formatTime(countdownVerifyOtp)}`
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
                          ? "Resend OTP"
                          : `${formatTime(countdownSendOtp)}`}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-xs mt-5">
                    <span className="font-bold">Click here</span>
                    if you did not receive an email or would like to change the
                    email address you signed up with.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
