import { faBagShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../dummy/axiosInstance";
import { Datatable } from "../../components/Datatable";

export const DistribusiPage = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Distribusi ID",
        accessor: "distribusi_id",
      },
      {
        Header: "Fasyankes",
        accessor: "fasyankes",
      },
      {
        Header: "Gudang",
        accessor: "gudang",
      },
      {
        Header: "Tanggal",
        accessor: "date",
      },
    ],
    []
  );

  const [distribusi, setDistribusi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistribusi = async () => {
      try {
        const response = await axiosInstance.get("/distribusi");
        setDistribusi(response.data.data);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchDistribusi();
  }, []);
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="Distribusi Barang" icon={faBagShopping} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="text-lg">List Distribusi</p>
                  <Link to={"/distribusi/create"}>
                    <button className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md">
                      <FontAwesomeIcon icon={faPlus} />
                      Tambah Distribusi
                    </button>
                  </Link>
                </div>
                <hr></hr>
                <div>
                  <Datatable
                    columns={columns}
                    data={distribusi}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
