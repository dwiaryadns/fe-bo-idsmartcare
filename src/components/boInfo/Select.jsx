import { useState, useEffect } from "react";
import axios from "axios";

const Select = ({ name, value, onChange }) => {
  const [provinsi, setProvinsi] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [desa, setDesa] = useState([]);
  const [selectedDesa, setSelectedDesa] = useState("");
  const [kodePos, setKodePos] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        setProvinsi(response.data.provinsi);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch provinces" + error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedProvinsi) {
      setLoading(true);
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvinsi}`
        )
        .then((response) => {
          setKabupaten(response.data.kota_kabupaten);
          setKecamatan([]);
          setDesa([]);
          setKodePos("");
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch kabupaten" + error);
          setLoading(false);
        });
    }
  }, [selectedProvinsi]);

  useEffect(() => {
    if (selectedKabupaten) {
      setLoading(true);
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${selectedKabupaten}`
        )
        .then((response) => {
          setKecamatan(response.data.kecamatan);
          setDesa([]);
          setKodePos("");
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch kecamatan" + error);
          setLoading(false);
        });
    }
  }, [selectedKabupaten]);

  useEffect(() => {
    if (selectedKecamatan) {
      setLoading(true);
      axios
        .get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${selectedKecamatan}`
        )
        .then((response) => {
          setDesa(response.data.kelurahan);
          setKodePos("");
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch desa" + error);
          setLoading(false);
        });
    }
  }, [selectedKecamatan]);

  useEffect(() => {
    if (selectedDesa) {
      const desaData = desa.find((d) => d.id === parseInt(selectedDesa));
      if (desaData) {
        setKodePos(desaData.kode_pos || "");
      } else {
        setKodePos("");
      }
    }
  }, [selectedDesa, desa]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
              setSelectedProvinsi(e.target.value);
              onChange(e);
            }}
            name="provinsi"
            value={selectedProvinsi}
          >
            <option value="">Pilih Provinsi</option>
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
              setSelectedKabupaten(e.target.value);
              onChange(e);
            }}
            name="kabupaten"
            value={selectedKabupaten}
            disabled={!selectedProvinsi}
          >
            <option value="">Pilih Kabupaten/Kota</option>
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
              Sub-District <span className="text-red-800">*</span>
            </span>
          </div>
          <select
            className="select select-bordered rounded-md"
            onChange={(e) => {
              setSelectedKecamatan(e.target.value);
              onChange(e);
            }}
            name="kecamatan"
            value={selectedKecamatan}
            disabled={!selectedKabupaten}
          >
            <option value="">Pilih Kecamatan</option>
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
              setSelectedDesa(e.target.value);
              onChange(e);
            }}
            name="desa"
            value={selectedDesa}
            disabled={!selectedKecamatan}
          >
            <option value="">Pilih Desa/Kelurahan</option>
            {desa.map((des) => (
              <option key={des.id} value={des.id}>
                {des.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      <span className="form-control w-full">
        <div className="label">
          <span className="label-text font-bold text-base">
            Postal Code <span className="text-red-800">*</span>
          </span>
        </div>
        <input
          type="text"
          placeholder="Postal Code"
          name="kodePos"
          className="input input-bordered w-full rounded-md"
        />
      </span>
    </div>
  );
};

export default Select;
