import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CardPackage = ({
  fitur,
  title,
  icon,
  price,
  isPopular,
  isAnually,
  disc,
}) => {
  return (
    <div>
      <div className={`card border border-primary rounded-md shadow-xl`}>
        <div className="card-body">
          <span>
            <FontAwesomeIcon
              icon={icon}
              className="bg-primary p-3 text-white text-3xl rounded-lg"
            />
          </span>
          <h2 className="card-title text-3xl text-primary">
            {title}{" "}
            {isPopular ? (
              <span className="bg-secondary text-white text-lg p-1 rounded-lg">
                Popular
              </span>
            ) : (
              ""
            )}
          </h2>
          <div className="flex gap-3 items-center">
            <h2
              className={`${
                isAnually ? "line-through decoration-red-600" : ""
              }`}
            >
              {price}
            </h2>
            {isAnually ? (
              <span className="no-underline text-xs bg-primary text-white p-1 rounded-lg">
                20%
              </span>
            ) : (
              ""
            )}
          </div>
          {isAnually ? <h2 className="">{disc}</h2> : null}
          <p></p>
          <h2 className="card-title">{title} Plan Benefits : </h2>

          <ul className="list-disc ms-5">
            {fitur.map((f, index) => (
              <li key={index}>{f}</li>
            ))}
          </ul>
          <div className="card-actions justify-center">
            <button className="btn hover:bg-primary border-none bg-primary text-white btn-sm rounded-md">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
