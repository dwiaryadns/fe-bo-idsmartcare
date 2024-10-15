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
        <div className="w-full overflow-hidden pb-10">
          <Navbar />
          <div className="mx-5 md:mx-10">
            <Header title="Create Fasyankes" icon={faHospital} />
            <div className="bg-white px-3 md:p-2 md:px-0 rounded-md shadow-lg pb-5">
              <FormCreateFasyankes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFasyankesPage;
