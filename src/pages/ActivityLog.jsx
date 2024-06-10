import { faHistory } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ActivityLog = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full mx-10">
          <Navbar />
          <div className="">
            <Header title="Activity Log" icon={faHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
