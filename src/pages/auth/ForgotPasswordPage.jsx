import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgLogin from "../../assets/bg-login.png";
import imgForgot from "../../assets/img-forgot.png";
import logoLogin from "../../assets/logo-login.png";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import Swal from "sweetalert2";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [message, setMessage] = useState();

  const [loading, setLoading] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    try {
      const response = await axios.post(API_BASE_URL + "/password/email", {
        email,
      });
      setMessage(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Link Send",
        text: `We sent an e email to ${email} with a link to get back into your account`,
      });
      setEmail("");
      setLoading(false);
    } catch (error) {
      setErrors({
        email: "Failed to send reset email. Please check your email address.",
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="hero">
          <div className="hero-content flex flex-col md:flex-row bg-white p-6 md:p-10 rounded-lg items-center justify-center">
            <div className="flex flex-col items-center">
              <img src={logoLogin} className="w-32 md:w-64 mb-4 self-start" />
              <img
                src={imgForgot}
                className="max-w-xs md:max-w-md hidden md:block"
              />
            </div>
            <div className="w-full max-w-sm md:max-w-md mt-6 md:mt-0 md:ml-10">
              <h4 className="text-2xl md:text-4xl font-extrabold">
                Trouble Logging In?
              </h4>
              <p className="text-sm mt-2">
                Enter your email and will send you a link to get back into your
                account.
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
                    className={`grow ${
                      errors.email ? "input-error" : "input-primary"
                    }`}
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
              <div className="mt-4">
                <button
                  onClick={handleForgotPassword}
                  disabled={loading} 
                  className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                >
                  {loading ? (
                    <span className="loading loading-bars loading-sm"></span>
                  ) : (
                    "Forgot Password"
                  )}
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
  );
};

export default ForgotPasswordPage;
