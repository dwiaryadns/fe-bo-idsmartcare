import {
  faBagShopping,
  faBox,
  faChartBar,
  faGear,
  faHospital,
  faInfoCircle,
  faMoneyBill,
  faUser,
  faUserGear,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarItemsRev = [
  {
    title: "Dasbor",
    icon: faChartBar,
    link: "dasbor",
  },

  // dua ini saja yang ditampilkan
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
        link: "daftar-produk",
      },
      {
        title: "Stok Fasyankes",
        link: "fasyankes/stok",
      },
      {
        title: "Stok Opname",
        link: "stok-opname",
      },
      {
        title: "Histori Stok Opname",
        link: "stok-opname/histori",
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
];

export const navbarItems = [
  {
    title: "My Profile",
    icon: faUser,
    link: "profile",
  },
  // {
  //   title: "Settings",
  //   icon: faGear,
  //   link: "settings",
  // },
];
