import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface IzinKuliahCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function IzinKuliahCanvas({ formData, signatureData }: IzinKuliahCanvasProps) {
  useSuratPagination([formData, signatureData]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const formattedTglSurat = formatDate(formData.tanggalSurat);
  const tempatTanggalSurat = [formData.tempatSurat, formattedTglSurat].filter(Boolean).join(", ");
  
  const formattedTglIzin = formatDate(formData.tanggalIzin);
  const formattedTglSelesaiIzin = formatDate(formData.tanggalSelesaiIzin);

  let tanggalDisplay = formattedTglIzin || ".................................";
  if (formData.tanggalSelesaiIzin && formData.tanggalSelesaiIzin !== formData.tanggalIzin) {
    tanggalDisplay = `${formattedTglIzin} s.d. ${formattedTglSelesaiIzin}`;
  }

  const dosenTitle = formData.genderDosen === "Laki-laki" ? "Bapak" : (formData.genderDosen === "Perempuan" ? "Ibu" : "Bapak/Ibu");
  const namaDosenStr = formData.namaDosen ? `${dosenTitle} ${formData.namaDosen}` : dosenTitle;

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none px-[20mm] py-[10mm] text-black text-[11pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5] flex flex-col"
    >
      <div className="flex flex-col flex-1">
        {/* Header Right */}
        <div className="flex justify-end mb-4 cv-section break-inside-avoid">
          <div>{tempatTanggalSurat}</div>
        </div>

        {/* Header Left */}
        <div className="mb-6 cv-section break-inside-avoid">
          Hal: Permohonan Izin Tidak Masuk Kuliah
        </div>

        {/* Recipient */}
        <div className="mb-6 cv-section break-inside-avoid">
          <p>Kepada Yth.</p>
          <p>{namaDosenStr}</p>
          <p>di tempat</p>
        </div>

        {/* Salutation */}
        <div className="mb-2 cv-section break-inside-avoid">
          Dengan hormat,
        </div>
        
        {/* Intro */}
        <div className="mb-2 cv-section break-inside-avoid">
          Saya yang bertanda tangan di bawah ini:
        </div>

        {/* Biodata */}
        <div className="ml-8 mb-6 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[3.5cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[3.5cm] shrink-0">NIM</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nim || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[3.5cm] shrink-0">Prodi/ Fakultas</span>
            <span className="mr-2">:</span>
            <span className="flex-1">
              {[formData.prodi, formData.fakultas].filter(Boolean).join(" / ")}
            </span>
          </div>
          <div className="flex">
            <span className="w-[3.5cm] shrink-0">Universitas</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.universitas || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[3.5cm] shrink-0">No. Hp</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.telepon || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[3.5cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
        </div>

        {/* Body Paragraphs */}
        <div className="text-justify mb-4 cv-section break-inside-avoid">
          Dengan ini mengajukan izin untuk tidak mengikuti mata kuliah {formData.mataKuliah || "..................................................."} pada tanggal {tanggalDisplay} untuk {formData.alasanIzin || "..........................................................................."}.
        </div>

        <div className="text-justify mb-6 cv-section break-inside-avoid">
          Jika selama itu ada kegiatan perkuliahan, seperti kuis dan tugas, saya mohon izin untuk mengikuti kuis dan mengumpulkan tugas susulan kepada {namaDosenStr}.
        </div>

        <div className="text-justify mb-4 cv-section break-inside-avoid">
          Demikian surat permohonan izin ini saya sampaikan dengan sebenar-benarnya. Atas izin yang diberikan, saya ucapkan terimakasih.
        </div>

        {/* Spacer for signature */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature Area */}
        <div className="flex justify-end pt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-4">Hormat Saya,</p>
            
            {signatureData ? (
              <div className="h-24 w-40 relative my-2">
                <Image
                  src={signatureData}
                  alt="Tanda Tangan"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-24" />
            )}
            
            <p className="mt-2">( {formData.nama || ""} )</p>
            <p>NIM. {formData.nim || ""}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
