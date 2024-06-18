import logo from "../../assets/logo.png";

export const TopBar = ({ title, subtitle }) => {
  return (
    <div>
      <div className="navbar bg-gradient-to-l from-blue-500 to-cyan-400   text-primary-content px-32">
        <div className=" w-full flex justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white">{title}</h3>
            <h4 className="text-xl font-light italic text-white">{subtitle}</h4>
          </div>
          <img src={logo} className="w-56" />
        </div>
      </div>
    </div>
  );
};
