
export default function Approved({ boInfo }) {
  const InputApproved = ({ label, value }) => {
    return (
      <div className="form-control w-full flex md:flex-row flex-col  md:items-center mb-5">
        <div className="label min-w-52">
          <span className="label-text font-bold text-base">{label}</span>
        </div>

        <div className="w-full mr-3">
          <input
            type="text"
            value={value}
            disabled
            className={`input disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none input-bordered w-full input-primary rounded-md `}
          />
        </div>
      </div>
    );
  };
  const addressFormat =
    boInfo.address +
    ", " +
    boInfo.village +
    ", " +
    boInfo.subdistrict +
    ", " +
    boInfo.city +
    ", Indonesia, " +
    boInfo.postal_code;

  return (
    <div>
      <div className="flex mt-3 flex-col">
        <InputApproved label={"Business ID"} value={boInfo.businessId} />
        <InputApproved label={"Business Type"} value={boInfo.businessType} />
        <InputApproved label={"Business Name"} value={boInfo.businessName} />
        <InputApproved label={"Business Email"} value={boInfo.businessEmail} />
        <InputApproved label={"Phone Number"} value={boInfo.phone} />
        <InputApproved label={"Mobile Phone"} value={boInfo.mobile} />
        <div className="form-control w-full flex md:flex-row flex-col  md:items-center">
          <div className="label min-w-52">
            <span className="label-text font-bold text-base">
              Street Address
            </span>
          </div>

          <div className="w-full mr-3">
            <textarea
              value={addressFormat}
              disabled
              className="textarea resize-none disabled:bg-blue-100 disabled:text-black disabled:border-gray-200 disabled:shadow-none w-full textarea-bordered rounded-md textarea-primary textarea-sm"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn bg-primary hover:bg-primary text-white rounded-md">
          Edit
        </button>
      </div>
    </div>
  );
}
