import { useNavigate } from "react-router-dom";
import img404 from "../assets/404.png";
import text404 from "../assets/text-404.png";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-300 to-white">
      <div className="hero min-h-screen flex justify-center items-center">
        <div className="hero-content flex-col lg:flex-row items-center">
          <img
            src={img404}
            className="max-w-sm md:block hidden rounded-lg mb-8 lg:mb-0 lg:mr-8 float"
            alt="404"
          />
          <div className="text-center">
            <img src={text404} />
            <p className="text-[40px] font-bold mt-4 mb-2">
              Halaman tidak ditemukan
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
};

export default NotFound;
