import { faBagShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../dummy/axiosInstance";
import { Datatable } from "../../components/Datatable";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

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
    <Layout title="Distribusi Barang" icon={faBagShopping}>
      <div className="card shadow-md ">
        <div className="card-body">
          <div className="card-title flex md:flex-row flex-col justify-between">
            <p className="text-lg">List Distribusi</p>
            <Link to={"/distribusi/create"}>
              <Button showIcon={true} icon={faPlus}>
                Tambah Distribusi
              </Button>
            </Link>
          </div>
          <hr></hr>
          <div>
            <Datatable columns={columns} data={distribusi} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
