import { TopBar } from "../components/TopBar";

export default function InvoicePage() {
  return (
    <div>
      <TopBar title={"Invoice"} subtitle={"Faktur"} />
      <div className="text-justify md:px-32 px-10 pt-24"></div>
    </div>
  );
}
