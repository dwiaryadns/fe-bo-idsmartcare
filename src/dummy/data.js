import {
  faBox,
  faChartBar,
  faGear,
  faHistory,
  faHospital,
  faInfoCircle,
  faKey,
  faLegal,
  faLock,
  faMoneyBill,
  faReceipt,
  faTag,
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
  {
    title: "Inventory",
    icon: faBox,
    link: "inventory",
  },
  {
    title: "Purchase",
    icon: faTag,
    link: "purchase",
  },
  {
    title: "Good Receipt",
    icon: faReceipt,
    link: "good-receipt",
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
