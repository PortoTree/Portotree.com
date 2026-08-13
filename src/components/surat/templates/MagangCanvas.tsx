import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface MagangCanvasProps {
  formData: any;
  signatureData: string | null;
  berkasList: any[];
}

export function MagangCanvas({ formData, signatureData, berkasList }: MagangCanvasProps) {
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
  
  const formattedTglLahir = formatDate(formData.tanggalLahir);
  const tempatTglLahir = [formData.tempatLahir, formattedTglLahir].filter(Boolean).join(", ");

  const validBerkasList = berkasList.filter(b => b.name?.trim() !== '');

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] flex flex-col shadow-md print:shadow-none px-[20mm] py-[10mm] text-black text-[11pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5]"
    >
      <div className="flex flex-col flex-1">
        {/* Date */}
        <div className="text-right mb-4 cv-section break-inside-avoid">
          {tempatTanggalSurat}
        </div>

        {/* Perihal */}
        <div className="flex mb-4 cv-section break-inside-avoid">
          <span className="w-[2.5cm]">Perihal</span>
          <span>: Permohonan Magang Kerja</span>
        </div>

        {/* Recipient */}
        <div className="mb-6 cv-section break-inside-avoid">
          <p>Kepada Yth.</p>
          {formData.penerimaSurat && <p>{formData.penerimaSurat}</p>}
          <p>Di tempat</p>
        </div>

        {/* Salutation */}
        <div className="mb-4 cv-section break-inside-avoid">
          Dengan Hormat,
        </div>

        {/* Body */}
        <div className="indent-8 text-justify mb-4 cv-section break-inside-avoid">
          Sehubungan untuk meningkatkan pengalaman dan kualifikasi dalam dunia kerja. Maka saya yang bertanda tangan di bawah ini:
        </div>

        <div className="ml-12 mb-4 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Tempat/Tgl. Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahir}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelamin || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Pendidikan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.pendidikan || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Telepon (HP)</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.telepon || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Email</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.email || ""}</span>
          </div>
        </div>

        <div className="indent-8 text-justify mb-4 cv-section break-inside-avoid">
          Dengan ini bermaksud mengajukan permohonan magang pada Instansi Bapak/Ibu pada posisi {formData.posisiMagang || "............................"} karena posisi tersebut cukup relevan dengan bidang minat saya saat ini.
        </div>

        <div className="indent-8 text-justify mb-2 cv-section break-inside-avoid">
          Sebagai bahan pertimbangan bersama surat ini saya lampirkan beberapa berkas pendukung, yaitu:
        </div>

        <div className="ml-12 mb-4 cv-section break-inside-avoid">
          {validBerkasList.length > 0 ? (
            <ol className="list-decimal pl-5">
              {validBerkasList.map((berkas, i) => (
                <li key={i}>{berkas.name}</li>
              ))}
            </ol>
          ) : (
            <ol className="list-decimal pl-5">
              <li>....................................................................</li>
            </ol>
          )}
        </div>

        <div className="indent-8 text-justify mb-4 cv-section break-inside-avoid">
          Demikian surat permohonan magang ini saya buat. Besar harapan saya agar permohonan magang saya dapat diterima. Atas perhatian Bapak/Ibu saya ucapkan terima kasih.
        </div>

        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature Area */}
        <div className="flex justify-end pt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-4">Hormat Saya</p>
            
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
            
            <p className="font-bold underline mt-2">( {formData.nama || "...................................."} )</p>
          </div>
        </div>
      </div>
    </div>
  );
}
