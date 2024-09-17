import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { CenterAlert, ToastAlert } from "../components/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";
import axiosInstance from "../dummy/axiosInstance";
import axios from "axios";
import { ACCESS_HEADER, API_BASE_URL } from "../dummy/const";

export const ProfilePage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("otp");
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [load2FA, setLoad2FA] = useState(false);
  const [errors, setError] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [check, setCheck] = useState(0);

  const getDataBo = localStorage.getItem("dataBo");
  const dataBoObj = JSON.parse(getDataBo);

  useEffect(() => {
    setEmail(dataBoObj?.email);
    setPhone(dataBoObj?.phone);
    setName(dataBoObj?.name);
    setCheck(dataBoObj?.is_2fa);

    if (dataBoObj?.is_2fa == 1) {
      setCheck(1);
    } else {
      setCheck(0);
    }
  }, []);

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const handle2FA = async () => {
    setLoad2FA(true);
    try {
      const response = await axiosInstance.get("/change-twofa");
      if (response.data.status == true) {
        localStorage.setItem(
          "dataBo",
          JSON.stringify({ ...dataBoObj, is_2fa: check ? 0 : 1 })
        );
        setCheck(!check);
      }
      setLoad2FA(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoad2FA(false);
    }
  };

  const handleSend = async () => {
    setLoading(true);
    if (type === "otp") {
      try {
        const response = await axiosInstance.post("/security/send-otp", {
          email: email,
        });

        console.log(response);

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
        console.log("res : " + error);
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
          console.log("response otp" + response);
        } else {
          setLoading(false);
          ToastAlert("error", response.data.message);
          console.log("response otp" + response);
        }
      })
      .catch(function (error) {
        setLoading(false);
        ToastAlert("error", error.response.data.message);
      });
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const payload = {
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword,
      };
      const response = await axiosInstance.post("/change-password", payload);
      console.log(response);

      if (response.data.status === true) {
        ToastAlert("success", "Password Berhasil Dirubah");
        setStep(1);
        setLoading(false);
      } else {
        ToastAlert("error", "Password Gagal Dirubah");
        setLoading(false);
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
        setLoading(false);
      }
      ToastAlert("error", "Password Gagal Dirubah");
      setError({
        old_password: err.response.data.errors.old_password,
        new_password: err.response.data.errors.new_password,
        new_password_confirmation:
          err.response.data.errors.new_password_confirmation,
      });
      setLoading(false);
    }
  };

  const stepPage = () => {
    if (step == 1) {
      return (
        <div>
          <div className="flex flex-col">
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
          <div className="flex flex-col gap-3">
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
          <div className="mb-5 flex flex-col">
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
            {loading ? (
              <Loading type={"bars"} size={"md"} />
            ) : (
              "Change Password"
            )}
          </button>
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
          <div className="mx-10 pb-10">
            <Header title="My Profile" icon={faUser} />
            <div className="rounded-md bg-slate-200 p-6">
              <div className="grid grid-cols-12 gap-5 pb-5">
                <div className="col-span-full md:col-span-4 flex flex-col md:items-center">
                  <div className="px-5">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      className="rounded-full md:w-48 md:h-48 p-2"
                    />

                    <p className="text-gray-500 mt-5">
                      Referal Code : B000000{dataBoObj?.id}
                    </p>
                    <div className="flex items-center mt-5">
                      <div className="form-control ">
                        <label className="label cursor-pointer flex gap-3">
                          {load2FA ? (
                            <Loading
                              type={"bars"}
                              size={"xs"}
                              w={"w-5"}
                              h={"h-5"}
                            />
                          ) : (
                            <input
                              type="checkbox"
                              checked={check}
                              onChange={() => handle2FA()}
                              className="checkbox checkbox-primary rounded-md checkbox-sm"
                            />
                          )}
                          <span className="label-text">Enable 2FA</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-full md:col-span-8 md:border-l border-black">
                  <div className="px-5 flex flex-col gap-3 md:gap-6">
                    <h1 className="font-bold text-[20px]">Information</h1>
                    <input
                      type="text"
                      disabled
                      value={name}
                      className="input input-bordered input-info w-full rounded-md"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={email}
                      disabled
                      className="input input-bordered input-info w-full rounded-md"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      disabled
                      value={phone}
                      className="input input-bordered input-info w-full rounded-md"
                      placeholder="Phone Number"
                    />
                    <button
                      disabled
                      className="w-[100px] btn bg-primary hover:bg-primary text-white rounded-md btn-sm"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 border-t border-black pt-5">
                <div className="col-span-full  flex flex-col gap-5">
                  <h1 className="font-bold text-[20px]">Change Password</h1>

                  {/* <select className="select select-primary rounded-md">
                    <option selected hidden>
                      -Select TYPE CHANGE-
                    </option>
                    <option value={"otp"}> Send OTP </option>
                    <option value={"link"}> Send Link </option>
                  </select>

                  <button className="w-[100px] btn bg-primary hover:bg-primary text-white rounded-md btn-sm">
                    Send
                  </button> */}
                  {stepPage()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
