import { faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL, GATEWAY_KEY } from "../dummy/const";
import { CenterAlert, ToastAlert } from "../components/Alert";

const PasswordSecurityPage = () => {
  const [email, setEmail] = useState();
  const dataBo = JSON.parse(localStorage.getItem("dataBo"));

  const [type, setType] = useState("otp");
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState("");
  const [resendOtpId, setResentOtpId] = useState();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleOtp = (e) => {
    setOtp(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };
  const getOTP = async (email) => {
    try {
      const response = await axios.post(
        API_BASE_URL + "/get-otp",
        {
          email: email,
          phone: "",
          gateway_key: GATEWAY_KEY,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_HEADER}`,
          },
        }
      );
      if (response.data.status === true) {
        setOtpId(response.data.data.id);
      }
    } catch (error) {
      CenterAlert("error", "Gagal", "Gagal Mendapatkan OTP");
    }
  };

  const handleSend = () => {
    if (type === "otp") {
      getOTP(email);
      setStep(2);
    } else if (type === "link") {
      //
    }
  };
  const handleSendOtp = async () => {
    setLoading(true);
    const payload = {
      email: email,
      otp: otp,
      otp_id:
        resendOtpId == null || resendOtpId == undefined ? otpId : resendOtpId,
    };
    console.log(payload);
    await axios
      .post(API_BASE_URL + "/store-otp", payload, {
        headers: {
          Authorization: `Bearer ${ACCESS_HEADER}`,
        },
      })
      .then(function (response) {
        if (response.data.status === true) {
          setTimeout(() => {
            setLoading(false);
            ToastAlert("success", "Verifikasi OTP Berhasil");
          }, 2000);
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

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
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

  console.log(errors);
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
              Send
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
              Submit
            </button>
          </div>
        </div>
      );
    } else if (step == 3 && type == "otp") {
      return (
        <div>
          <div className=" mt-5">
            <div className="mb-5 flex flex-col">
              <label className="font-bold text-start">Old Password</label>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);

                  setError((prev) => ({
                    ...prev,
                    old_password: "",
                  }));
                }}
                className={`input input-bordered rounded-md ${
                  errors.old_password ? "border-red-500" : ""
                }`}
              />
              {errors.old_password && (
                <p className="text-red-500 text-start">{errors.old_password}</p>
              )}
            </div>

            <div className="mb-5 flex flex-col">
              <label className="font-bold text-start">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);

                  setError((prev) => ({
                    ...prev,
                    new_password: "",
                  }));
                }}
                className={`input input-bordered rounded-md ${
                  errors.new_password ? "border-red-500" : ""
                }`}
              />
              {errors.new_password && (
                <p className="text-red-500 text-start">{errors.new_password}</p>
              )}
            </div>

            <div className="mb-5 flex flex-col">
              <label className="font-bold text-start">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);

                  setError((prev) => ({
                    ...prev,
                    new_password_confirmation: "",
                  }));
                }}
                className={`input input-bordered rounded-md ${
                  errors.new_password_confirmation ? "border-red-500" : ""
                }`}
              />
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
