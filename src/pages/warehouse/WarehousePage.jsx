import { faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import DataTableWarehouse from "../../components/warehouse/DatatableWarehouse";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL, headers } from "../../dummy/const";
import { ModalDetailWarehouse } from "../../components/warehouse/ModalDetailWarehouse";
import axiosInstance from "../../dummy/axiosInstance";

const WarehousePage = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Warehouse Name",
        accessor: "name", // accessor is the "key" in the data
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
            <ModalDetailWarehouse
              warehouse={row.original.name}
              fasyankes={row.original.fasyankes}
            />
            <button
              onClick={() =>
                document.getElementById(row.original.name).showModal()
              }
              className="btn bg-primary hover:bg-primary text-white btn-sm rounded-md "
            >
              View Detail
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [warehouse, setWarehouse] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(headers);
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
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Informasi Gudang" icon={faWarehouse} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="md:text-lg text-sm">List Gudang</p>
                  <Link
                    className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                    to={"/warehouse/create"}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Tambah Gudang
                  </Link>
                </div>
                <hr></hr>
                <div className="overflow-x-auto table-pin-rows">
                  <DataTableWarehouse
                    columns={columns}
                    data={warehouse}
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

export default WarehousePage;
