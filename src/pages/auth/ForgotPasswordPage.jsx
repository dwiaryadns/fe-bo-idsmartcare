import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgLogin from "../../assets/bg-login.png";
import imgForgot from "../../assets/img-forgot.png";
import logoLogin from "../../assets/logo-login.png";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }
    setErrors({ email: "" });
  };

  return (
    <div>
      <div className="relative min-h-screen">
        <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
          <div className="hero">
            <div className="hero-content md:flex-row bg-white p-10 rounded-lg">
              <div>
                <img src={logoLogin} className="w-64 mb-4 self-center" />
                <img
                  src={imgForgot}
                  className="max-w-md hidden md:block content-center"
                />
              </div>
              <div>
                <h4 className="text-4xl font-extrabold ">
                  Trouble Logging In ?
                </h4>
                <p className="text-sm mt-2">
                  Enter your email and we’ll send you a link to get back into
                  your account
                </p>
                <div className="mb-3 mt-10">
                  <label className="font-bold text-sm">Email Address</label>
                  <label
                    className={`input ${
                      errors.email ? "input-error" : "input-primary"
                    } flex rounded-md items-center gap-2 w-full`}
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input
                      type="email"
                      className="grow"
                      value={email}
                      onChange={handleEmail}
                      placeholder="Email Address"
                    />
                  </label>
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mt-4 ">
                  <button
                    onClick={handleForgotPassword}
                    className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                  >
                    Forgot Password
                  </button>
                  <div>
                    <span className="text-xs font-semibold">
                      <FontAwesomeIcon icon={faAngleLeft} /> Back to{" "}
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
    </div>
  );
};

export default ForgotPasswordPage;
