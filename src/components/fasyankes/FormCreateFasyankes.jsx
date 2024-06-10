import { useState } from "react";
import { CardPackage } from "./utils/CardPackage";
import { faFreebsd } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleRight,
  faHome,
  faHospital,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FormCreateFasyankes = () => {
  const free = [
    "Maximum 2 users",
    "7 days history data",
    "Jumlah data terbatas",
  ];
  const plus = [
    "Maximum 4 users",
    "Unlimited history data",
    "Unlimited data row in 5 years",
  ];
  const advanced = [
    "Unlimited users",
    "Unlimited history data",
    "Unlimited data row & storage",
  ];

  const [type, setType] = useState("");
  const [sektor, setSektor] = useState("");
  const [duration, setDuration] = useState("Monthly");
  const [choosePlan, setChoosePlan] = useState("");
  const [typeWarehouse, setTypeWarehouse] = useState("");

  const handleType = (e) => {
    setType(e);
  };

  const handleSektor = (e) => {
    setSektor(e);
  };

  const handleChangeDuration = (e) => {
    setDuration(e);
    setChoosePlan("");
  };

  const handleTypeWarehouse = (e) => {
    setTypeWarehouse(e);
  };
  return (
    <div>
      <div className="pb-96">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              Type Of Fasyankes<span className="text-red-800">*</span>
            </span>
          </div>
          <div className="flex flex-row gap-5">
            <button
              onClick={() => handleType("Klinik")}
              className={`btn  rounded-md btn-sm min-w-80 ${
                type === "Klinik"
                  ? "bg-primary hover:bg-primary text-white"
                  : "bg-grey hover:bg-grey"
              }`}
            >
              Klinik
            </button>
            <button
              onClick={() => handleType("Apotek")}
              className={`btn  rounded-md btn-sm min-w-80 ${
                type === "Apotek"
                  ? "bg-primary hover:bg-primary text-white"
                  : "bg-grey hover:bg-grey"
              }`}
            >
              Apotek
            </button>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              Sektor Usaha<span className="text-red-800">*</span>
            </span>
          </div>
          <div className="flex flex-row gap-5">
            <button
              onClick={() => handleSektor("Perorangan")}
              className={`btn  rounded-md btn-sm min-w-80 ${
                sektor === "Perorangan"
                  ? "bg-primary hover:bg-primary text-white"
                  : "bg-grey hover:bg-grey"
              }`}
            >
              Perorangan
            </button>
            <button
              onClick={() => handleSektor("Perusahaan")}
              className={`btn  rounded-md btn-sm min-w-80 ${
                sektor === "Perusahaan"
                  ? "bg-primary hover:bg-primary text-white"
                  : "bg-grey hover:bg-grey"
              }`}
            >
              Perusahaan
            </button>
          </div>
        </label>
        {type === "Apotek" ? (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold text-base">
                Package Plan<span className="text-red-800">*</span>
              </span>
            </div>
            <div className="flex flex-row shadow-md justify-center gap-5 bg-base-100 mb-3 mx-24 md:mx-60 rounded-full p-2">
              <div
                onClick={() => handleChangeDuration("Monthly")}
                className={`${
                  duration === "Monthly" ? "bg-secondary text-white" : ""
                }  p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Monthly
              </div>
              <div
                onClick={() => handleChangeDuration("Anually")}
                className={`${
                  duration === "Anually" ? "bg-secondary text-white" : ""
                }  p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Anually (20% Off)
              </div>
            </div>
            {duration === "Monthly" ? (
              <div
                className={`grid grid-cols-3 gap-5 ${
                  type == "" ? "hidden" : ""
                }`}
              >
                <CardPackage
                  icon={faTag}
                  fitur={free}
                  title={"FREE"}
                  price={"Rp 0"}
                />
                <CardPackage
                  fitur={plus}
                  icon={faHome}
                  title={"Plus"}
                  isPopular="true"
                  price={"Rp 199.000/month"}
                />
                <CardPackage
                  fitur={advanced}
                  icon={faHospital}
                  title={"Advanced"}
                  price={"Rp 259.000/month"}
                />
              </div>
            ) : (
              <div
                className={`grid grid-cols-3 gap-5 ${
                  type == "" ? "hidden" : ""
                }`}
              >
                <CardPackage
                  icon={faTag}
                  fitur={free}
                  title={"FREE"}
                  price={"Rp 0"}
                />
                <CardPackage
                  fitur={plus}
                  icon={faHome}
                  title={"Plus"}
                  isPopular="true"
                  price={"Rp 199.000/month"}
                  isAnually={true}
                  disc={"Rp 159.000/month"}
                />
                <CardPackage
                  fitur={advanced}
                  icon={faHospital}
                  title={"Advanced"}
                  price={"Rp 259.000/month"}
                  isAnually={true}
                  disc={"Rp 147.000/month"}
                />
              </div>
            )}
          </label>
        ) : (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold text-base">
                Package Plan<span className="text-red-800">*</span>
              </span>
            </div>
            <div className="flex shadow-md justify-center gap-5 bg-base-100 mb-3 rounded-full mx-24 md:mx-60 p-2">
              <div
                onClick={() => handleChangeDuration("Monthly")}
                className={`${
                  duration === "Monthly" ? "bg-secondary text-white" : ""
                }  p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Monthly
              </div>
              <div
                onClick={() => handleChangeDuration("Anually")}
                className={`${
                  duration === "Anually" ? "bg-secondary text-white" : ""
                }  p-2 rounded-full hover:cursor-pointer duration-300 transition ease-in-out`}
              >
                Anually (20% Off)
              </div>
            </div>
            {duration === "Monthly" ? (
              <div
                className={`grid grid-cols-3 gap-5 ${
                  type == "" ? "hidden" : ""
                }`}
              >
                <CardPackage
                  icon={faTag}
                  fitur={free}
                  title={"FREE"}
                  price={"Rp 0"}
                />
                <CardPackage
                  fitur={plus}
                  icon={faHome}
                  title={"Plus"}
                  isPopular="true"
                  price={"Rp 249.000/month"}
                />
                <CardPackage
                  fitur={advanced}
                  icon={faHospital}
                  title={"Advanced"}
                  price={"Rp 289.000/month"}
                />
              </div>
            ) : (
              <div
                className={`grid grid-cols-3 gap-5 ${
                  type == "" ? "hidden" : ""
                }`}
              >
                <CardPackage
                  icon={faTag}
                  fitur={free}
                  title={"FREE"}
                  price={"Rp 0"}
                />
                <CardPackage
                  fitur={plus}
                  icon={faHome}
                  title={"Plus"}
                  isPopular="true"
                  price={"Rp 249.000/month"}
                  isAnually={true}
                  disc={"Rp 199.000/month"}
                />
                <CardPackage
                  fitur={advanced}
                  icon={faHospital}
                  title={"Advanced"}
                  price={"Rp 289.000/month"}
                  isAnually={true}
                  disc={"Rp 231.000/month"}
                />
              </div>
            )}
          </label>
        )}
        {type == "" ? (
          <div className="flex justify-center">Select Type of Fasyankes first</div>
        ) : (
          ""
        )}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              Type Distribution Warehouse<span className="text-red-800">*</span>
            </span>
          </div>
          <div className="flex flex-row gap-5">
            <button
              onClick={() => handleTypeWarehouse("Independent")}
              className={`btn  rounded-md btn-sm min-w-80 ${
                typeWarehouse === "Independent"
                  ? "bg-primary hover:bg-primary text-white"
                  : "bg-grey hover:bg-grey"
              }`}
            >
              Independent
            </button>
            <button
              onClick={() => handleTypeWarehouse("Centralized")}
              className={`btn  rounded-md btn-sm min-w-80 ${
                typeWarehouse === "Centralized"
                  ? "bg-primary hover:bg-primary text-white"
                  : "bg-grey hover:bg-grey"
              }`}
            >
              Centralized
            </button>
          </div>
        </label>

        <div className="flex mt-3">
          <label className="form-control w-full flex flex-row items-center">
            <div className="label min-w-72">
              <span className="label-text font-bold text-base">
                Name Fasyankes
                <span className="text-red-800">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full rounded-md"
            />
          </label>
        </div>
        <div className="flex mt-3">
          <label className="form-control w-full flex flex-row items-center">
            <div className="label min-w-72">
              <span className="label-text font-bold text-base">
                Name Fasyankes
                <span className="text-red-800">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full rounded-md"
            />
          </label>
        </div>
        <div className="flex mt-3">
          <label className="form-control w-full flex flex-row items-center">
            <div className="label min-w-72">
              <span className="label-text font-bold text-base">
                Email Fasyankes
                <span className="text-red-800">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full rounded-md"
            />
          </label>
        </div>
        <div className="flex mt-3">
          <label className="form-control w-full flex flex-row items-center">
            <div className="label min-w-72">
              <span className="label-text font-bold text-base">
                Password
                <span className="text-red-800">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full rounded-md"
            />
          </label>
        </div>
        <div className="flex mt-3 mb-3">
          <label className="form-control w-full flex flex-row items-center">
            <div className="label min-w-72">
              <span className="label-text font-bold text-base">
                Confirm Password
                <span className="text-red-800">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full rounded-md"
            />
          </label>
        </div>

        <div className="form-control mt-10">
          <label className="flex items-center gap-5">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary rounded-md"
            />
            <span className="label-text">
              Dengan membuat akun, kamu setuju dengan Syarat dan Ketentuan serta
              Kebijakan Privasi idSmartCare.
            </span>
          </label>
        </div>
        <div className="flex justify-end">
          <button className="btn bg-primary hover:bg-primary text-white rounded-md px-10">
            Next <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};
