import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import bgLogin from "../../assets/bg-login.png";
import imgLogin from "../../assets/img-login.png";
import logoLogin from "../../assets/logo-login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL, GATEWAY_KEY } from "../../dummy/const";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    api: "",
  });
  const navigate = useNavigate();
  const [otpId, setOtpId] = useState();

  useEffect(() => {
    if (otpId) {
      const registerId = localStorage.getItem("register_id");
      navigate(`/verify-otp/${registerId}`, { state: { otpId: otpId } });
    }
  }, [otpId, navigate]);

  const getOTP = async (email) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "/get-otp",
        {
          email: email,
          phone: "",
          gateway_key: GATEWAY_KEY,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_HEADER}`,
          },
        }
      );

      if (response.data.status === true) {
        setOtpId(response.data.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRegister = async () => {
    setLoading(true);
    const payload = {
      email: email,
      name: fullname,
      password: password,
      password_confirmation: confirmPassword,
    };
    try {
      const response = await axios.post(API_BASE_URL + "/register", payload);
      if (response.data.status === true) {
        const registerId = response.data.register_id;
        localStorage.setItem("register_id", registerId);
        localStorage.setItem("email", response.data.user.email);
        Swal.fire({
          icon: "success",
          title: response.data.message,
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
        await getOTP(response.data.user.email);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        setErrors({
          fullname: apiErrors.name ? apiErrors.name : "",
          email: apiErrors.email ? apiErrors.email : "",
          password: apiErrors.password ? apiErrors.password : "",
          confirmPassword: "",
          api: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again later.",
        });
      }
    }
  };

  const handleFullname = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;
    setFullname(value);
    if (nameRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setEmail(value);
    if (emailRegex.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  return (
    <div className="relative min-h-screen">
      <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
        <div className="hero">
          <div className="bg-white rounded-lg md:p-12 hero-content flex flex-col lg:flex-row items-center lg:items-start">
            <img
              src={imgLogin}
              className="max-w-lg hidden md:block self-center"
            />
            <div className="w-full max-w-sm md:max-w-lg mt-6 md:mt-0 md:mr-10">
              <div className="flex justify-center">
                <img src={logoLogin} className="w-56 md:w-64 mb-4" alt="Logo" />
              </div>
              <h6 className="text-2xl sm:text-3xl text-primary font-extrabold mb-3">
                Register
              </h6>
              <div className="mb-3">
                <label className="font-bold text-sm">Fullname</label>
                <label
                  className={`input ${
                    errors.fullname ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    className="grow"
                    onChange={handleFullname}
                    value={fullname}
                    placeholder="Fullname"
                  />
                </label>
                {errors.fullname && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.fullname}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="font-bold text-sm">Email</label>
                <label
                  className={`input ${
                    errors.email ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full`}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="email"
                    className="grow"
                    onChange={handleEmail}
                    value={email}
                    placeholder="Email"
                  />
                </label>
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="font-bold text-sm">Password</label>
                <label
                  className={`input ${
                    errors.password ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full relative`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="grow"
                    onChange={handlePassword}
                    value={password}
                    placeholder="Password"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3"
                  />
                </label>
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <div>
                <label className="font-bold text-sm">Confirm Password</label>
                <label
                  className={`input ${
                    errors.confirmPassword ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full relative`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="grow"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer absolute right-3"
                  />
                </label>
                {errors.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              {errors.api && (
                <div className="text-red-500 text-xs mt-1">{errors.api}</div>
              )}
              <div className="mt-4">
                <button
                  onClick={handleRegister}
                  className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                >
                  {loading ? (
                    <span className="loading loading-bars loading-sm"></span>
                  ) : (
                    "Register"
                  )}
                </button>
                <div>
                  <span className="text-xs font-semibold">
                    Have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Login
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

export default RegisterPage;
