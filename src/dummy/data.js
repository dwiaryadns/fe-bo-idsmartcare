import {
  faBagShopping,
  faBox,
  faChartBar,
  faGear,
  faHistory,
  faHospital,
  faIndustry,
  faInfoCircle,
  faKey,
  faLegal,
  faLock,
  faMoneyBill,
  faReceipt,
  faTag,
  faUser,
  faUserGear,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: faChartBar,
    link: "dashboard",
    type: "list",
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
    title: "Supplier",
    icon: faIndustry,
    link: "supplier",
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
export const sidebarItemsRev = [
  {
  title: "Dashboard",
    icon: faChartBar,
    link: "dashboard",
  },
  {
    title: "Informasi Bisnis",
    icon: faInfoCircle,
    list: [
      {
        title: "Informasi Bisnis Owner",
        link: "bo-info",
      },
      {
        title: "Dokumen Legal",
        link: "legal-document",
      },
    ],
  },

  {
    title: "Manajemen Gudang",
    icon: faWarehouse,
    list: [
      {
        title: "Informasi Gudang",
        link: "warehouse",
      },
      {
        title: "Stok Gudang",
        link: "warehouse/stok",
      },
      {
        title: "Supplier",
        link: "supplier",
      },
    ],
  },
  {
    title: "Fasyankes",
    icon: faHospital,
    link: "fasyankes",
  },

  {
    title: "Layanan Berlangganan",
    icon: faMoneyBill,
    link: "subscription",
  },
  {
    title: "Pengadaan",
    icon: faBagShopping,
    list: [
      {
        title: "Pemesanan Barang",
        link: "purchase",
      },
      {
        title: "Penerimaan Barang",
        link: "good-receipt",
      },
      {
        title: "Distribusi Barang",
        link: "distribusi",
      },
    ],
  },
  {
    title: "Persediaan",
    icon: faBox,
    list: [
      {
        title: "Daftar Produk",
        link: "produk",
      },
      {
        title: "Stock Fasyankes",
        link: "inventory",
      },
    ],
  },
  {
    title: "Manajemen Pengguna",
    icon: faUserGear,
    list: [
      {
        title: "Hak Akses",
        link: "access",
      },
      {
        title: "Histori Aktivitas",
        link: "activity-log",
      },
    ],
  },
  {
    title: "Keamanan Akun",
    icon: faLock,
    link: "password-security",
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
