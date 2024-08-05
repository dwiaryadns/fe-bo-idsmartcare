import { faBox } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import { useEffect, useMemo, useState } from "react";
import { DatatableWithPaginate } from "../../components/Datatable";
import axiosInstance from "../../dummy/axiosInstance";

export const HistoryStockOpname = () => {
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Gudang / Fasyankes",
        accessor: "gudang_fasyankes",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.stock_gudang_id != null
                ? row.original.stok_gudang.warehouse.name
                : row.original.stok_barang.fasyankes_warehouse.fasyankes.name}
            </span>
          );
        },
      },
      {
        Header: "Nama Barang",
        accessor: "barang.nama_barang",
      },
      {
        Header: "Petugas",
        accessor: "petugas",
      },

      {
        Header: "Jumlah Tercatat",
        accessor: "jml_tercatat",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.jml_tercatat} {row.original.barang.satuan}
            </span>
          );
        },
      },
      {
        Header: "Jumlah Fisik",
        accessor: "jml_fisik",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.jml_fisik} {row.original.barang.satuan}
            </span>
          );
        },
      },
      {
        Header: "Jumlah Penyesuaian",
        accessor: "jml_penyesuaian",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.jml_penyesuaian} {row.original.barang.satuan}
            </span>
          );
        },
      },
      {
        Header: "Tanggal Opname",
        accessor: "created_at",
        Cell: ({ row }) => {
          const originalDate = row.original.created_at;

          const date = new Date(originalDate);

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
          ).format(date);
          const formattedTime = new Intl.DateTimeFormat(
            "id-ID",
            optionsTime
          ).format(date);

          const formattedDateTime = `${formattedDate} : ${formattedTime}`;

          return <span>{formattedDateTime}</span>;
        },
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
    console.log(selectedId)
    if ((selectedId == 0) || (selectedId == undefined)) {
      setFasyankes([]);
      setSelectedFasyankes(null);
      return;
    }

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
    <Layout title={"Histori Stok Opname"} icon={faBox}>
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
          <div className="table-pin-rows overflow-x-auto">
            <DatatableWithPaginate
              endpoint={"/stok-opname/histori"}
              columns={columns}
              params={params}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
