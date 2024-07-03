import { faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const ProfilePage = () => {
  const getDataBo = localStorage.getItem("dataBo");
  const dataBoObj = JSON.parse(getDataBo);
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full ">
          <Navbar />
          <div className="mx-10">
            <Header title="My Profile" icon={faUser} />
            <div className="hero rounded-md bg-slate-200">
              <div className="hero-content gap-6 flex-col items-start lg:flex-row">
                <div className="avatar">
                  <div className="w-72 rounded">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-3xl">{dataBoObj.name}</p>
                    <p>Email</p>
                    <p>{dataBoObj.email}</p>
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
