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
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchedData = getData();
    setData(fetchedData);
  }, []);

  // If data is not loaded yet, or role is "pentest", do not render the button
  if (!data || data.role === "pentest") {
    return null; // Return null to hide the button when conditions are not met
  }

  return (
    <button
      className={`btn ${bg ? `bg-${bg}` : "bg-primary"} ${
        w ? `w-${w}` : "w-full"
      } md:btn-md btn-sm hover:bg-primary text-white rounded-md`}
      onClick={onClick}
      onChange={onChange}
    >
      {showIcon ? <FontAwesomeIcon icon={icon} /> : null}
      {children}
    </button>
  );
}
