import { faHospital, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FasyankesPage = () => {
  const listFasyankes = [
    {
      name: "Apotik Bahagia",
      type: "Apotik",
      status: "active", // pending ,expired, apply
      expiredDate: "2022-01-01",
    },
    {
      name: "Apotik Bahagia",
      type: "Apotik",
      status: "pending", // pending ,expired, apply
      expiredDate: "2022-01-01",
    },
    {
      name: "Apotik Bahagia",
      type: "Apotik",
      status: "active", // pending ,expired, apply
      expiredDate: "2022-01-01",
    },
    {
      name: "Apotik Bahagia",
      type: "Apotik",
      status: "apply", // pending ,expired, apply
      expiredDate: "2022-01-01",
    },
    {
      name: "Apotik Bahagia",
      type: "Apotik",
      status: "expired", // pending ,expired, apply
      expiredDate: "2022-01-01",
    },
  ];
  const handleBadgeStatus = (e) => {
    if (e === "active") {
      return <div className="badge text-white badge-success">{e}</div>;
    } else if (e === "pending") {
      return <div className="badge text-white badge-warning">{e}</div>;
    } else if (e === "apply") {
      return <div className="badge text-white badge-info">{e}</div>;
    } else if (e === "expired") {
      return <div className="badge text-white badge-error">{e}</div>;
    }
  };
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Fasyankes" icon={faHospital} />
            <div className="mt-5">
              <div className="card shadow-md mt-3">
                <div className="card-body">
                  <div className="card-title flex justify-between">
                    List Of Fasyankes
                    <Link to={"/fasyankes/create"}>
                      <button className="btn bg-primary btn-md hover:bg-primary text-white rounded-md">
                        <FontAwesomeIcon icon={faPlus} />
                        Add Fasyankes
                      </button>
                    </Link>
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
                          <th>Type</th>
                          <th>Status</th>
                          <th>Expired Date</th>
                          <th>View Report</th>
                          <th>View Information</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listFasyankes.map((fasyankes, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{fasyankes.name}</td>
                            <td>{fasyankes.type}</td>
                            <td>{handleBadgeStatus(fasyankes.status)}</td>
                            <td>{fasyankes.expiredDate}</td>
                            <td>View Report</td>
                            <td>View Information</td>
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

export default FasyankesPage;
