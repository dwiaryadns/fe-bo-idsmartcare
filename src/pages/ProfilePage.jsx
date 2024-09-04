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
              <div className="hero-content gap-6 flex-col items- lg:flex-row">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="avatar">
                    <div className="md:w-72 rounded">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <div>
                    <table className="text-xl table">
                      <tr>
                        <td className="font-bold">Nama</td>
                        <td>{dataBoObj.name}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Email</td>
                        <td>{dataBoObj.email}</td>
                      </tr>
                    </table>
                  <div className="">
                    <div className="flex items-center text-white flex-row gap-5 bg-primary rounded-md p-3">
                      <div>
                        <h4 className="text-white">Referal Code</h4>
                        <p>BO0000{dataBoObj.id}</p>
                      </div>
                    </div>
                  </div>
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
