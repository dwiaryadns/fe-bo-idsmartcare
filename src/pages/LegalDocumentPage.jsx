import { faLegal } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InputFile from "../components/legaldoc/InputFile";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../dummy/const";
import { Link } from "react-router-dom";

const LegalDocumentPage = () => {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [isBoInfo, setIsBoInfo] = useState(false);

  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/bo-info", headers);
        if (response.data.data !== null) {
          const businessType = response.data.data.businessType;
          setIsBoInfo(true);
          setType(businessType);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Legal Document" icon={faLegal} />
            {loading ? (
              <div className="flex justify-center mt-32">
                <span className="loading loading-spinner text-primary loading-lg"></span>
              </div>
            ) : (
              <div>
                {isBoInfo ? (
                  type === "Perusahaan" ? (
                    <div>
                      <InputFile label="KTP Direktur Berdasarkan Akta" />
                      <InputFile label="Akta Perusahaan (Perubahan/Terbaru)" />
                      <InputFile label="SK Kemenkumham Akta (Perubahan/Terbaru)" />
                      <InputFile label="NPWP Perusahaan" />
                      <InputFile label="Nomor Induk Berusaha (NIB)" />
                      <InputFile label="Sertifikasi ISO" isRequired={false} />
                    </div>
                  ) : type === "Perorangan" ? (
                    <div>
                      <InputFile label="KTP" />
                      <InputFile label="NPWP" />
                      <InputFile label="Sertifikasi ISO" isRequired={false} />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  <div role="alert" className="alert alert-warning mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>
                      Please Complete your Business Owner Info data! {"  "}
                      <Link to="/bo-info" className="font-bold underline">
                        Click Here!
                      </Link>
                    </span>
                  </div>
                )}
              </div>
            )}

            {type !== "" ? (
              <div className="flex justify-end">
                <button className="btn bg-primary text-white btn-sm mb-10 mt-5 p-5 content-center rounded-md">
                  Submit
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentPage;
