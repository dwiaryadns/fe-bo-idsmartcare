import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CardPackage = ({
  icon,
  fitur,
  title,
  price,
  isPopular,
  isAnually,
  disc,
  handleChoosePlan,
  isPackage,
}) => {
  return (
    <div
      className={`shadow-lg ${
        isPackage === title ? "bg-blue-400 text-white" : "bg-white"
      } rounded-md  p-6 text-center border border-primary transition duration-300 flex flex-col justify-between`} // Flex container
      style={{ height: "100%" }} // Ensure the container takes full height
    >
      <div>
        <div className="text-3xl flex gap-3 mb-3">
          <FontAwesomeIcon
            className="bg-primary p-3 text-white rounded-md"
            icon={icon}
          />
          <div
            className={`text-2xl  text-start font-semibold mb-4 mt-2  ${
              isPackage === title ? "text-white" : "text-primary"
            }`}
          >
            {title}{" "}
            {isPopular ? (
              <span
                className={`${
                  isPackage === title ? "text-primary bg-white" : "bg-info text-white"
                } badge text-xs align-center font-bold`}
              >
                Popular
              </span>
            ) : (
              ""
            )}
          </div>
        </div>

        <ul className="mb-4 list-disc ms-5">
          {fitur.map((feature, index) => (
            <li key={index} className="text-start mb-2">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-lg font-bold mt-auto flex flex-col align-bottom gap-3">
        {isAnually ? (
          <div>
            <span
              className={`line-through font-light decoration-red-600 text-black`}
            >
              Rp {price}
            </span>
            <span className="text-xs text-black">/bulan</span>
          </div>
        ) : (
          <div>
            <span>Rp {price}</span>
            {title != "FREE" ? <span className="text-xs">/bulan</span> : ""}
          </div>
        )}
        {isAnually && (
          <div
            className={`text-primary ${
              isPackage === title ? "text-white" : ""
            }`}
          >
            Rp {disc}
            <span className="text-xs">/bulan</span>
          </div>
        )}
        <button
          onClick={handleChoosePlan}
          className="btn text-white hover:bg-primary rounded-md bg-primary"
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};
