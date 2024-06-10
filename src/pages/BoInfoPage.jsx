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
          <div className="mx-10 bg-white">
            <Header title="Business Owner Info" icon={faInfoCircle} />
            <div>
              <h4 className="text-lg font-bold mt-3">Business Information</h4>
              <p className="text-sm">
                Tell the world all about your business by entering a few
                business details to get started
              </p>
            </div>
            <FormBoInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoInfoPage;
