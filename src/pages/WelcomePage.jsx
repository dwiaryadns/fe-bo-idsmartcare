import { faHome } from "@fortawesome/free-solid-svg-icons";
import image from "../assets/welcome.png";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export const WelcomePage = () => {
  const dataBo = JSON.parse(localStorage.getItem("dataBo"));
  const name = dataBo.name.split(" ")[0];
  return (
    <div>
      <div className="flex flex-row w-full md:h-screen relative">
        <Sidebar />
        <div className="w-full overflow-hidden pb-10">
          <Navbar />
          <div className="mx-10">
            <Header title={"Welcome"} icon={faHome} />
            <div className="grid grid-cols-12 mt-10  items-center ">
              <div className="col-span-full md:col-span-6  md:mt-12 flex flex-col gap-3">
                <h1 className="font-extrabold md:text-4xl text-2xl">
                  Selamat Datang,
                  <p>
                    Staff {dataBo.role}, {name}
                  </p>
                </h1>
                <p className="text-base">
                  idSmartCare adalah layanan manajemen distribusi barang kepada
                  gudang dan fasyankes. Dengan idSmartCare, Anda dapat mengelola
                  data barang, tracking stok, dan lainnya secara efektif dan
                  mudah.
                </p>
              </div>
              <div className="col-span-full md:col-span-6 absolute md:block hidden  bottom-0 right-0">
                <img
                  src={image}
                  alt="Welcome Page"
                  className="max-w-full max-h-[410px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
