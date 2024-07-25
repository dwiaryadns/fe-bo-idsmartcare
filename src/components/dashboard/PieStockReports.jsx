import { Pie } from "react-chartjs-2";

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
