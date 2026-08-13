import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface PernyataanBelumMenikahCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function PernyataanBelumMenikahCanvas({ formData, signatureData }: PernyataanBelumMenikahCanvasProps) {
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

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none px-[20mm] py-[10mm] text-black text-[11pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5] flex flex-col"
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <h2 className="text-center font-bold text-lg pt-8 mb-8 tracking-wide cv-section break-inside-avoid">
          SURAT PERNYATAAN BELUM MENIKAH
        </h2>

        {/* Intro */}
        <div className="mb-4 cv-section break-inside-avoid">
          Yang bertanda tangan di bawah ini:
        </div>

        {/* Biodata */}
        <div className="mb-6 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Nama Lengkap</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Tempat, Tanggal Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahir}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelamin || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Pekerjaan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.pekerjaan || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
        </div>

        {/* Body Paragraphs */}
        <div className="text-justify mb-6 cv-section break-inside-avoid">
          Dengan ini menyatakan bahwa hingga surat pernyataan ini dikeluarkan saya masih benar-benar lajang atau belum pernah menikah dengan siapapun baik secara Hukum Adat, Hukum Agama, maupun Hukum Negara.
        </div>

        <div className="text-justify mb-4 cv-section break-inside-avoid">
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dengan penuh kesadaran, tanpa paksaan dan tekanan dari pihak manapun. Apabila dikemudian hari terdapat sesuatu yang tidak sesuai dengan isi pernyataan ini, maka saya bersedia mendapatkan sanksi sesuai hukum yang berlaku.
        </div>

        {/* Spacer for signature */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature Area */}
        <div className="flex justify-end pt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-4">{tempatTanggalSurat}</p>
            <p className="mb-4">Yang Menyatakan,</p>
            
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
            
            <p className="mt-2">( {formData.nama || "...................................."} )</p>
          </div>
        </div>

      </div>
    </div>
  );
}
