import { TopBar } from "../components/TopBar";
import { privacyList } from "../dummy/privacy";

export const PrivacyPage = () => {
  return (
    <div>
      <TopBar title={"Kebijakan Privasi"} subtitle={"Privacy Policy"} />
      <div className="text-justify md:px-32 px-10 pt-24">
        <p className="font-bold">
          Kebijakan Privasi ini menjelaskan praktik kami, termasuk pilihan Anda,
          terkait pengumpulan, penggunaan, dan pengungkapan informasi tertentu,
          termasuk informasi pribadi Anda sehubungan dengan layanan idSmartCare.
        </p>
        <p className="italic mb-3 font-medium">
          This Privacy Policy explains our practices, including your choices,
          regarding the collection, use and disclosure of certain information,
          including your personal information in connection with idSmartCare
          services.
        </p>

        <ol className="list-decimal font-bold">
          {privacyList.map((priv, index) => (
            <li key={index}>
              <div className="my-3">
                <h4 className="font-bold">{priv.title}</h4>
                <p className="italic mb-3 font-medium">{priv.subtitle}</p>
                <p className="font-semibold">{priv.content_id}</p>
                <p className="italic font-medium">{priv.content_en}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
