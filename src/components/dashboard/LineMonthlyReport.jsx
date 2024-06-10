import { Line } from "react-chartjs-2";

const LineMonthlyReport = () => {
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

export default LineMonthlyReport;
