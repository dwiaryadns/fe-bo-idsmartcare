import { faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import DataTableWarehouse from "../../components/warehouse/DatatableWarehouse";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../dummy/const";

const WarehousePage = () => {
  const [loading, setLoading] = useState(true);
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
      },
    ],
    []
  );

  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [warehouse, setWarehouse] = useState([]);
  useEffect(() => {
    axios
      .get(API_BASE_URL + "/warehouses", headers)
      .then(function (response) {
        setLoading(false);
        setWarehouse(response.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Warehouse" icon={faWarehouse} />
            <div className="card shadow-md ">
              <div className="card-body">
                <div className="card-title flex md:flex-row flex-col justify-between">
                  <p className="md:text-lg text-sm">List Of Warehouse</p>
                  <Link
                    className="btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md"
                    to={"/warehouse/create"}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Warehouse
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
