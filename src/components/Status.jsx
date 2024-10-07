import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Status({
  icon,
  desc,
  message,
  status,
  type,
  children,
}) {
  if (status === "pending" || status === "approved") {
    return children;
  } else {
    return (
      <div>
        <div className="bg-[#DFEBFD] flex flex-col justify-center py-14 rounded-md">
          <FontAwesomeIcon className="text-[200px] text-primary" icon={icon} />
          <p className="text-center text-primary text-xl">{message}</p>
        </div>
        <p className="border mt-3 p-3 text-center">
          {desc}{" "}
          {status === "apply" && type === "bo-info" ? (
            <Link to={"/legal-document"} className="underline font-bold">
              Legal Document
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
    );
  }
}
