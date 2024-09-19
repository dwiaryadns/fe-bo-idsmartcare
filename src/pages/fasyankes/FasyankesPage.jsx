import { faHospital, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import { Datatable } from "../../components/Datatable";
import DetailFasyankesPage from "./DetailFasyankesPage";
import Button from "../../components/Button";

const FasyankesPage = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [data, setData] = useState();
  const handleStep = (fasyankes) => {
    setStep(step + 1);
    setData(fasyankes);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Nama Fasyankes",
        accessor: "name",
      },
      {
        Header: "Tipe Fasyankes",
        accessor: "type",
      },
      {
        Header: "Aksi",
        accessor: "information",
        Cell: ({ row }) => {
          return (
            <button
              className="btn bg-primary hover:bg-primary text-white rounded-md btn-sm"
              onClick={() => handleStep(row.original)}
            >
              Lihat Detail
            </button>
          );
        },
      },
    ],
    []
  );

  const [fasyankes, setFasyankes] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get(API_BASE_URL + "/fasyankes", headers)
      .then((response) => {
        setFasyankes(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {step === 0 ? (
        <div className="flex flex-row w-full">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            <div className="mx-10">
              <Header title="Fasyankes" icon={faHospital} />
              <div className="card shadow-md ">
                <div className="card-body">
                  <div className="card-title flex md:flex-row flex-col justify-between">
                    <p className="text-lg ">List Fasyankes</p>
                    <Link to={"/fasyankes/create"}>
                      <Button
                        showIcon={true}
                        icon={faPlus}
                        title={"Tambah Fasyankes"}
                      />
                    </Link>
                  </div>
                  <hr></hr>
                  <div>
                    <Datatable
                      columns={columns}
                      data={fasyankes}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DetailFasyankesPage data={data} handleBack={handleBack} />
      )}
    </div>
  );
};

export default FasyankesPage;
