import { useRef } from "react";

export const ModalDetail = ({ poId, data, total }) => {
  const modalRef = useRef();
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <div>
      <dialog id={poId} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-5xl px-10">
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Produk</th>
                    <th>Kuantitas</th>
                    <th>Catatan</th>
                    <th>Harga</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((detail, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{detail.barang.nama_barang}</td>
                      <td>{detail.jumlah}</td>
                      <td>{detail.notes}</td>
                      <td>{formatRupiah(detail.harga_satuan)}</td>
                      <td>{formatRupiah(detail.total_harga)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-right italic font-bold">
                      Total
                    </td>
                    <td> {formatRupiah(total)} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
