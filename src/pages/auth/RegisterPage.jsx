import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import bgLogin from "../../assets/bg-login.png";
import imgLogin from "../../assets/img-login.png";
import logoLogin from "../../assets/logo-login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
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

  useEffect(() => {
    const registerId = localStorage.getItem("register_id");
    if (registerId) {
      navigate(`/verify-otp/${registerId}`);
    }
  }, []);

  const handleRegister = () => {
    setLoading(true);
    const payload = {
      email: email,
      name: fullname,
      password: password,
      password_confirmation: confirmPassword,
    };
    axios
      .post(API_BASE_URL + "/register", payload)
      .then(function (response) {
        console.log(response.data.user.email);
        if (response.data.status === true) {
          const registerId = response.data.register_id;
          localStorage.setItem("register_id", registerId);
          localStorage.setItem("email", response.data.user.email);
          navigate(`/verify-otp/${registerId}`);
        }
      })
      .catch(function (error) {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const apiErrors = error.response.data.errors;
          const newApiErrors = {
            fullname: apiErrors.name ? apiErrors.name : "",
            email: apiErrors.email ? apiErrors.email : "",
            password: apiErrors.password ? apiErrors.password : "",
            confirmPassword: "",
            api: "",
          };
          setErrors(newApiErrors);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred. Please try again later.",
          });
        }
      });
  };

  const handleFullname = (e) => {
    setFullname(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
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
    <div className="relative">
      <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
        <div className="hero">
          <div className="hero-content flex flex-col lg:flex-row items-center lg:items-start">
            <img
              src={imgLogin}
              className="max-w-lg hidden md:block"
            />
            <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md lg:w-[600px]">
              <div className="flex justify-center">
                <img src={logoLogin} className="w-32 sm:w-48 lg:w-64 mb-4" />
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
                  } flex rounded-md items-center gap-2 w-full`}
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
                    className="cursor-pointer"
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
                  } flex rounded-md items-center gap-2 w-full`}
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
                    className="cursor-pointer"
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
