import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../dummy/const"; // Adjust the path if needed
import { ModalPayNow } from "../components/Modal";
import { Datatable } from "../components/Datatable";

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(true);
  const [needPayData, setNeedPayData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [needPayResponse, historyResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/subscription/need-pay`, { headers }),
        axios.get(`${API_BASE_URL}/subscription/history`, { headers }),
      ]);

      setNeedPayData(needPayResponse.data.data);
      setHistoryData(historyResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const needPayColumns = useMemo(
    () => [
      {
        Header: "Fasyankes",
        accessor: "fasyankes",
      },

      {
        Header: "Description",
        accessor: "plan",
      },
      {
        Header: "Payment Type",
        accessor: "payment_type",
      },
      {
        Header: "Transaction Date",
        accessor: "transaction_time",
      },
      {
        Header: "Expired at",
        accessor: "expired_at",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <span className="dot-pending"></span>
            <div className=" ml-2 place-items-center">
              {row.original.status}
            </div>
          </div>
        ),
      },
      {
        Header: "",
        accessor: "pay_now",
        Cell: ({ row }) => (
          <div>
            <ModalPayNow
              id={row.original.transaction_id}
              qr={row.original.qr_code}
              type={row.original.payment_type}
              va={row.original.va_number}
              amount={row.original.amount}
              refreshData={fetchData}
            />
            <button
              onClick={() =>
                document.getElementById(row.original.transaction_id).showModal()
              }
              className="btn bg-primary text-white hover:bg-primary rounded-md btn-sm"
            >
              Pay Now
            </button>
          </div>
        ),
      },
    ],
    [fetchData]
  );

  const historyColumns = useMemo(
    () => [
      {
        Header: "Fasyankes",
        accessor: "fasyankes",
      },

      {
        Header: "Description",
        accessor: "plan",
      },
      {
        Header: "Payment Type",
        accessor: "payment_type",
      },
      {
        Header: "Transaction Date",
        accessor: "transaction_time",
      },
      {
        Header: "Expired Date",
        accessor: "expired_at",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <span
              className={`${
                row.original.status === "Success" ? "dot-success" : "dot-error"
              }`}
            ></span>
            <div className=" ml-3 place-items-center">
              {row.original.status}
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Layanan Berlangganan" icon={faMoneyBill} />
            <div>
              <div className="shadow-md rounded-md p-5">
                <h3 className="font-bold text-lg mt-5 text-primary">
                  Belum Bayar
                </h3>
                <div>
                  <Datatable
                    columns={needPayColumns}
                    data={needPayData}
                    loading={loading}
                  />
                </div>
              </div>
              <div className="shadow-md rounded-md p-5 mt-5 mb-10">
                <h3 className="font-bold text-lg text-primary">
                  Histori Langganan
                </h3>
                <div>
                  <Datatable
                    columns={historyColumns}
                    data={historyData}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
