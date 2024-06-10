import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgLogin from "../../assets/bg-login.png";
import imgLogin from "../../assets/img-login.png";
import logoLogin from "../../assets/logo-login.png";
import {
  faEnvelope,
  faKey,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    let formIsValid = true;
    const newErrors = { fullname: "", phone: "", email: "", password: "" };

    if (!fullname) {
      newErrors.fullname = "Fullname is required";
      formIsValid = false;
    }
    if (!phone) {
      newErrors.phone = "Phone Number is required";
      formIsValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    }
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
      formIsValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }
    setErrors(newErrors);

    if (formIsValid) {
      // Handle successful registration (e.g., API call)
      // window.location.href = "/dashboard"; // Uncomment this to redirect after successful registration
    }
  };

  const handleFullname = (e) => {
    setFullname(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
    }
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
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

  return (
    <div className="relative">
      <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={imgLogin}
              className="max-w-lg hidden md:block content-center"
            />
            <div className="bg-white p-10 rounded-lg w-[600px]">
              <div className="flex justify-center">
                <img src={logoLogin} className="w-64 mb-4 self-center" />
              </div>
              <h6 className="text-3xl text-primary font-extrabold mb-3">
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
                <label className="font-bold text-sm">Phone Number</label>
                <label
                  className={`input ${
                    errors.phone ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full`}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  <input
                    type="text"
                    className="grow"
                    onChange={handlePhone}
                    value={phone}
                    placeholder="Phone Number"
                  />
                </label>
                {errors.phone && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.phone}
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
                    type="password"
                    className="grow"
                    onChange={handlePassword}
                    value={password}
                    placeholder="Password"
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
                    errors.fullname ? "input-error" : "input-primary"
                  } flex rounded-md items-center gap-2 w-full`}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <input
                    type="password"
                    className="grow"
                    placeholder="Confirm Password"
                  />
                </label>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleRegister}
                  className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                >
                  Register
                </button>
                <div>
                  <span className="text-xs font-semibold">
                    Have an account?{" "}
                    <Link
                      to="/login"
                      className="font-normal underline text-primary"
                    >
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
