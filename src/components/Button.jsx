import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getData } from "../dummy/pentest";

export default function Button({ showIcon, icon, title }) {
  const data = getData;
  console.log(data);
  return (
    <>
      {data.role != "pentest" &&
        data.name != "PENTESTER" &&
        data.email != "pentest@gmail.com" && (
          <button
            className={`btn bg-primary md:btn-md btn-sm hover:bg-primary text-white rounded-md`}
          >
            {showIcon ? <FontAwesomeIcon icon={icon} /> : ""}
            {title}
          </button>
        )}
    </>
  );
}
