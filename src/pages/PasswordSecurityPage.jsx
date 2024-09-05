import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL } from "../dummy/const";
import { CenterAlert, ToastAlert } from "../components/Alert";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordSecurityPage = () => {
  const [email, setEmail] = useState();
  const dataBo = JSON.parse(localStorage.getItem("dataBo"));

  const [type, setType] = useState("otp");
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleOtp = (e) => {
    setOtp(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleSend = async () => {
    setLoading(true);
    if (type === "otp") {
      try {
        const response = await axios.post(
          API_BASE_URL + "/security/send-otp",
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status == true) {
          console.log("berhasil 2 " + response);
          setOtpId(response.data.otp_id);
          setLoading(false);
          setStep(2);
          ToastAlert("success", response.data.message);
        } else {
          setLoading(false);
          ToastAlert("error", response.data.message);
          return;
        }
      } catch (error) {
        console.log(error);
        ToastAlert("error", error.response.data.message);
        setLoading(false);
      }
    } else if (type === "link") {
      CenterAlert(
        "error",
        "Oops...",
        "Fitur kirim Link belum tersedia, silahkan gunakan OTP!"
      );
      setLoading(false);
      return;
    }
  };
  const handleSendOtp = async () => {
    setLoading(true);
    const payload = {
      email: email,
      otp: otp,
      otp_id: otpId,
    };
    await axios
      .post(API_BASE_URL + "/store-otp", payload, {
        headers: {
          Authorization: `Bearer ${ACCESS_HEADER}`,
        },
      })
      .then(function (response) {
        if (response.data.status === true) {
          setLoading(false);
          ToastAlert("success", "Verifikasi OTP Berhasil");
          setStep(3);
        } else {
          setLoading(false);
          ToastAlert("error", response.data.message);
        }
      })
      .catch(function (error) {
        setLoading(false);
        ToastAlert("error", error.response.data.message);
      });
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setError] = useState({});

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        API_BASE_URL + "/change-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmNewPassword,
        },
        headers
      );
      console.log(response);

      if (response.data.status === true) {
        ToastAlert("success", "Password Berhasil Dirubah");
        setStep(1);
      } else {
        ToastAlert("error", "Password Gagal Dirubah");
        setError({
          old_password: response.data.errors.old_password,
          new_password: response.data.errors.new_password,
          new_password_confirmation:
            response.data.errors.new_password_confirmation,
        });
      }
    } catch (err) {
      if (err.response.data.status === false) {
        setError({
          old_password: err.response.data.message,
        });
      }
      ToastAlert("error", "Password Gagal Dirubah");
      setError({
        old_password: err.response.data.errors.old_password,
        new_password: err.response.data.errors.new_password,
        new_password_confirmation:
          err.response.data.errors.new_password_confirmation,
      });
    }
  };

  useEffect(() => {
    setEmail(dataBo.email);
  }, []);

  const stepPage = () => {
    if (step == 1) {
      return (
        <div>
          <div className="flex flex-col">
            <label className="font-bold">Email Address</label>
            <input className="input input-primary rounded-md" value={email} />
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-bold">Type Change</label>
            <select
              onChange={(e) => handleType(e)}
              className="select select-primary rounded-md"
            >
              <option selected hidden>
                -Select TYPE CHANGE-
              </option>
              <option value={"otp"}> Send OTP </option>
              <option value={"link"}> Send Link </option>
            </select>
          </div>

          <div className="mt-5">
            <button
              onClick={handleSend}
              className="btn bg-primary hover:bg-primary text-white btn-block rounded-md"
            >
              {loading ? <Loading type={"bars"} size={"md"} /> : "Kirim"}
            </button>
          </div>
        </div>
      );
    } else if (step == 2 && type == "otp") {
      return (
        <div>
          <div className="flex flex-col gap-3 mt-5">
            <label className="font-bold text-start">OTP Code</label>
            <input
              maxLength={6}
              placeholder="OTP CODE"
              value={otp}
              onChange={(e) => handleOtp(e)}
              className="input input-bordered rounded-md"
            />
            <button
              onClick={handleSendOtp}
              className="btn bg-primary hover:bg-primary text-white rounded-md"
            >
              {loading ? <Loading type={"bars"} size={"md"} /> : "Submit"}
            </button>
          </div>
        </div>
      );
    } else if (step == 3 && type == "otp") {
      return (
        <div>
          <div className="mt-5">
            <div className="mb-5 flex flex-col">
              <label className="font-bold text-start">Old Password</label>
              <div className="relative w-full">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    setError((prev) => ({
                      ...prev,
                      old_password: "",
                    }));
                  }}
                  className={`input input-bordered rounded-md w-full pr-10 ${
                    errors.old_password ? "border-red-500" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={showOldPassword ? faEyeSlash : faEye}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
              {errors.old_password && (
                <p className="text-red-500 text-start">{errors.old_password}</p>
              )}
            </div>

            <div className="mb-5 flex flex-col">
              <label className="font-bold text-start">New Password</label>
              <div className="relative w-full">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError((prev) => ({
                      ...prev,
                      new_password: "",
                    }));
                  }}
                  className={`input input-bordered rounded-md w-full pr-10 ${
                    errors.new_password ? "border-red-500" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
              {errors.new_password && (
                <p className="text-red-500 text-start">{errors.new_password}</p>
              )}
            </div>

            <div className="mb-5 flex flex-col">
              <label className="font-bold text-start">
                Confirm New Password
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    setError((prev) => ({
                      ...prev,
                      new_password_confirmation: "",
                    }));
                  }}
                  className={`input input-bordered rounded-md w-full pr-10 ${
                    errors.new_password_confirmation ? "border-red-500" : ""
                  }`}
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
              {errors.new_password_confirmation && (
                <p className="text-red-500 text-start">
                  {errors.new_password_confirmation}
                </p>
              )}
            </div>

            <button
              onClick={handleChangePassword}
              className="btn bg-primary btn-block hover:bg-primary text-white rounded-md"
            >
              Change Password
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Keamanan Akun" icon={faLock} />
            <div className="flex flex-col justify-center text-center mt-5 md:mx-64">
              {stepPage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurityPage;
