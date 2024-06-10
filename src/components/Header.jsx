import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  return (
    <div>
      <div className="bg-primary rounded-lg p-5 flex text-lg content-center items-center gap-3 text-white ">
        <FontAwesomeIcon icon={props.icon} />
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default Header;
