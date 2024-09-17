import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo3 from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { sidebarItemsRev } from "../dummy/data"; // Pastikan Anda menggunakan sidebarItemsRev
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const isChildActive = (sidebar) => {
    return sidebar.list.some((child) =>
      location.pathname.startsWith("/" + child.link)
    );
  };

  useEffect(() => {
    const activeItems = {};
    sidebarItemsRev.forEach((item, index) => {
      if (item.list && isChildActive(item)) {
        activeItems[index] = true;
      }
    });
    setOpenItems(activeItems);
  }, [location.pathname]);

  return (
    <div className="bg-primary">
      <div className="drawer lg:drawer-open shadow h-full z-20 top-0 left-0">
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
            {sidebarItemsRev.map((sidebar, index) => (
              <div key={index}>
                {sidebar.list ? (
                  <div
                    className={`collapse bg-primary text-white ${
                      isChildActive(sidebar) || openItems[index]
                        ? "bg-secondary mb-2"
                        : ""
                    }`}
                  >
                    <div
                      className="collapse-title text-sm font-medium flex justify-between items-center cursor-pointer"
                      onClick={() => toggleItem(index)}
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon className="mr-3" icon={sidebar.icon} />
                        {sidebar.title}
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`transition-transform duration-300 transform ${
                          openItems[index] ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </div>
                    {openItems[index] && (
                      <ul className="bg-secondary rounded-xl transition-all duration-300 mb-3">
                        <hr className="mx-4" />

                        {sidebar.list.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className={` text-white text-base hover:rounded-none duration-300 ${
                              location.pathname.startsWith("/" + subItem.link)
                                ? "bg-secondary"
                                : ""
                            }`}
                          >
                            <Link
                              to={`/${subItem.link}`}
                              className="px-5 rounded-md text-sm"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <li
                    className={`text-white text-sm hover:bg-secondary hover:rounded-md duration-300 mb-3 ${
                      location.pathname.startsWith("/" + sidebar.link)
                        ? "bg-secondary rounded-md"
                        : ""
                    }`}
                  >
                    <Link
                      to={`/${sidebar.link}`}
                      className="hover:bg-secondary rounded-md"
                    >
                      <FontAwesomeIcon className="mr-3" icon={sidebar.icon} />
                      {sidebar.title}
                    </Link>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
