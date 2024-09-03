import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const"; // Ensure the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgLogin from "../../assets/bg-login.png";
import imgReset from "../../assets/img-reset.png";
import logoLogin from "../../assets/logo-login.png";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CenterAlert, ToastAlert } from "../../components/Alert";
import Loading from "../../components/Loading";

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
      ToastAlert("success", response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.status === false) {
        CenterAlert("error", "Error", error.response.data.message);
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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center">
        <img src={bgLogin} className="absolute inset-0 w-full h-full z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
          <div className="hero">
            {loading ? (
              <div className="text-white">
              <Loading type={"spinner"} size={"lg"} />
              </div>
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
                    <label className="font-bold">New Password</label>
                    <div className="mb-3 flex flex-col relative">
                      <input
                        className={`input w-full input-primary rounded-md ${
                          errors.password ? "input-error" : "input-primary"
                        }`}
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={handleInputChange(setPassword, "password")}
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      />
                      {errors.password && (
                        <div className="text-red-600 text-xs">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <label className="font-bold">Confirm Password</label>
                    <div className="mb-3 flex flex-col relative">
                      <input
                        className={`input input-primary rounded-md ${
                          errors.password_confirmation
                            ? "input-error"
                            : "input-primary"
                        }`}
                        type={showPasswordConfirmation ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={passwordConfirmation}
                        onChange={handleInputChange(
                          setPasswordConfirmation,
                          "password_confirmation"
                        )}
                      />
                      <FontAwesomeIcon
                        icon={showPasswordConfirmation ? faEyeSlash : faEye}
                        onClick={() =>
                          setShowPasswordConfirmation(!showPasswordConfirmation)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
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
