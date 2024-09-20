import { faKey, faPlus } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import { Datatable } from "../../components/Datatable";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../dummy/axiosInstance";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../dummy/const";
import { ToastAlert } from "../../components/Alert";
import Swal from "sweetalert2";
import Button from "../../components/Button";

const AccessPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin?",
      text: "Data delegate access ini akan terhapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(
          `${API_BASE_URL}/delegate-access/delete/${id}` // Ubah URL endpoint
        );
        setData(
          (prevData) => prevData.filter((item) => item.id !== id) // Filter data menggunakan id
        );
        ToastAlert("success", response.data.message);
      } catch (error) {
        ToastAlert("error", error.response.data.message);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nama",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Hak Akses",
        accessor: "permission",
        Cell: ({ row }) => {
          const permissions = JSON.parse(row.original.hak_akses.permission);
          return (
            <ul className="list-disc">
              {permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          );
        },
      },
      {
        Header: "Aksi",
        accessor: "remove",
        Cell: ({ row }) => {
          return (
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn bg-red-600 hover:bg-red-600 text-white rounded-md btn-sm"
            >
              Hapus
            </button>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchDelegateAccess = async () => {
      try {
        const response = await axiosInstance.get("/delegate-access");
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDelegateAccess();
  }, []);

  return (
    <Layout title="Hak Akses" icon={faKey}>
      <div className="card">
        <div className="card-body shadow-md rounded-md">
          <div className="card-title flex md:flex-row flex-col justify-between">
            <p className="text-lg">List Hak Akses</p>
            <Link to={"/access/create"}>
              <Button showIcon={true} icon={faPlus}>
                Tambah Hak Akses
              </Button>
            </Link>
          </div>
          <hr></hr>
          <div>
            <Datatable columns={columns} data={data} loading={loading} />{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccessPage;
