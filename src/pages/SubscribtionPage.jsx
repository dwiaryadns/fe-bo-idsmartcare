import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const SubscribtionPage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Subscription" icon={faMoneyBill} />
            <div>
            tes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribtionPage;
