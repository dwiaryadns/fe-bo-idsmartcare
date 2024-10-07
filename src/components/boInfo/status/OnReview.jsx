import { StateStatus } from "../StateStatus";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

export default function OnReview() {
  return (
    <>
      <StateStatus
        icon={faHourglass}
        message="On Review"
        status="on review"
        desc={"Data-data anda sedang direview"}
      />
    </>
  );
}
