import { useRef, useState } from "react";

export const ModalDetailWarehouse = ({ warehouse, fasyankes }) => {
  const modalRef = useRef();

  return (
    <div>
      <dialog id={warehouse} className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-2xl px-10 text-lg">
          <div className="flex justify-between bg-primary text-white rounded-md p-4 items-center text-md border-b-2">
            {warehouse}
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Fasyankes</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {fasyankes.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                  </tr>
                ))}
                {fasyankes.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Belum ada Fasyankes terdaftar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
