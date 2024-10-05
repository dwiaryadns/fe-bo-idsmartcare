import { faEye, faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../dummy/axiosInstance";
import { Modal } from "../../components/Modal";
import { Datatable } from "../../components/Datatable";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

const WarehousePage = () => {
  const ChildrenModal = (data) => {
    return (
      <>
        <div className="flex justify-between bg-primary text-white rounded-md p-4 items-center text-md border-b-2">
          {data.name}
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Fasyankes</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.fasyankes &&
                data.fasyankes.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                  </tr>
                ))}
              {data.fasyankes && data.fasyankes.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
                    Belum ada Fasyankes terdaftar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "Warehouse Name",
        accessor: "name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "PIC",
        accessor: "pic",
      },
      {
        Header: "PIC Contact",
        accessor: "contact",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            <Modal id={row.original.id}>{ChildrenModal(row.original)}</Modal>
            <button
              onClick={() =>
                document.getElementById(row.original.id).showModal()
              }
              className="btn bg-primary hover:bg-primary text-white btn-sm rounded-md "
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [warehouse, setWarehouse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axiosInstance.get("/warehouses");
        setWarehouse(response.data.data);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, []);
  return (
    <Layout title={"Informasi Gudang"} icon={faWarehouse}>
      <div className="card shadow-md ">
        <div className="card-body">
          <div className="card-title flex md:flex-row flex-col justify-between">
            <p className="text-lg ">List Gudang</p>
            <Link to={"/warehouse/create"}>
              <Button showIcon={true} icon={faPlus}>
                Tambah Gudang
              </Button>
            </Link>
          </div>
          <hr></hr>
          <div>
            <Datatable columns={columns} data={warehouse} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WarehousePage;
