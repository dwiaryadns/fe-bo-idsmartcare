import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusLegal = ({ icon, desc, message, status }) => {
  return (
    <div className="mt-3">
      <div className="bg-[#DFEBFD] flex flex-col justify-center py-14 rounded-md">
        <FontAwesomeIcon className="text-[200px] text-primary" icon={icon} />
        <p className="text-center text-primary text-xl mt-4">{message}</p>
      </div>
      <p className="border mt-3 p-3 text-center">{desc}</p>
    </div>
  );
};

export default StatusLegal;
