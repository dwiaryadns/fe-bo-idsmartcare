import { faHospital } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FormCreateFasyankes } from "../../components/fasyankes/FormCreateFasyankes";

const CreateFasyankesPage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10 ">
            <Header title="Create Fasyankes" icon={faHospital} />
            <div className="mt-3 bg-white p-3 rounded-md shadow-lg">
              <FormCreateFasyankes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFasyankesPage;
