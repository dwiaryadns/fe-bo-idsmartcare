import { useState, useEffect } from "react";
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
import { API_BASE_URL } from "../../dummy/const";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    const payload = { email, password };
    axios
      .post(API_BASE_URL + "/login", payload)
      .then((response) => {
        if (response.data.status === true) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("dataBo", JSON.stringify(response.data.data));

          if (rememberMe) {
            localStorage.setItem("email", email);
          } else {
            localStorage.removeItem("email");
          }
          navigate("/dasbor");
          Swal.fire({
            icon: "success",
            title: response.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const message = error.response.data.errors;
          if (message) {
            const newApiErrors = {
              email: message.email ? message.email[0] : "",
              password: message.password ? message.password[0] : "",
            };
            setErrors(newApiErrors);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
            setErrors({ email: error.response.data.message, password: "" });
            setPassword("");
          }
        }
        setLoading(false);
      });
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
                <button
                  onClick={handleLogin}
                  className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                >
                  {loading ? (
                    <span className="loading loading-bars loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="mt-3 text-center">
                  <span className="text-xs font-semibold">
                    Tidak punya akun? {" "}
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
