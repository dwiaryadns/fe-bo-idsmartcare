import { faLock } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PasswordSecurityPage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
          <Header title="Password & Security" icon={faLock}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurityPage;
