import { ToastAlert } from "../../components/Alert";
import axiosInstance from "../../dummy/axiosInstance";
import { useState } from "react";
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import Input from "../../components/warehouse/utils/Input";

export const CreateWarehousePage = ({ handlePrevious, setStep }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = formValues;
    await axiosInstance
      .post("/warehouses/store", payload)
      .then(function (response) {
        if (response.data.status === true) {
          ToastAlert("success", response.data.message);
          setStep(0);
          setLoading(false);
        } else {
          const apiErrors = response.data.errors;
          setErrors(apiErrors);
          setLoading(false);
        }
      })
      .catch(function (error) {
        const apiErrors = error.response.data.errors;
        setErrors(apiErrors);
        setLoading(false);
      });
  };
  return (
    <div className=" bg-white p-3 rounded-md shadow-lg">
      <Button
        w={"xs"}
        bg={"info"}
        icon={faChevronLeft}
        showIcon={true}
        onClick={handlePrevious}
      >
        Kembali
      </Button>
      <Input
        label="Warehouse Name"
        placeholder="Warehouse Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        errors={errors.name}
      />
      <Input
        label="Warehouse Address"
        placeholder="Warehouse Address"
        name="address"
        value={formValues.address}
        onChange={handleChange}
        errors={errors.address}
      />
      <Input
        label="PIC Name"
        placeholder="PIC Name"
        name="pic"
        value={formValues.pic}
        onChange={handleChange}
        errors={errors.pic}
      />
      <Input
        label="PIC Phone Number"
        placeholder="PIC Phone Number"
        name="contact"
        value={formValues.contact}
        onChange={handleChange}
        errors={errors.contact}
      />

      <div className="">
        <Button
          loading={loading}
          onClick={handleSubmit}
          showIcon={true}
          icon={faSave}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
