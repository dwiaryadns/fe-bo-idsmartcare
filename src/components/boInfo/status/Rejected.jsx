import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { StateStatus } from "../StateStatus";

export default function Rejected({ reason }) {
  return (
    <div>
      <>
        <StateStatus
          icon={faExclamationTriangle}
          message="Data Anda telah Ditolak"
          status="rejected"
          desc={"Data-data anda ditolak karena " + reason}
        />
      </>
    </div>
  );
}
