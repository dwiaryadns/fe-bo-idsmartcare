import { faHospital, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DataTableFasyankes from "../../components/fasyankes/DatatableFasyankes";
import axios from "axios";
import { API_BASE_URL, headers } from "../../dummy/const";

const FasyankesPage = () => {
  const [loading, setLoading] = useState(true);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Report",
        accessor: "report",
      },
      {
        Header: "Information",
        accessor: "information",
      },
    ],
    []
  );

  

  const [fasyankes, setFasyankes] = useState([]);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/fasyankes", headers)
      .then((response) => {
        console.log(response.data.data);
        setFasyankes(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Fasyankes" icon={faHospital} />
            <div className="">
              <div className="card shadow-md ">
                <div className="card-body">
                  <div className="card-title flex md:flex-row flex-col justify-between">
                    <p className="md:text-lg text-sm">List Fasyankes</p>
                    <Link to={"/fasyankes/create"}>
                      <button className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md">
                        <FontAwesomeIcon icon={faPlus} />
                        Tambah Fasyankes
                      </button>
                    </Link>
                  </div>
                  <hr></hr>
                  <div className="overflow-x-auto table-pin-rows">
                    <DataTableFasyankes
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
      </div>
    </div>
  );
};

export default FasyankesPage;
