import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { getData } from "../dummy/pentest";

export default function Button({
  showIcon,
  icon,
  children,
  bg,
  onClick,
  onChange,
  w,
  loading,
  custom
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchedData = getData();
    setData(fetchedData);
  }, []);

  if (!data || data.role === "pentest") {
    return null;
  }

  return (
    <button
      disabled={loading}
      className={`btn ${bg ? `bg-${bg}` : "bg-primary"} ${
        w ? `w-${w}` : "w-full"
      } md:btn-md btn-sm  hover:${
        bg ? `bg-${bg}` : "bg-primary"
      } text-white rounded-md ${custom}`}
      onClick={onClick}
      onChange={onChange}
    >
      {showIcon ? <FontAwesomeIcon icon={icon} /> : null}
      {children}
    </button>
  );
}
