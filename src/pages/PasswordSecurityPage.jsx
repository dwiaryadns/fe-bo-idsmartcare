import { faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { data } from "autoprefixer";
import { useState } from "react";
import { useEffect } from "react";

const PasswordSecurityPage = () => {
  const [email, setEmail] = useState();
  const dataBo = JSON.parse(localStorage.getItem("dataBo"));
  console.log(dataBo.email);
  useEffect(() => {
    setEmail(dataBo.email);
  }, []);
  console.log(dataBo.email);
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Password & Security" icon={faLock} />
            <div className="flex flex-col justify-center text-center mt-5 md:mx-64">
              <div className="flex flex-col">
                <label className="font-bold">Email Address</label>
                <input
                  className="input input-primary rounded-md"
                  value={email}
                />
              </div>
              <div className="flex flex-col mt-5">
                <label className="font-bold">Type Change</label>
                <select className="select select-primary rounded-md">
                  <option selected hidden>
                    -Select TYPE CHANGE-
                  </option>
                  <option> Send OTP </option>
                  <option> Send Link </option>
                </select>
              </div>

              <div className="mt-5">
                <button className="btn bg-primary hover:bg-primary text-white btn-block rounded-md">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurityPage;
