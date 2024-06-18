import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import FormBoInfo from "../components/boInfo/FormBoInfo";
import Header from "../components/Header";

const BoInfoPage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10 ">
            <Header title="Business Owner Info" icon={faInfoCircle} />
            <FormBoInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoInfoPage;
