import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import axiosInstance from "../dummy/axiosInstance";
import { API_BASE_URL } from "../dummy/const";
import Loading from "./Loading";

export const ChartDaily = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(API_BASE_URL + "/dashboard/daily")
      .then((response) => {
        const data = response.data;
        const labels = Object.keys(data).map((day) => day.toString());
        const incomeData = Object.values(data).map((item) => item.income);
        const outcomeData = Object.values(data).map((item) => item.outcome);
        setLoading(false);
        setChartData({
          labels,
          datasets: [
            {
              label: "Pendapatan",
              backgroundColor: "rgba(15, 15, 53, 1)",
              borderWidth: 2,
              data: incomeData,
            },
            {
              label: "Pengeluaran",
              backgroundColor: "rgba(6, 99, 236,1)",
              borderWidth: 2,
              data: outcomeData,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching daily report data", error);
      });
  }, []);

  return (
    <div className="mt-3">
      <div className="card shadow rounded-lg">
        <div className="card-body">
          <h1 className="font-bold">Daily Income and Outcome Report</h1>
          <div>
            {loading ? (
              <Loading type={"spinner"} size={"xl"} />
            ) : (
              <Bar data={chartData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const LineMonthlyReport = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`${API_BASE_URL}/dashboard/monthly`)
      .then((response) => {
        setLoading(false);
        const dataArray = Object.entries(response.data).map(
          ([month, data]) => ({
            month: parseInt(month),
            ...data,
          })
        );
        setMonthlyData(dataArray);
      })
      .catch((error) => {
        console.error("There was an error fetching the report data!", error);
      });
  }, []);

  const labels = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const income = monthlyData.map((item) => item.income || 0);
  const outcome = monthlyData.map((item) => item.outcome || 0);
  const netIncome = monthlyData.map((item) => item.net_income || 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Pendapatan",
        data: income,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Pengeluaran",
        data: outcome,
        fill: false,
        borderColor: "rgba(6, 99, 236,1)",
        tension: 0.1,
      },
      {
        label: "Pendapatan Bersih",
        data: netIncome,
        fill: false,
        borderColor: "rgba(15, 15, 53, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="mt-3">
      <div className="card shadow rounded-lg">
        <div className="card-body">
          <h1 className="font-bold">
            Monthly Report - {new Date().getFullYear()}
          </h1>
          <div>
            {loading ? (
              <Loading type={"bars"} size={"xl"} />
            ) : (
              <Line data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PieStockReports = () => {
  const [stockGudang, setStockGudang] = useState([]);
  const [stockFasyankes, setStockFasyankes] = useState([]);
  const [gudangId, setGudangId] = useState("");
  const [fasyankesId, setFasyankesId] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const [fasyankes, setFasyankes] = useState([]);
  useEffect(() => {
    fetchStockGudang();
    fetchStockFasyankes();
    fetchWarehouse();
    fetchFasyankes();
  }, [gudangId, fasyankesId]);

  const fetchWarehouse = async () => {
    const response = await axiosInstance.get("/warehouses");
    console.log(response);

    setWarehouse(response.data.data);
  };
  const fetchFasyankes = async () => {
    const response = await axiosInstance.get("/fasyankes");
    console.log(response);
    setFasyankes(response.data.data);
  };

  const fetchStockGudang = async () => {
    const response = await axiosInstance.get(
      API_BASE_URL + "/dashboard/stok-gudang",
      { params: { warehouse_id: gudangId } }
    );
    setStockGudang(response.data.stockGudang);
  };

  const fetchStockFasyankes = async () => {
    const response = await axiosInstance.get(
      API_BASE_URL + "/dashboard/stok-fasyankes",
      { params: { fasyankes_warehouse_id: fasyankesId } }
    );
    setStockFasyankes(response.data.stockFasyankes);
  };

  const gudangData = {
    labels: stockGudang.map((item) => item.barang.nama_barang),
    datasets: [
      {
        label: "Stok Gudang",
        data: stockGudang.map((item) => item.stok),
        backgroundColor: [
          "rgb(108, 229, 232)",
          "rgb(65, 184, 213)",
          "rgb(45, 139, 186)",
          "rgb(47, 95, 152)",
          "rgb(49, 53, 110)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  console.log(warehouse);
  console.log(fasyankes);

  const fasyankesData = {
    labels: stockFasyankes.map((item) => item.barang.nama_barang),
    datasets: [
      {
        label: "Stok Fasyankes",
        data: stockFasyankes.map((item) => item.stok),
        backgroundColor: [
          "rgb(255, 159, 64)",
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white mt-10 rounded-lg shadow-lg p-4 pb-10">
      <h1 className="font-bold text-center my-3">
        Monitoring Stok Gudang & Fasyankes
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col mt-3">
          <div>
            <label htmlFor="gudang" className="block mb-2">
              Filter Gudang:
            </label>
            <select
              id="gudang"
              className="w-full border p-2 rounded"
              value={gudangId}
              onChange={(e) => setGudangId(e.target.value)}
            >
              <option value="" selected hidden>
                Select Gudang
              </option>
              {warehouse.map((w, index) => (
                <option key={index} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-72">
            {stockGudang.length == 0 ? (
              <div className="flex items-center justify-center mt-10">
                Tidak ada Data
              </div>
            ) : (
              <Pie data={gudangData} options={options} />
            )}
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div>
            <label htmlFor="fasyankes" className="block mb-2">
              Filter Fasyankes:
            </label>
            <select
              id="fasyankes"
              className="w-full border p-2 rounded"
              value={fasyankesId}
              onChange={(e) => setFasyankesId(e.target.value)}
            >
              <option value="" selected hidden>
                Select Fasyankes
              </option>
              {fasyankes.map((f, index) => (
                <option key={index} value={f.fasyankesId}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-72">
            {stockFasyankes.length == 0 ? (
              <div className="flex items-center justify-center mt-10">
                Tidak ada Data
              </div>
            ) : (
              <Pie data={fasyankesData} options={options} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
