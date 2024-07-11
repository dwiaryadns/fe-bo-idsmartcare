import {
  faBars,
  faBell,
  faCaretDown,
  faCaretLeft,
  faCaretUp,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navbarItems } from "../dummy/data";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from "../dummy/const";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        const headers = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios
          .post(API_BASE_URL + "/logout", {}, headers)
          .then(function (response) {
            console.log(response.data);
            if (response.data.status === true) {
              navigate("/login");
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: response.data.message,
              });
            }
            localStorage.removeItem("token");
            localStorage.removeItem("dataBo");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenArrow = () => {
    setIsOpen(!isOpen);
  };

  const dataBo = JSON.parse(localStorage.getItem("dataBo"));
  return (
    <div className="flex justify-between mx-10 my-10">
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-primary text-white hover:bg-secondary drawer-button lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>
      <div className="flex align-middle content-center items-center gap-3">
        <div className="dropdown md:dropdown-end dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="indicator mr-4 text-2xl flex align-middle content-center items-center hover:cursor-pointer text-primary"
          >
            <span className="indicator-item badge badge-error w-3 p-2 text-[9px] text-white">
              99
            </span>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1]  menu p-2 shadow-md rounded-md bg-base-100 border mt-3 md:min-w-96 min-w-60"
          >
            <li>
              <a>Item 1</a>
            </li>
          </ul>
        </div>
        <h5 className="text-right text-base font-bold max-w-52">
          {dataBo.name}
          <br />
          <h6 className="text-xs font-light">Bussiness Owner</h6>
        </h5>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-7"
            >
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
                  Sign Out
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
