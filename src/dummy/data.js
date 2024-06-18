import {
  faChartBar,
  faGear,
  faHistory,
  faHospital,
  faInfoCircle,
  faKey,
  faLegal,
  faLock,
  faMoneyBill,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: faChartBar,
    link: "dashboard",
  },
  {
    title: "Bussiness Owner Info",
    icon: faInfoCircle,
    link: "bo-info",
  },
  {
    title: "Legal Document",
    icon: faLegal,
    link: "legal-document",
  },
  {
    title: "Warehouse",
    icon: faWarehouse,
    link: "warehouse",
  },
  {
    title: "Fasyankes",
    icon: faHospital,
    link: "fasyankes",
  },

  {
    title: "Subscription",
    icon: faMoneyBill,
    link: "subscription",
  },
  {
    title: "Access",
    icon: faKey,
    link: "access",
  },
  {
    title: "Password & Security",
    icon: faLock,
    link: "password-security",
  },

  {
    title: "Activity Log",
    icon: faHistory,
    link: "activity-log",
  },
];

export const navbarItems = [
  {
    title: "My Profile",
    icon: faUser,
    link: "profile",
  },
  {
    title: "Settings",
    icon: faGear,
    link: "settings",
  },
];
