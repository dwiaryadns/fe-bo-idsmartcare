import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const StateStatus = ({ icon, desc, message, status }) => {
  return (
    <div className="">
      <div className="bg-[#DFEBFD] flex flex-col justify-center py-14 rounded-md">
        <FontAwesomeIcon className="text-[200px] text-primary" icon={icon} />
        <p className="text-center text-primary text-xl">{message}</p>
      </div>
      <p className="border mt-3 p-3 text-center">
        {desc} {status === "apply" ? <Link to={"/legal-document"} className="underline font-bold">Legal Document</Link> : ""}
      </p>
    </div>
  );
};
