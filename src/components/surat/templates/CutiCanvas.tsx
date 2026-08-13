import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface CutiCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function CutiCanvas({ formData, signatureData }: CutiCanvasProps) {
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
  
  const formattedTglMulai = formatDate(formData.tanggalMulai);
  const formattedTglSelesai = formatDate(formData.tanggalSelesai);

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none px-[20mm] py-[10mm] text-black text-[11pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5] flex flex-col"
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <h2 className="text-center font-bold text-lg pt-8 mb-8 tracking-wide cv-section break-inside-avoid">
          SURAT PERMOHONAN IZIN CUTI KERJA
        </h2>

        {/* Recipient */}
        <div className="mb-6 cv-section break-inside-avoid">
          <p>Kepada Yth,</p>
          <p>Di Tempat</p>
        </div>

        {/* Intro */}
        <div className="mb-6 cv-section break-inside-avoid">
          <p className="mb-4">Dengan hormat,</p>
          <p>Yang bertanda tangan di bawah ini:</p>
        </div>

        {/* Biodata */}
        <div className="mb-6 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          {formData.nip && (
            <div className="flex">
              <span className="w-[4.5cm] shrink-0">NIP / ID</span>
              <span className="mr-2">:</span>
              <span className="flex-1">{formData.nip}</span>
            </div>
          )}
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Jabatan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jabatan || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Divisi/Departemen</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.divisi || ""}</span>
          </div>
        </div>

        {/* Body Intro */}
        <div className="mb-4 cv-section break-inside-avoid">
          Dengan ini mengajukan permohonan izin cuti kerja dengan rincian sebagai berikut:
        </div>

        {/* Rincian Cuti */}
        <div className="mb-6 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Jenis Cuti</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisCuti || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Tanggal Mulai</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formattedTglMulai}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Tanggal Selesai</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formattedTglSelesai}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Durasi</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.durasiCuti ? `${formData.durasiCuti} hari kerja` : ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Alasan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alasanCuti || ""}</span>
          </div>
        </div>

        <div className="text-justify mb-4 cv-section break-inside-avoid">
          Demikian surat permohonan ini saya buat dengan sebenarnya. Atas perhatian dan persetujuannya, saya ucapkan terima kasih.
        </div>

        {/* Spacer for signature */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature Area */}
        <div className="flex justify-end pt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-4">{tempatTanggalSurat}</p>
            <p className="mb-4">Hormat saya,</p>
            
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
