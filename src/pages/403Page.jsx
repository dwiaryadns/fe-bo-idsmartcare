import { useNavigate } from "react-router-dom";
import img403 from "../assets/403.png";
import text403 from "../assets/text-403.png";

export default function NoAccessPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-white">
      <div className="hero min-h-screen flex justify-center items-center">
        <div className="hero-content flex-col lg:flex-row items-center">
          <img
            src={img403}
            className="max-w-sm md:block hidden rounded-lg mb-8 lg:mb-0 lg:mr-8 float"
            alt="404"
          />
          <div className="text-center">
            <img src={text403} />
            <p className="text-[40px] font-bold mt-4 mb-2">
              Anda tidak Memiliki Akses
            </p>
            <p className="text-primary mb-6">
              Maaf, halaman yang Anda tuju tidak ditemukan (error 404)
            </p>
            <button
              className="btn bg-primary hover:bg-primary text-white rounded-md btn-block"
              onClick={handleGoBack}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
