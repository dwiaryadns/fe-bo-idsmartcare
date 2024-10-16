import { faHospital, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";
import { Datatable } from "../../components/Datatable";
import DetailFasyankesPage from "./DetailFasyankesPage";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

const FasyankesPage = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const handleStep = (fasyankes) => {
    setStep(step + 1);
    setData(fasyankes);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const handleActived = (data) => {
    const newStep = data.legal_doc != null ? 3 : 2;
    const payments = {
      package: data.subscription_plan.package_plan,
      duration: data.subscription_plan.duration,
      fasyankes: data,
      subscription_id: data.subscription_plan.id,
    };
    navigate("/fasyankes/create", {
      state: {
        step: newStep,
        type: data.type,
        payments: payments,
      },
    });
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
        Header: "Status",
        accessor: "",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center w-[130px]">
              <span
                className={`${
                  row.original.is_active ? "dot-success" : "dot-error "
                }`}
              ></span>
              <div className="ml-2 place-items-center">
                {row.original.status}{" "}
                {row.original.is_active ? "Aktif" : "Belum Aktif"}{" "}
              </div>
            </div>
          );
        },
      },
      {
        Header: "Aksi",
        accessor: "information",
        Cell: ({ row }) => {
          return row.original.is_active ? (
            <button
              title="Lihat Detail"
              className="btn bg-primary hover:bg-primary text-white rounded-md btn-sm"
              onClick={() => handleStep(row.original)}
            >
              Lihat Detail{" "}
            </button>
          ) : (
            <button
              onClick={() => handleActived(row.original)}
              title="Aktifkan"
              className="btn bg-error hover:bg-error text-white rounded-md btn-sm"
            >
              Aktifkan
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
        <Layout title="Fasyankes" icon={faHospital}>
          <div className="card shadow-md ">
            <div className="card-body">
              <div className="card-title flex md:flex-row flex-col justify-between">
                <p className="text-lg ">List Fasyankes</p>
                <Link to={"/fasyankes/create"}>
                  <Button showIcon={true} icon={faPlus}>
                    Tambah Fasyankes
                  </Button>
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
        </Layout>
      ) : (
        <DetailFasyankesPage data={data} handleBack={handleBack} />
      )}
    </div>
  );
};

export default FasyankesPage;
