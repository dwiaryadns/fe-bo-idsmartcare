import logo from "../assets/logo.png";

export const TopBar = ({ title, subtitle }) => {
  return (
    <div>
      <div className="navbar bg-gradient-to-l fixed shadow-md from-blue-500 to-cyan-400 text-primary-content px-10 md:px-32">
        <div className=" w-full flex justify-between">
          <div>
            <h3 className="md:text-3xl text-lg font-bold text-white">
              {title}
            </h3>
            <h4 className="md:text-xl text-sm font-light italic text-white">
              {subtitle}
            </h4>
          </div>
          <img src={logo} className="md:min-w-64 max-w-32" />
        </div>
      </div>
    </div>
  );
};
