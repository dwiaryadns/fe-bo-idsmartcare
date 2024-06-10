import { faKey } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AccessPage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
          <Header title="Access" icon={faKey} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
