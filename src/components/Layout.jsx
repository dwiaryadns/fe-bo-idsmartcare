import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Layout = ({ title, icon, children }) => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title={title} icon={icon} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
