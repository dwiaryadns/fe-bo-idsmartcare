import { faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WarehousePage = () => {
  const listWarehouse = [
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
    {
      name: "Warehouse",
      address: "Jalan jalan",
      pic: "John Doe",
      contact: "0812345678",
    },
  ];
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Warehouse" icon={faWarehouse} />
            <div>
              <div className="card shadow-md mt-3">
                <div className="card-body">
                  <div className="card-title flex justify-between">
                    List Of Warehouse
                    <button className="btn bg-primary btn-md hover:bg-primary text-white rounded-md">
                      <FontAwesomeIcon icon={faPlus} />
                      Add Warehouse
                    </button>
                  </div>
                  <hr></hr>
                  <div className="overflow-x-auto">
                    <div className="flex justify-end mb-3">
                      <input
                        className="input input-bordered rounded-md"
                        placeholder="Search"
                      />
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Status</th>
                          <th>Expired Date</th>
                          <th>View Information</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listWarehouse.map((fasyankes, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{fasyankes.name + (index + 1)}</td>
                            <td>{fasyankes.address}</td>
                            <td>{fasyankes.pic}</td>
                            <td>{fasyankes.contact}</td>
                            <td>View Detail</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default WarehousePage;
