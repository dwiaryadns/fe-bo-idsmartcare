import { useState, useEffect } from "react";
import axios from "axios";

const Select = ({ formValues, onSelectChange, errors }) => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [desa, setDesa] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        setProvinsi(response.data.provinsi);
      })
      .catch((error) => {
        setError("Failed to fetch provinces" + error);
      });
  }, []);

  useEffect(() => {
    if (formValues.provinsi) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${formValues.provinsi}`
        )
        .then((response) => {
          setKabupaten(response.data.kota_kabupaten);
          setKecamatan([]);
          setDesa([]);
          onSelectChange("kabupaten", formValues.kabupaten || "");
          onSelectChange("kecamatan", formValues.kecamatan || "");
          onSelectChange("desa", formValues.desa || "");
        })
        .catch((error) => {
          setError("Failed to fetch kabupaten" + error);
        });
    }
  }, [formValues.provinsi]);

  useEffect(() => {
    if (formValues.kabupaten) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${formValues.kabupaten}`
        )
        .then((response) => {
          setKecamatan(response.data.kecamatan);
          setDesa([]);
          onSelectChange("kecamatan", formValues.kecamatan || "");
          onSelectChange("desa", formValues.desa || "");
        })
        .catch((error) => {
          setError("Failed to fetch kecamatan" + error);
        });
    }
  }, [formValues.kabupaten]);

  useEffect(() => {
    if (formValues.kecamatan) {
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${formValues.kecamatan}`
        )
        .then((response) => {
          setDesa(response.data.kelurahan);
          onSelectChange("desa", formValues.desa || "");
        })
        .catch((error) => {
          setError("Failed to fetch desa" + error);
        });
    }
  }, [formValues.kecamatan]);

  return (
    <div>
      {errors.provinsi && <p>{errors.provinsi}</p>}
      <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              Province <span className="text-red-800">*</span>
            </span>
          </div>
          <select
            className="select select-bordered rounded-md"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("provinsi", e.target.value, selectedOption.text);
            }}
            name="provinsi"
            value={formValues.provinsi}
          >
            <option value="">Select Province</option>
            {provinsi.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              City <span className="text-red-800">*</span>
            </span>
          </div>
          <select
            className="select select-bordered rounded-md"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("kabupaten", e.target.value, selectedOption.text);
            }}
            name="kabupaten"
            value={formValues.kabupaten}
            disabled={!formValues.provinsi}
          >
            <option value="">Select City</option>
            {kabupaten.map((kab) => (
              <option key={kab.id} value={kab.id}>
                {kab.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              SubDistrict <span className="text-red-800">*</span>
            </span>
          </div>
          <select
            className="select select-bordered rounded-md"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("kecamatan", e.target.value, selectedOption.text);
            }}
            name="kecamatan"
            value={formValues.kecamatan}
            disabled={!formValues.kabupaten}
          >
            <option value="">Select SubDistrict</option>
            {kecamatan.map((kec) => (
              <option key={kec.id} value={kec.id}>
                {kec.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              Village <span className="text-red-800">*</span>
            </span>
          </div>
          <select
            className="select select-bordered rounded-md"
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("desa", e.target.value, selectedOption.text);
            }}
            name="desa"
            value={formValues.desa}
            disabled={!formValues.kecamatan}
          >
            <option value="">Select Village</option>
            {desa.map((des) => (
              <option key={des.id} value={des.id}>
                {des.nama}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Select;
