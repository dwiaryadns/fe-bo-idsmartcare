import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { DatatableWithPaginate } from "../../components/Datatable";
import axiosInstance from "../../dummy/axiosInstance";
import { ModalOpname } from "../../components/Modal";

export default function StockOpnamePage() {
  const [loading, setLoading] = useState(true);
  const handleFormatDate = (date) => {
    if (date === null) {
      return "Belum Pernah";
    } else {
      const originalDate = date.created_at;
      const newdate = new Date(originalDate);
      const optionsDate = {
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formattedDate = new Intl.DateTimeFormat(
        "id-ID",
        optionsDate
      ).format(newdate);
      const formattedTime = new Intl.DateTimeFormat(
        "id-ID",
        optionsTime
      ).format(newdate);

      const formattedDateTime = `${formattedDate} : ${formattedTime}`;
      return formattedDateTime;
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Nama Barang",
        accessor: "barang.nama_barang",
      },
      {
        Header: "Gudang",
        accessor: "warehouse.name",
        Cell: ({ row }) => (
          <div className="indicator">
            {row.original.warehouse
              ? row.original.warehouse.name
              : row.original.fasyankes_warehouse.warehouse.name}
          </div>
        ),
      },
      {
        Header: "Fasyankes",
        accessor: "fasyankes",
        Cell: ({ row }) => (
          <div className="indicator">
            {row.original.fasyankes_warehouse
              ? row.original.fasyankes_warehouse.fasyankes.name
              : "-"}
          </div>
        ),
      },
      {
        Header: "Stok",
        accessor: "stok",
        Cell: ({ row }) => (
          <div>
            {row.original.stok} {row.original.barang.satuan}
          </div>
        ),
      },
      {
        Header: "Terakhir Opname",
        accessor: "last_opname",
        Cell: ({ row }) => handleFormatDate(row.original.latest_stok_opname),
      },
      {
        Header: "Opname",
        accessor: "opname",
        Cell: ({ row }) => (
          <div>
            <ModalOpname id={row.id} barang={row.original} />
            <button
              onClick={() => document.getElementById(row.id).showModal()}
              className="btn bg-primary btn-sm hover:bg-primary text-white rounded-md"
            >
              Opname
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [warehouse, setWarehouse] = useState([]);
  const [fasyankes, setFasyankes] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleSelectWarehouse = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedWarehouse(selectedId);

    const selectedWh = warehouse.find((wh) => wh.id === selectedId);
    if (selectedWh) {
      setFasyankes(selectedWh.fasyankes);
    }
  };

  const [selectedFasyankes, setSelectedFasyankes] = useState(null);
  const handleSelectFasyankes = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedFasyankes(selectedId);
  };

  useEffect(() => {
    const fetchWarehouse = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/warehouses");
        setWarehouse(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, []);

  const params = useMemo(
    () => ({
      warehouse_id: selectedWarehouse,
      fasyankes_id: selectedFasyankes,
    }),
    [selectedWarehouse, selectedFasyankes]
  );

  return (
    <Layout title={"Stok Opname"} icon={faBox}>
      <div className="card shadow-md ">
        <div className="card-body">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <div>
              <label className="font-bold">Gudang</label>
              <select
                onChange={handleSelectWarehouse}
                className="select select-bordered w-full rounded-md select-primary"
              >
                <option value={""}>Pilih Semua</option>
                {warehouse.map((wh, index) => (
                  <option key={index} value={wh.id}>
                    {wh.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Fasyankes</label>
              <select
                onChange={handleSelectFasyankes}
                className="select select-bordered w-full rounded-md select-primary"
              >
                <option value={""}>Pilih Semua</option>
                {fasyankes.map((fasy, index) => (
                  <option key={index} value={fasy.fasyankesId}>
                    {fasy.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr></hr>
          <div>
            <DatatableWithPaginate
              endpoint={"/stok-opname/barang"}
              columns={columns}
              params={params}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
