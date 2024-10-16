import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import bgLogin from "../../assets/bg-login.png";
import imgLogin from "../../assets/img-login.png";
import logoLogin from "../../assets/logo-login.png";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_HEADER, API_BASE_URL } from "../../dummy/const";
import axios from "axios";

import { CenterAlert, ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [otpId, setOtpId] = useState("");
  const [token, setToken] = useState("");
  const [dataUser, setDataUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const Modal2FA = () => {
    const modalRef = useRef(null);
    const [otp, setOtp] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [loadingModal, setLoadingModal] = useState(false);

    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
      e.preventDefault();
      setLoadingModal(true);

      const payload = {
        email: email,
        otp: otp,
        otp_id: otpId,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/store-otp`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_HEADER}`,
            },
          }
        );

        if (response.data.status) {
          setLoadingModal(false);
          ToastAlert("success", "Verifikasi OTP Berhasil");
          localStorage.setItem("token", token);
          localStorage.setItem("dataBo", dataUser);
          setShowModal(false);
          navigate("/dasbor");
        } else {
          setLoadingModal(false);
          ToastAlert("error", response.data.message);
        }
      } catch (error) {
        setLoadingModal(false);
        ToastAlert(
          "error",
          
          error.response?.data?.message || "Terjadi kesalahan"
        );
      }
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
        }
      };

      if (showModal && modalRef.current) {
        modalRef.current.showModal();
        window.addEventListener("keydown", handleKeyDown); 
      } else if (modalRef.current) {
        modalRef.current.close();
        window.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [showModal]);

    return (
      <div>
        <dialog id="my_modal_1" className="modal" ref={modalRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">OTP Verification</h3>
            <p className="mt-2">Enter the code sent to your email</p>
            <input
              type="text"
              maxLength={6}
              placeholder="Code"
              value={otp} // Bind input value ke state otp
              onChange={(e) => setOtp(e.target.value)} // Update state otp sesuai dengan input user
              className="input input-bordered rounded-md w-full mt-5"
            />
            <div className="modal-action">
              <button
                onClick={handleSendOtp}
                className={`btn btn-block bg-primary hover:bg-primary text-white rounded-md ${
                  loadingModal ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loadingModal}
              >
                {loadingModal ? (
                  <Loading type={"bars"} size={"md"} />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </dialog>
      </div>
    );
  };

  const handleLogin = async () => {
    setLoading(true);

    const payload = { email, password };
    try {
      const response = await axios.post(API_BASE_URL + "/login", payload);
      if (response.data.status === true) {
        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }
        setToken(response.data.token);
        setDataUser(JSON.stringify(response.data.data));

        console.log("is 2fa : " + response.data.data.is_2fa);

        if (response.data.data.is_2fa) {
          const response = await axios.post(API_BASE_URL + "/get-otp/" + email);
          console.log(response);
          if (response.data.status === true) {
            setOtpId(response.data.data.id);
            setLoading(false);
            setShowModal(true);
          } else {
            CenterAlert("error", "Oops...", response.data.message);
            setLoading(false);
          }
        } else {
          setShowModal(false);
          ToastAlert("success", response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("dataBo", JSON.stringify(response.data.data));
          navigate("/dasbor");
        }
      } else {
        CenterAlert("error", "Oops...", response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const message = error.response.data.errors;
        console.log(message);
        if (message) {
          setErrors(message);
          ToastAlert('error',error.response.data.message)
        } else {
          CenterAlert("error", "Oops...", error.response.data.message);
          setErrors({ email: error.response.data.message, password: "" });
          setPassword("");
        }
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={bgLogin}
        className="absolute inset-0 w-full h-full z-0 object-cover"
        alt="Background"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <div className="hero w-full max-w-4xl">
          <div className="bg-white rounded-lg p-6 md:p-12 flex flex-col lg:flex-row-reverse items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-10">
            <img
              src={imgLogin}
              className="w-full self-center max-w-xs md:max-w-sm lg:max-w-md hidden md:block"
              alt="Login Illustration"
            />

            <div className="w-full">
              <div className="flex justify-center">
                <img
                  src={logoLogin}
                  className="w-44 md:w-56 lg:w-64 mb-4"
                  alt="Logo"
                />
              </div>
              <h6 className="text-2xl sm:text-3xl text-primary font-extrabold mb-3 text-center lg:text-left">
                Login
              </h6>

              <div className="mb-3">
                <label className="font-bold text-sm">Email</label>
                <div className="relative w-full">
                  <input
                    type="email"
                    className={`input ${
                      errors.email ? "input-error" : "input-primary"
                    } w-full rounded-md pl-10 pr-10 p-2`}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={handleEnter}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm">Password</label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input ${
                      errors.password ? "input-error" : "input-primary"
                    } w-full rounded-md pl-10 pr-10 p-2`}
                    placeholder="Password"
                    value={password}
                    onKeyDown={handleEnter}
                    onChange={handlePasswordChange}
                  />
                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-between items-center mt-3 gap-3">
                <div className="flex items-center md:gap-2 gap-1 w-full md:w-auto">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary rounded-md checkbox-xs"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="label-text text-xs">Remember me</span>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-primary text-xs w-full md:w-auto text-end"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-4">
                {showModal && <Modal2FA />}
                <button
                  onClick={handleLogin}
                  className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                >
                  {loading ? <Loading type={"bars"} size={"sm"} /> : "Login"}
                </button>
                <div className="mt-3 text-center">
                  <span className="text-xs font-semibold">
                    Tidak punya akun?{" "}
                    <Link
                      to="/register"
                      className="font-normal underline text-primary"
                    >
                      Register
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
