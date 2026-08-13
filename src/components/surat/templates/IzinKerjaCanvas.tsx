import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface IzinKerjaCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function IzinKerjaCanvas({ formData, signatureData }: IzinKerjaCanvasProps) {
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

  const formattedTglMulai = formatDate(formData.tanggalMulaiIzin);
  const formattedTglSelesai = formatDate(formData.tanggalSelesaiIzin);
  let tanggalIzinText = formData.tanggalIzin || "";
  if (formattedTglMulai && formattedTglSelesai) {
    if (formattedTglMulai === formattedTglSelesai) {
      tanggalIzinText = formattedTglMulai;
    } else {
      tanggalIzinText = `${formattedTglMulai} s.d. ${formattedTglSelesai}`;
    }
  } else if (formattedTglMulai) {
    tanggalIzinText = formattedTglMulai;
  } else if (formattedTglSelesai) {
    tanggalIzinText = formattedTglSelesai;
  }

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none p-[2.54cm] text-black text-[12pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5]"
    >
      <div className="flex flex-col h-full cv-section break-inside-avoid">
        {/* Date */}
        <div className="text-right mb-6">
          {tempatTanggalSurat}
        </div>

        {/* Perihal */}
        <div className="flex mb-6">
          <span className="w-[2.5cm]">Perihal</span>
          <span>: Permohonan izin tidak masuk kerja</span>
        </div>

        {/* Recipient */}
        <div className="mb-8">
          <p>Kepada Yth.</p>
          {formData.penerimaSurat && <p>{formData.penerimaSurat}</p>}
          <p>Di tempat</p>
        </div>

        {/* Salutation */}
        <div className="mb-4">
          Dengan Hormat,
        </div>

        {/* Body */}
        <div className="indent-8 text-justify mb-4">
          Saya yang bertanda tangan di bawah ini:
        </div>

        <div className="ml-8 mb-4 flex flex-col gap-1">
          <div className="flex">
            <span className="w-[3cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[3cm] shrink-0">Jabatan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jabatan || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[3cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
        </div>

        <div className="indent-8 text-justify mb-4">
          Dengan ini saya ingin memberitahukan bahwa pada tanggal {tanggalIzinText} saya tidak bisa masuk untuk bekerja seperti biasanya dikarenakan {formData.alasan || ""}. Sehubungan dengan hal tersebut, saya bermaksud untuk memohon izin untuk tidak masuk kerja pada tanggal tersebut.
        </div>

        <div className="indent-8 text-justify mb-12">
          Demikian surat izin saya sampaikan dengan sebenar-benarnya. Atas perhatiannya saya ucapkan terima kasih.
        </div>

        {/* Signature Area */}
        <div className="flex justify-end mt-4 break-inside-avoid cv-section">
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
