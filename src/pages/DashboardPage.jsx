import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  ChartDaily,
  LineMonthlyReport,
  PieStockReports,
} from "../components/ChartDashboard";
import Layout from "../components/Layout";

const DashboardPage = () => {
  return (
    <Layout title={"Dasbor"} icon={faChartBar}>
      <div className="mt-3">
        <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            Please Complete your Business Owner Info data! {"  "}
            <Link to="/bo-info" className="font-bold underline">
              Click Here!
            </Link>
          </span>
        </div>
        <ChartDaily />
        <LineMonthlyReport />
        <PieStockReports />
      </div>
    </Layout>
  );
};

export default DashboardPage;
