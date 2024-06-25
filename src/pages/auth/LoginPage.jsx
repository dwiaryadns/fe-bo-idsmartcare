import { useState } from "react";
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

  const handleLogin = () => {
    setLoading(true);
    const payload = {
      email: email,
      password: password,
    };
    axios
      .post(API_BASE_URL + "/login", payload)
      .then(function (response) {
        if (response.data.status === true) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("dataBo", JSON.stringify(response.data.data));
          navigate("/dashboard");
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
            title: response.data.message,
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
      .catch(function (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors &&
          error.response.data.message
        ) {
          const message = error.response.data.errors;
          if (message) {
            const newApiErrors = {
              email: message.email ? message.email[0] : "",
              password: message.password ? message.password[0] : "",
            };
            setErrors(newApiErrors);
            setLoading(false);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
          const newApiErrors = {
            email: error.response.data.message,
          };
          setErrors(newApiErrors);
          setPassword("");
          setLoading(false);
        }
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
    <div className="relative">
      <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
        <div className="hero">
          <div className="bg-white hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start">
            <img src={imgLogin} className="max-w-lg hidden md:block self-center" />
            <div className="p-6 sm:p-10 rounded-lg w-full max-w-md lg:w-[600px]">
              <div className="flex justify-center">
                <img src={logoLogin} className="w-32 sm:w-48 lg:w-64 mb-4" />
              </div>
              <h6 className="text-2xl sm:text-3xl text-primary font-extrabold mb-3">
                Login
              </h6>
              <div className="mb-3">
                <label className="font-bold text-sm">Email</label>
                <label
                  className={`input ${
                    errors.email ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full`}
                >
                  <FontAwesomeIcon
                    className="text-gray-500"
                    icon={faEnvelope}
                  />
                  <input
                    type="email"
                    className="grow"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <label className="font-bold text-sm">Password</label>
                <label
                  className={`input ${
                    errors.password ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full`}
                >
                  <FontAwesomeIcon className="text-gray-500" icon={faKey} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                </label>

                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="form-control flex flex-row items-center mt-3 gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary rounded-md"
                  />
                  <span className="label-text">Remember me</span>
                </div>
                <Link to={"/forgot-password"} className="text-primary text-xs">
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
                <div>
                  <span className="text-xs font-semibold">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="font-normal underline text-primary"
                    >
                      Create Account
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
