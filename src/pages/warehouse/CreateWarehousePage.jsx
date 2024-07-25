import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FormCreateWarehouse } from "../../components/warehouse/FormCreateWarehouse";

export const CreateWarehousePage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10 ">
            <Header title="Tambah Gudang" icon={faWarehouse} />
            <div className=" bg-white p-3 rounded-md shadow-lg">
              <FormCreateWarehouse />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
