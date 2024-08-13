import { TopBar } from "../components/TopBar";
import { syaratPembelianList } from "../dummy/syarat-pembelian";

export default function SyaratPemblianPage() {
  return (
    <div>
      <TopBar
        title={"Kebijakan Pembayaran & Biaya"}
        subtitle={"Payments & Fees Policies"}
      />
      <div className="text-justify md:px-32 px-10 pt-24">
        <p className="font-bold">
          Kebijakan pembayaran dan biaya adalah panduan atau aturan yang
          ditetapkan untuk mengatur proses pembayaran yang nantinya akan
          dilakukan. Kebijakan ini juga serta merta menetapkan biaya yang
          terkait dengan layanan atau produk yang ditawarkan oleh idSmartCare.
        </p>
        <p className="italic mb-3 font-medium">
          Payment and fee policies are guidelines or rules established to
          regulate the payment process that will later be carried out. This
          policy also directly determines the costs associated with the services
          or products offered by idSmartCare.
        </p>
        <p className="font-bold">
          Kebijakan pembayaran dan biaya sangat penting dalam memastikan bahwa
          proses pembayaran dan biaya berjalan lancar dan terorganisir. Selain
          itu, kebijakan ini juga bertujuan untuk melindungi kepentingan dan
          memastikan hubungan yang jelas antara Anda dan idSmartCare dalam hal
          pembayaran dan biaya yang terkait dengan layanan atau produk yang
          digunakan.
        </p>
        <p className="italic mb-3 font-medium">
          Payment and fee policies are very important in ensuring that the
          payment and fee process runs smoothly and is organized. In addition,
          this policy also aims to protect the interests and ensure a clear
          relationship between you and idSmartCare in terms of payments and
          costs related to the services or products used.
        </p>

        <ol className="list-decimal font-bold">
          {syaratPembelianList.map((syarat, index) => (
            <li key={index}>
              <div className="my-3">
                <h4 className="font-bold">{syarat.title}</h4>
                <p className="italic mb-3 font-medium">{syarat.subtitle}</p>
                <p className="font-semibold">{syarat.content_id}</p>
                <p className="italic font-medium">{syarat.content_en}</p>
                {syarat.add_id && (
                  <p className="font-semibold mt-2">{syarat.add_id}</p>
                )}{" "}
                {syarat.add_en && (
                  <p className="italic font-medium">{syarat.add_en}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
