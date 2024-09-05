import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faEye,
  faEyeSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import bgLogin from "../../assets/bg-login.png";
import imgLogin from "../../assets/img-login.png";
import logoLogin from "../../assets/logo-login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  API_BASE_URL } from "../../dummy/const";
import { CenterAlert, ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
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

  useEffect(() => {
    const registerId = localStorage.getItem("register_id");
    if (registerId) {
      navigate(`/verify-otp/${registerId}`);
    }
  }, [navigate]);
  const handleRegister = async () => {
    setLoading(true);
    const payload = {
      email: email,
      name: fullname,
      phone: phone,
      password: password,
      password_confirmation: confirmPassword,
    };
    try {
      const response = await axios.post(API_BASE_URL + "/register", payload);
      console.log(response);
      if (response.data.status === true) {
        const registerId = response.data.register_id;
        localStorage.setItem("register_id", registerId);
        localStorage.setItem("email", response.data.user.email);
        ToastAlert("success", response.data.message);
        setOtpId(response.data.otp_id);
      } else {
        setLoading(false);
        CenterAlert("error", "Oops...", response.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        setErrors({
          fullname: apiErrors.name ? apiErrors.name : "",
          email: apiErrors.email ? apiErrors.email : "",
          phone: apiErrors.phone ? apiErrors.phone : "",
          password: apiErrors.password ? apiErrors.password : "",
          confirmPassword: "",
          api: "",
        });
      } else {
        CenterAlert("error", "Opps...", error.response.data.message);
      }
    }
  };

  const handleFullname = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]*$/;
    if (nameRegex.test(value)) {
      setFullname(value);
      setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
    }
  };
  const handlePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
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
      <img
        src={bgLogin}
        className="absolute inset-0 w-full h-full z-0 object-cover"
        alt="Background"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <div className="hero w-full max-w-4xl">
          <div className="bg-white rounded-lg p-6 md:p-12 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-10">
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
                Register
              </h6>
              <div className="mb-3">
                <label className="font-bold text-sm">Nama Lengkap</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    className={`input ${
                      errors.fullname ? "input-error" : "input-primary"
                    } w-full rounded-md pl-10 pr-10 p-2`}
                    placeholder="Nama Lengkap"
                    value={fullname}
                    onChange={handleFullname}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                {errors.fullname && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.fullname}
                  </div>
                )}
              </div>
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
                    onChange={handleEmail}
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
                <label className="font-bold text-sm">Phone</label>
                <div className="relative w-full">
                  <input
                    type="number"
                    className={`input ${
                      errors.phone ? "input-error" : "input-primary"
                    } w-full rounded-md pl-10 pr-10 p-2`}
                    placeholder="Phone (cth: 08xxxxx)"
                    value={phone}
                    onChange={handlePhone}
                  />
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                {errors.phone && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.phone}
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
                    onChange={handlePassword}
                    value={password}
                    placeholder="Password"
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

              <div className="mb-3">
                <label className="font-bold text-sm">Confirm Password</label>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`input ${
                      errors.confirmPassword ? "input-error" : "input-primary"
                    } w-full rounded-md pl-10 pr-10 p-2`}
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                  />
                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
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
                  {loading ? <Loading type={"bars"} size={"sm"} /> : "Register"}
                </button>
                <div className="mt-3">
                  <span className="text-xs font-semibold">
                    Have an account?{" "}
                    <Link to="/login" className="text-primary underline">
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
