import {
  faBars,
  faBell,
  faCaretDown,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navbarItems } from "../dummy/data";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../dummy/const";
import { useEffect, useState } from "react";
import axiosInstance from "../dummy/axiosInstance";
import check from "../assets/check.png";
import warning from "../assets/warning.png";
import failed from "../assets/decline.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [countUnReadNotif, setUnReadCountNotif] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const fetchNotif = () => {
    axiosInstance
      .get(API_BASE_URL + "/notifications")
      .then((response) => {
        setUnReadCountNotif(response.data.unread_notif);
        setNotifications(response.data.latest_notif);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchNotif();
    // Listen for the custom event
    const handleNotificationUpdate = () => {
      fetchNotif(); // Fetch notifications again when the event is triggered
    };

    window.addEventListener("notificationUpdated", handleNotificationUpdate);

    return () => {
      window.removeEventListener(
        "notificationUpdated",
        handleNotificationUpdate
      );
    };
  }, []);

  const handleIsRead = (id) => {
    axiosInstance
      .post(API_BASE_URL + "/notifications/update-status", { id: id })
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === id ? { ...notif, is_read: true } : notif
          )
        );
        // Dispatch a custom event when the notification status is updated
        const event = new CustomEvent("notificationUpdated");
        window.dispatchEvent(event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin?",
      text: "Kamu yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .post(API_BASE_URL + "/logout", {})
          .then((response) => {
            if (response.data.status === true) {
              navigate("/login");
              Swal.fire({
                icon: "success",
                title: response.data.message,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });
            }
            localStorage.removeItem("token");
            localStorage.removeItem("dataBo");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleOpenNotif = () => {
    setIsNotifOpen(!isNotifOpen);
  };

  const handleOpenArrow = () => {
    setIsOpen(!isOpen);
  };

  const dataBo = JSON.parse(localStorage.getItem("dataBo"));

  const getNotificationIcon = (type) => {
    switch (type) {
      case "passed":
        return check;
      case "failed":
        return failed;
      case "info":
        return warning;
      default:
        return warning;
    }
  };

  return (
    <div className="flex justify-between mx-10 my-10">
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-primary text-white drawer-button lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>
      <div className="flex align-middle content-center items-center gap-3">
        <div className="">
          <div
            tabIndex={0}
            role="button"
            className="dropdown dropdown-bottom relative indicator mr-4 text-2xl flex align-middle content-center items-center cursor-pointer text-primary"
            onClick={handleOpenNotif} // Correct function call
          >
            {countUnReadNotif > 0 && (
              <span className="indicator-item badge badge-error w-3 p-2 text-[9px] text-white">
                {countUnReadNotif}
              </span>
            )}
            <FontAwesomeIcon icon={faBell} />
          </div>

          {isNotifOpen && ( // Only render when isNotifOpen is true
            <ul className="md:absolute md:right-60 dropdown-content z-[99999] menu p-2 shadow-md rounded-md bg-base-100 border mt-3 md:min-w-96 min-w-60 p-[0px] absolute ">
              <li className="w-full hover:!bg-transparent">
                <div className="text-lg font-bold pl-5 pt-5 pb-3 hover:!bg-transparent pointer-events-none">
                  Notifikasi
                </div>
                <hr className="w-full rounded-none hover:!bg-transparent pointer-events-none" />
                {notifications.length > 0 ? (
                  <div className="flex flex-col w-full p-0 mt-[-7px] hover:!bg-transparent ">
                    {notifications.map((notification, index) => {
                      const bgColor = notification.is_read
                        ? "bg-base-100"
                        : "bg-[#CEF1FF]";

                      return (
                        <div
                          key={index}
                          onClick={() => handleIsRead(notification.id)}
                          className={`flex gap-6  w-full px-5 ${bgColor} p-0 mt-[-12px] py-3 border-t z-[99999] active:text-black focus:text-black`}
                        >
                          <img
                            src={getNotificationIcon(notification.type)}
                            alt=""
                            className="w-10 h-10"
                          />
                          <div className="flex flex-col gap-2">
                            <p className="font-bold text-md">
                              {notification.title}
                            </p>
                            <p className="text-xs">{notification.created_at}</p>
                          </div>
                        </div>
                      );
                    })}
                    <Link
                      to="/notifications"
                      className="flex items-center justify-center
                      hover:!bg-transparent w-full text-md font-bold mt-[-9px] text-primary border-t pt-3 h-full pb-3"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col pb-5 w-full p-0 mt-[-7px] hover:bg-transparent py-2 pointer-events-none">
                    <p className="text-center">Tidak ada notifikasi</p>
                  </div>
                )}
              </li>
            </ul>
          )}
        </div>
        <h5 className="text-right text-base font-bold max-w-52">
          {dataBo?.name}
          <br />
          <p className="text-xs font-light">
            {dataBo.role ?? "Bisnis Owner"}
          </p>
        </h5>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Avatar"
            />
          </div>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            onClick={handleOpenArrow}
            className="hover:text-primary transition duration-300 ease-in-out cursor-pointer flex items-center"
          >
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-0" : "rotate-90"
              }`}
            />
          </div>
          <div
            className={`absolute z-10 transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-100 max-h-96 scale-100"
                : "opacity-0 max-h-0 scale-95"
            }`}
          >
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-7">
              {navbarItems.map((nav, index) => (
                <li
                  key={index}
                  className="text-black hover:rounded-md duration-300 mb-3"
                >
                  <Link to={`/${nav.link}`}>
                    <FontAwesomeIcon className="mr-1" icon={nav.icon} />
                    {nav.title}
                  </Link>
                </li>
              ))}
              <hr />
              <li className="text-black hover:rounded-md duration-300 my-3">
                <Link onClick={handleLogout}>
                  <FontAwesomeIcon className="mr-1" icon={faSignOut} />
                  Keluar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
