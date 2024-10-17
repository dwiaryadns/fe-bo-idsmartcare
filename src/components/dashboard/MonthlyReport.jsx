import { Bar } from "react-chartjs-2";

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
