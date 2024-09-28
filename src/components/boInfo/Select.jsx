import { useState, useEffect } from "react";
import axios from "axios";

const Select = ({ formValues, onSelectChange, errors, isSupplier }) => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [desa, setDesa] = useState([]);
  const [error, setError] = useState("");
  console.log(error.provinsi);
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
          onSelectChange("kabupaten", "");
          onSelectChange("kecamatan", "");
          onSelectChange("desa", "");
        })
        .catch((error) => {
          setError("Failed to fetch kabupaten" + error);
        });
    } else {
      setKabupaten([]);
      setKecamatan([]);
      setDesa([]);
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
          onSelectChange("kecamatan", "");
          onSelectChange("desa", "");
        })
        .catch((error) => {
          setError("Failed to fetch kecamatan" + error);
        });
    } else {
      setKecamatan([]);
      setDesa([]);
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
          onSelectChange("desa", "");
        })
        .catch((error) => {
          setError("Failed to fetch desa" + error);
        });
    } else {
      setDesa([]);
    }
  }, [formValues.kecamatan]);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              {isSupplier ? "Provinsi" : "Province"}
              <span className="text-red-600">*</span>
            </span>
          </div>
          <select
            className={`select ${
              errors.provinsi ? "select-error" : ""
            } select-bordered ${isSupplier ? "select-primary" : ""} rounded-md`}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("provinsi", e.target.value, selectedOption.text);
            }}
            name="provinsi"
            value={formValues.provinsi}
          >
            <option value="" selected hidden>
              {isSupplier ? "Pilih Provinsi" : "Select Province"}
            </option>
            {provinsi.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nama}
              </option>
            ))}
          </select>
          {errors.provinsi && (
            <p className="text-xs text-error">{errors.provinsi}</p>
          )}
        </div>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              {isSupplier ? "Kota" : "City"}
              <span className="text-red-600">*</span>
            </span>
          </div>
          <select
            className={`select ${
              errors.kabupaten ? "select-error" : ""
            } select-bordered ${isSupplier ? "select-primary" : ""} rounded-md`}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("kabupaten", e.target.value, selectedOption.text);
            }}
            name="kabupaten"
            value={formValues.kabupaten}
            disabled={!formValues.provinsi}
          >
            <option value="" selected hidden>
              {" "}
              {isSupplier ? "Pilih Kota" : "Select City"}
            </option>
            {kabupaten.map((kab) => (
              <option key={kab.id} value={kab.id}>
                {kab.nama}
              </option>
            ))}
          </select>
          {errors.kabupaten && (
            <p className="text-xs text-error">{errors.kabupaten}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              {isSupplier ? "Kecamatan" : "Subdistrict"}
              <span className="text-red-600">*</span>
            </span>
          </div>
          <select
            className={`select ${
              errors.kecamatan ? "select-error" : ""
            } select-bordered ${isSupplier ? "select-primary" : ""} rounded-md`}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("kecamatan", e.target.value, selectedOption.text);
            }}
            name="kecamatan"
            value={formValues.kecamatan}
            disabled={!formValues.kabupaten}
          >
            <option value="" selected hidden>
              {" "}
              {isSupplier ? "Pilih Kecamatan" : "Select Subdistrict"}
            </option>
            {kecamatan.map((kec) => (
              <option key={kec.id} value={kec.id}>
                {kec.nama}
              </option>
            ))}
          </select>
          {errors.kecamatan && (
            <p className="text-xs text-error">{errors.kecamatan}</p>
          )}
        </div>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-base">
              {isSupplier ? "Kelurahan" : "Village"}

              <span className="text-red-600">*</span>
            </span>
          </div>
          <select
            className={`select ${
              errors.desa ? "select-error" : ""
            } select-bordered ${isSupplier ? "select-primary" : ""} rounded-md`}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              onSelectChange("desa", e.target.value, selectedOption.text);
            }}
            name="desa"
            value={formValues.desa}
            disabled={!formValues.kecamatan}
          >
            <option value="" selected hidden>
              {isSupplier ? "Pilih Kelurahan" : "Select Village"}
            </option>
            {desa.map((des) => (
              <option key={des.id} value={des.id}>
                {des.nama}
              </option>
            ))}
          </select>
          {errors.desa && <p className="text-xs text-error">{errors.desa}</p>}
        </div>
      </div>
    </div>
  );
};

export default Select;
