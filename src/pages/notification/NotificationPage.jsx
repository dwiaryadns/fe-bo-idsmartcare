import { faBell } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import axiosInstance from "../../dummy/axiosInstance";
import { API_BASE_URL } from "../../dummy/const";
import { useEffect, useState } from "react";
import check from "../../assets/check.png";
import warning from "../../assets/warning.png";
import failed from "../../assets/decline.png";
import Loading from "../../components/Loading";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    axiosInstance
      .get(API_BASE_URL + "/notifications")
      .then((response) => {
        setNotifications(response.data.all_notif);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "passed":
        return check;
      case "failed":
        return failed;
      case "info":
        return warning;
      default:
        return warning;
    }
  };

  const handleIsRead = (id) => {
    axiosInstance
      .post(API_BASE_URL + "/notifications/update-status", { id: id })
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === id ? { ...notif, is_read: true } : notif
          )
        );
        // Dispatch a custom event when the notification status is updated
        const event = new CustomEvent("notificationUpdated");
        window.dispatchEvent(event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout title={"Notifikasi"} icon={faBell}>
      <div className="mt-5">
        <div className="flex gap-6 flex-col">
          {loading && (
            <div className="flex justify-center mt-32 text-primary">
              <Loading type={"bars"} size={"lg"} />
            </div>
          )}

          {notifications.map((notification, index) => {
            const bgColor = notification.is_read
              ? "bg-[#EEEEEE]"
              : "bg-blue-200";

            return (
              <div
                onClick={() => handleIsRead(notification.id)}
                key={index}
                className={`flex gap-6 border-b w-full px-5 ${bgColor} p-0 mt-[-10px] py-3 rounded-lg cursor-pointer`}
              >
                <img
                  src={getNotificationIcon(notification.type)}
                  alt=""
                  className="w-10 h-10"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-md">{notification.title}</p>
                  <p className="text-xs">{notification.created_at}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
