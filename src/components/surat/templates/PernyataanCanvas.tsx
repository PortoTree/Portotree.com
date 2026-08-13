import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface PernyataanCanvasProps {
  formData: any;
  signatureData: string | null;
  pernyataanList: any[];
}

export function PernyataanCanvas({ formData, signatureData, pernyataanList }: PernyataanCanvasProps) {
  useSuratPagination([formData, signatureData, pernyataanList]);

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

  const validPernyataanList = pernyataanList.filter(p => p.name?.trim() !== '');

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none px-[20mm] py-[10mm] text-black text-[11pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5] flex flex-col"
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <h2 className="text-center font-bold text-lg pt-8 mb-8 tracking-wide cv-section break-inside-avoid">
          SURAT PERNYATAAN
        </h2>

        {/* Intro */}
        <div className="mb-2 cv-section break-inside-avoid">
          Saya yang bertanda tangan di bawah ini :
        </div>

        {/* Biodata */}
        <div className="ml-1 mb-6 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Tempat/ Tanggal Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahir}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelamin || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Status Perkawinan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.statusPerkawinan || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
        </div>

        {/* Body Intro */}
        <div className="text-justify mb-2 cv-section break-inside-avoid">
          Dengan ini menyatakan dengan penuh kesadaran dan tanpa paksaan dari pihak siapapun bahwa saya:
        </div>

        {/* List Pernyataan */}
        <div className="mb-6 cv-section break-inside-avoid">
          {validPernyataanList.length > 0 ? (
            <ol className="list-decimal pl-5">
              {validPernyataanList.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ol>
          ) : (
            <ol className="list-decimal pl-5">
              <li></li>
            </ol>
          )}
        </div>

        {/* Closing */}
        <div className="indent-12 text-justify mb-4 cv-section break-inside-avoid">
          Demikian surat pernyataan ini saya buat dalam keadaan sadar, guna melengkapi syarat khusus/tambahan yang dipersyaratkan pada {formData.tujuanPernyataan || "..................................................."}. Apabila dikemudian hari saya mengingkari pernyataan yang telah saya buat ini, maka saya bersedia menerima sanksi apapun yang akan dijatuhkan terhadap saya.
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
