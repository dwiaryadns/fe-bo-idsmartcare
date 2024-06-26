import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const"; // Ensure the path is correct
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgLogin from "../../assets/bg-login.png";
import imgReset from "../../assets/img-reset.png";
import logoLogin from "../../assets/logo-login.png";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ResetPasswordPage = () => {
  const { search } = useLocation(); // Get the search query string
  const token = new URLSearchParams(search).get("token");
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/check/token/${token}`)
      .then(function (response) {
        if (response.data.status === true) {
          setIsFound(true);
          setLoading(false);
        }
      })
      .catch(function (err) {
        if (err.response.data.status === false) {
          setLoading(false);
          setIsFound(false);
        }
      });
  }, [token]);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/password/reset`, {
        password: password,
        password_confirmation: passwordConfirmation,
        token: token,
      });
      setMessage(response.data.message);
      setIsFound(true);

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

      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.status === false) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
        setErrors({
          password: error.response.data.errors.password,
          password_confirmation:
            error.response.data.errors.password_confirmation,
        });
      } else {
        console.error("Network Error:", error);
        setMessage("Failed to reset password. Please try again.");
      }
    }
  };
  const handleInputChange = (setter, name) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center">
        <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
          <div className="hero">
            {loading ? (
              <span className="loading loading-spinner text-white loading-lg"></span>
            ) : isFound ? (
              <div className="hero-content flex gap-10 flex-col md:flex-row-reverse bg-white p-6 md:p-10 rounded-lg items-center justify-center">
                <div className="flex flex-col items-center">
                  <img src={logoLogin} className="w-32 md:w-64 mb-6 self-end" />
                  <img src={imgReset} className="max-w-xs hidden md:block" />
                </div>
                <div className="w-full max-w-sm md:max-w-lg mt-6 md:mt-0 md:ml-10">
                  <h4 className="text-2xl md:text-4xl font-extrabold">
                    Reset Password
                  </h4>
                  <p className="text-sm mt-2">
                    New password must be different from previously used password
                  </p>
                  <div className="mb-3 mt-10">
                    <div className="mb-3 flex flex-col">
                      <label className="font-bold">New Password</label>
                      <input
                        className={`input input-primary rounded-md ${
                          errors.password ? "input-error" : "input-primary"
                        } `}
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={handleInputChange(setPassword, "password")}
                      />
                      {errors.password && (
                        <div className="text-red-600 text-xs">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 flex flex-col">
                      <label className="font-bold">Confirm Password</label>
                      <input
                        className={`input input-primary rounded-md ${
                          errors.password_confirmation
                            ? "input-error"
                            : "input-primary"
                        } `}
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordConfirmation}
                        onChange={handleInputChange(
                          setPasswordConfirmation,
                          "password_confirmation"
                        )}
                      />
                      {errors.password_confirmation && (
                        <div className="text-red-600 text-xs">
                          {errors.password_confirmation}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-block bg-primary hover:bg-primary text-white rounded-md"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white min-w-96 flex flex-col rounded-lg p-10 justify-center items-center">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-7xl text-error"
                />
                <p className="font-bold text-error text-lg">Token Invalid</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
