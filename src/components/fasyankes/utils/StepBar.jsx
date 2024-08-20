import React from "react";

export default function StepBar({ step }) {
  return (
    <div>
      <ul className="max-w-7xl timeline mb-10 flex justify-center">
        <li className="w-1/3">
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${step >= 1 ? "text-primary" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-xs md:text-lg">
            Info Fasyankes
          </div>
          <hr className={`${step >= 2 ? "bg-primary" : ""}`} />
        </li>
        <li className="w-1/3">
          <hr className={`${step >= 2 ? "bg-primary" : ""}`} />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${step >= 2 ? "text-primary" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-xs md:text-lg">
            Dokumen Legal
          </div>
          <hr className={`${step >= 3 ? "bg-primary" : ""}`} />
        </li>
        <li className="w-1/3">
          <hr className={`${step >= 3 ? "bg-primary" : ""}`} />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${step >= 3 ? "text-primary" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-xs md:text-lg">
            Pembayaran
          </div>
        </li>
      </ul>
    </div>
  );
}
