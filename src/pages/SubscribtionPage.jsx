import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const SubscribtionPage = () => {
  return (
    <div>
      <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="mx-10">
            <Header title="Subscription" icon={faMoneyBill} />
            <div>
              <h3 className="font-bold text-lg mt-5">Need Pay</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Expired at</th>
                      <th>Description</th>
                      <th>Payment Type</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>24 Mei 2024</td>
                      <td>Apotik Plus Plan - 1 bulan</td>
                      <td>BCA</td>
                      <td>Rp 290.000</td>
                      <td>
                        <button className="btn bg-primary text-white hover:bg-primary rounded-md btn-sm">
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="font-bold text-lg mt-10">Subscription History</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Transaction Date</th>
                      <th>Description</th>
                      <th>Payment Type</th>
                      <th>Expired At</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>24 Mei 2024</td>
                      <td>Apotik Plus Plan - 1 bulan</td>
                      <td>BCA</td>
                      <td>24 Mei 2024</td>

                      <td>Rp 290.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribtionPage;
