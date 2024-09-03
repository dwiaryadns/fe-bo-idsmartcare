import { useState } from "react";
import Input from "./utils/Input";
import { useNavigate } from "react-router";
import axiosInstance from "../../dummy/axiosInstance";
import { ToastAlert } from "../Alert";

export const FormCreateWarehouse = () => {
  const [formValues, setFormValues] = useState({
    warehouseName: "",
    warehouseAddress: "",
    picName: "",
    picNumber: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: formValues.warehouseName,
      address: formValues.warehouseAddress,
      pic: formValues.picName,
      contact: formValues.picNumber,
    };
    await axiosInstance
      .post("/warehouses/store", payload)
      .then(function (response) {
        if (response.data.status === true) {
          navigate("/warehouse");
          ToastAlert("success", response.data.message);
        } else {
          const apiErrors = response.data.errors;
          const newApiErrors = {
            warehouseName: apiErrors.name ? apiErrors.name : "",
            warehouseAddress: apiErrors.address ? apiErrors.address : "",
            picName: apiErrors.pic ? apiErrors.pic : "",
            picNumber: apiErrors.contact ? apiErrors.contact : "",
          };
          setErrors(newApiErrors);
        }
      })
      .catch(function (error) {
        console.log(error);
        const apiErrors = error.response.data.errors;
        const newApiErrors = {
          warehouseName: apiErrors.name ? apiErrors.name : "",
          warehouseAddress: apiErrors.address ? apiErrors.address : "",
          picName: apiErrors.pic ? apiErrors.pic : "",
          picNumber: apiErrors.contact ? apiErrors.contact : "",
        };
        setErrors(newApiErrors);
      });
  };
  return (
    <div>
      <Input
        label="Warehouse Name"
        placeholder="Warehouse Name"
        name="warehouseName"
        value={formValues.warehouseName}
        onChange={handleChange}
        errors={errors.warehouseName}
      />
      <Input
        label="Warehouse Address"
        placeholder="Warehouse Address"
        name="warehouseAddress"
        value={formValues.warehouseAddress}
        onChange={handleChange}
        errors={errors.warehouseAddress}
      />
      <Input
        label="PIC Name"
        placeholder="PIC Name"
        name="picName"
        value={formValues.picName}
        onChange={handleChange}
        errors={errors.picName}
      />
      <Input
        label="PIC Phone Number"
        placeholder="PIC Phone Number"
        name="picNumber"
        value={formValues.picNumber}
        onChange={handleChange}
        errors={errors.picNumber}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="btn bg-primary text-white p-5 items-center content-center  rounded-md btn-sm hover:bg-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
