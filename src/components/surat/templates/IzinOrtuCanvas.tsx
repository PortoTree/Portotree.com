import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface IzinOrtuCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function IzinOrtuCanvas({ formData, signatureData }: IzinOrtuCanvasProps) {
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
  
  const formattedTglLahirOrtu = formatDate(formData.tanggalLahirOrtu);
  const tempatTglLahirOrtu = [formData.tempatLahirOrtu, formattedTglLahirOrtu].filter(Boolean).join(", ");
  
  const formattedTglLahirAnak = formatDate(formData.tanggalLahirAnak);
  const tempatTglLahirAnak = [formData.tempatLahirAnak, formattedTglLahirAnak].filter(Boolean).join(", ");

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none px-[20mm] py-[10mm] text-black text-[11pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5] flex flex-col"
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <h2 className="text-center font-bold text-lg pt-8 mb-10 tracking-wide underline cv-section break-inside-avoid">
          SURAT IZIN ORANG TUA
        </h2>

        {/* Intro */}
        <div className="mb-2 cv-section break-inside-avoid">
          Saya yang bertanda tangan di bawah ini:
        </div>

        {/* Biodata Ortu */}
        <div className="pl-8 mb-4 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.namaOrtu || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Tempat, Tgl Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahirOrtu}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Pekerjaan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.pekerjaanOrtu || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamatOrtu || ""}</span>
          </div>
        </div>

        {/* Mid Intro */}
        <div className="mb-2 cv-section break-inside-avoid">
          Selaku orang tua/wali dari anak saya:
        </div>

        {/* Biodata Anak */}
        <div className="pl-8 mb-4 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.namaAnak || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Tempat, Tgl Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahirAnak}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelaminAnak || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamatAnak || ""}</span>
          </div>
        </div>

        {/* Body Paragraphs */}
        <div className="pl-8 mb-2 cv-section break-inside-avoid text-justify indent-8">
          Dengan ini <strong>{formData.statusIzin || "......"}</strong> kepada anak saya untuk {formData.tujuanIzin || "......"}
        </div>

        <div className="pl-8 mb-4 cv-section break-inside-avoid text-justify indent-8">
          Demikian surat izin ini saya buat dengan sebenar-benarnya untuk dipergunakan seperlunya.
        </div>

        {/* Spacer for signature */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature Area */}
        <div className="flex justify-end pt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-4">{tempatTanggalSurat}</p>
            <p className="mb-4">Orang Tua/Wali</p>
            
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
            
            <p className="mt-2">( {formData.namaOrtu || "...................................."} )</p>
          </div>
        </div>

      </div>
    </div>
  );
}
