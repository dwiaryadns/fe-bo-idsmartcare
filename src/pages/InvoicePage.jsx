import { TopBar } from "../components/TopBar";

export default function InvoicePage() {
  const InfoBill = (info, instansi, alamat, email) => {
    return (
      <div>
        <div className="text-primary font-bold">{info}</div>
        <div className="font-bold">{instansi}</div>
        <div>{alamat} </div>
        <div>{email} </div>
      </div>
    );
  };
  return (
    <div>
      <TopBar title={"Invoice"} subtitle={"Faktur"} />
      <div className="text-justify md:px-32 px-10 pt-24">
        <div className="flex justify-end">
          <table>
            <tbody>
              <tr>
                <td className="font-bold">No. Invoice</td>
                <td className="font-bold">:</td>
                <td>[ INV_NUMBER ]</td>
              </tr>
              <tr>
                <td className="font-bold">Tanggal Tagihan</td>
                <td className="font-bold">:</td>
                <td>[ TGL_TAGIHAN ]</td>
              </tr>
              <tr>
                <td className="font-bold">Tanggal Jatuh Tempo</td>
                <td className="font-bold">:</td>
                <td>[ TGL_JATUH_TEMPO ]</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {InfoBill(
            "Dari :",
            "PT.Digital Nusantara Sinergi",
            "Jl. RP. Soeroso No.25 9, RT.9/RW.5,Cikini, Kec. Menteng, Kota Jakarta Pusat, DKI Jakarta 10330 +62 852 18982730",
            "xxxx@gmail.com"
          )}

          {InfoBill(
            "Ke :",
            "PT.Digital Nusantara Sinergi",
            "Jl. RP. Soeroso No.25 9, RT.9/RW.5,Cikini, Kec. Menteng, Kota Jakarta Pusat, DKI Jakarta 10330 +62 852 18982730",
            "xxxx@gmail.com"
          )}

          <div className="flex flex-col text-end">
            <div>Pembayaran : </div>
            <div>[METODE PEMBAYARAN]</div>
          </div>
        </div>
        <div className="mt-9 mb-10">
          <div className="font-bold">Total Amount Due : Rp 200.000</div>
          <div className="text-xs">ORDER ID : 1029301923</div>
          <div className="mt-5">
            <table className="table">
              <thead className="bg-primary text-white rounded-md">
                <tr>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Apotek A - Plus</td>
                  <td>Rp 299.000</td>
                </tr>
                <tr>
                  <td className="text-end font-bold italic">Sub Total</td>
                  <td>Rp 149.000</td>
                </tr>
                <tr>
                  <td className="text-end font-bold italic">Tax</td>
                  <td>Rp 10.000</td>
                </tr>
                <tr>
                  <td className="text-end font-bold italic">Service Charge</td>
                  <td>Rp 10.000</td>
                </tr>
                <tr>
                  <td className="text-end font-bold italic">Total</td>
                  <td className="text-primary font-bold">Rp 500.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
