import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgLogin from "../../assets/bg-login.png";
import imgLogin from "../../assets/img-login.png";
import logoLogin from "../../assets/logo-login.png";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = () => {
    let formIsValid = true;
    const newErrors = { email: "", password: "" };

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
      // window.location.href = "/dashboard";
      // disini pengencekan api
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

  return (
    <div className="relative">
      <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 space-y-4">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src={imgLogin}
              className="max-w-lg hidden md:block content-center"
            />
            <div className="bg-white p-10 rounded-lg w-[500px]">
              <div className="flex justify-center">
                <img src={logoLogin} className="w-64 mb-4 self-center" />
              </div>
              <h6 className="text-3xl text-primary font-extrabold mb-3">
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
                    type="password"
                    className="grow"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
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
                  Login
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
