import { faSave } from "@fortawesome/free-solid-svg-icons";
import { StateStatus } from "../StateStatus";

export default function Apply() {
  return (
    <StateStatus
      icon={faSave}
      message="Data Anda telah Dikirim."
      status="apply"
      desc={
        "Data-data akan dicocokan dengan Legal Doc yang diupload silahkan upload "
      }
    />
  );
}
