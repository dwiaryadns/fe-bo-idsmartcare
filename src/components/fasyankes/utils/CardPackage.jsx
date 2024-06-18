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
        isPackage === title ? "bg-blue-200" : ""
      }  rounded-md bg-white p-6 text-center border border-primary transition duration-300 `}
    >
      {isPopular && (
        <div className="text-primary font-semibold">Most Popular</div>
      )}
      <div className="text-3xl text-primary">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-lg font-semibold mb-4 mt-2">{title}</div>
      <div className="mb-4">
        {fitur.map((feature, index) => (
          <div key={index} className="flex items-center justify-center mb-2">
            <span className="text-primary mr-2">&#x2022;</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="text-lg font-bold mb-4">
        {isAnually ? <del>Rp {price}</del> : "Rp " + price}
        {isAnually && <div className="text-primary">Rp {disc}</div>}
      </div>
      <button
        onClick={handleChoosePlan}
        className="btn text-white hover:bg-primary rounded-md bg-primary"
      >
        Choose Plan
      </button>
    </div>
  );
};
