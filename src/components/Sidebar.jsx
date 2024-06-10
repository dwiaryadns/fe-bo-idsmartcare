import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo3 from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../dummy/data";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-primary">
      <div className="drawer lg:drawer-open shadow h-full z-20">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-primary">
            <img src={logo3} className="mb-5" alt="Logo" />
            <hr className="mb-5" />
            {sidebarItems.map((sidebar, index) => (
              <li
                key={index}
                className={`text-white text-xl hover:bg-secondary hover:rounded-md duration-300 mb-3 ${
                  location.pathname.startsWith("/" + sidebar.link)
                    ? "bg-secondary rounded-md"
                    : ""
                }`}
              >
                <Link to={`/${sidebar.link}`}>
                  <FontAwesomeIcon className="mr-3" icon={sidebar.icon} />
                  {sidebar.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
