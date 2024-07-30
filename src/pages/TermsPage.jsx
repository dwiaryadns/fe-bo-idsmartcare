import { TopBar } from "../components/TopBar";
import { termsList } from "../dummy/terms";

export const TermsPage = () => {
  return (
    <div>
      <TopBar title={"Syarat & Ketentuan"} subtitle={"Terms & Condition"} />
      <div className="text-justify md:px-32 px-10 pt-24">
        <p className="font-bold">
          Syarat dan Ketentuan ini (Syarat dan Ketentuan) mengatur akses Anda
          sebagai pengguna (Pengguna) dalam penggunaan website, aplikasi web dan
          semua layanan teknologi dalam bentuk lain terbatas kepada
          layanan-layanan yang disediakan oleh PT. Digital Nusantara Sinergi
          (idSmartCare)
        </p>
        <p className="italic mb-3 font-medium">
          This Privacy Policy explains our practices, including your choices,
          regarding the collection, use and disclosure of certain information,
          including your personal information in connection with idSmartCare
          services.
        </p>
        <p className="font-bold">
          Dengan menggunakan Layanan idSmartCare, Pengguna setuju bahwa Pengguna
          telah membaca, memahami, mengetahui, menerima, dan menyetujui seluruh
          informasi, syarat-syarat, dan ketentuan-ketentuan penggunaan Layanan
          yang terdapat dalam Syarat dan Ketentuan ini termasuk kepada setiap
          perubahan terhadap Syarat dan Ketentuan, yang mana akan diinformasikan
          oleh idSmartCare kepada Pengguna dari waktu ke waktu. Syarat dan
          Ketentuan ini akan berlaku sebagai suatu perikatan antara Pengguna
          dengan idSmartCare terkait tata cara dan penggunaan Layanan.
        </p>
        <p className="italic mb-3 font-medium">
          By using the idSmartCare service, the user agrees that the user has
          read, understanding, knowing, accepting, and approved all information,
          terms and conditions for the use of services contained in these terms
          and conditions including any changes to the terms and conditions,
          which which will be informed by idSmartCare to users from time to
          time. These terms and conditions will apply as an engagement between
          users and idSmartCare related to the procedures and use of services.
        </p>

        <ol className="list-decimal font-bold">
          {termsList.map((term, index) => (
            <li key={index}>
              <div className="my-3">
                <h4 className="font-bold">{term.title}</h4>
                <p className="italic mb-3 font-medium">{term.subtitle}</p>
                <p className="font-semibold">{term.content_id}</p>
                <p className="italic font-medium">{term.content_en}</p>
                {term.list && term.list.length > 0 && (
                  <ul className="list-[lower-alpha] ml-5">
                    {term.list.map((item, idx) => (
                      <li key={idx}>
                        <p className="font-semibold">{item.content_id}</p>
                        <p className="italic font-medium">{item.content_en}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
