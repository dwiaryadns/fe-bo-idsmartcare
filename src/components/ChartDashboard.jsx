import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

export const ChartDaily = () => {
  const state = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgba(15, 15, 53, 1)",
        borderWidth: 2,
        data: [
          65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 81, 56, 65, 59, 80, 81, 56,
          65, 59, 80, 81, 56, 81, 56, 65, 59, 80, 81, 56, 65,
        ],
      },
      {
        label: "Outcome",
        backgroundColor: "rgba(6, 99, 236,1)",
        borderWidth: 2,
        data: [
          65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 81, 56, 65, 59, 80, 81, 56,
          65, 59, 80, 81, 56, 81, 56, 65, 59, 80, 81, 56, 65,
        ],
      },
    ],
  };

  return (
    <div className="mt-3">
      <div className="card shadow rounded-lg">
        <div className="card-body">
          <h1 className="font-bold">
            Daily Income and Outcome Report - Juny 2024
          </h1>
          <div>
            <Bar data={state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LineMonthlyReport = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Outcome",
        data: [61, 56, 41, 10, 22, 31, 20, 56, 41, 10, 22, 31, 61],
        fill: false,
        borderColor: "rgba(6, 99, 236,1)",
        tension: 0.1,
      },
      {
        label: "Net Income",
        data: [20, 12, 20, 21, 50, 21, 43, 20, 12, 20, 21, 50],
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
          <h1 className="font-bold">Monthly Report - 2024</h1>
          <div>
            <Line data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PieStockReports = () => {
  const data = {
    labels: ["Suntikan", "Tablet", "Salep", "Kapsul", "Sirup"],
    datasets: [
      {
        label: "Persent:",
        data: [15, 15, 20, 20, 30],
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

  const options = {
    maintainAspectRatio: false, // This allows the chart to be resized
  };

  return (
    <div className="bg-white mt-10 rounded-lg shadow-lg p-4">
      <h1 className="font-bold">Monitoring medical equipment stock reports</h1>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className=" ">
          <Pie data={data} options={options} width={400} height={200} />
        </div>
      </div>
    </div>
  );
};
