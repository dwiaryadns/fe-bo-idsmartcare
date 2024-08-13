import { TopBar } from "../components/TopBar";

export default function InvoicePage() {
  return (
    <div>
      <TopBar title={""} subtitle={" "} />
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
      </div>
    </div>
  );
}
