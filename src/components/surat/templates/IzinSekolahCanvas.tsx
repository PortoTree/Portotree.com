import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface IzinSekolahCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function IzinSekolahCanvas({ formData, signatureData }: IzinSekolahCanvasProps) {
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
          Hal: Permohonan Izin Tidak Masuk Sekolah
        </div>

        {/* Recipient */}
        <div className="mb-6 cv-section break-inside-avoid">
          <p>Kepada Yth,</p>
          <p>Bapak/Ibu Guru Wali Kelas</p>
        </div>

        {/* Intro */}
        <div className="mb-2 cv-section break-inside-avoid">
          <p>Dengan hormat,</p>
          <p>Yang bertanda tangan di bawah ini, selaku orang tua/wali murid dari:</p>
        </div>

        {/* Biodata Siswa */}
        <div className="ml-8 mb-6 flex flex-col gap-1 cv-section break-inside-avoid">
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Nama Siswa</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.namaSiswa || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Kelas/ Sekolah</span>
            <span className="mr-2">:</span>
            <span className="flex-1">
              {[formData.kelas, formData.sekolah].filter(Boolean).join(" / ")}
            </span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Nomor Induk Siswa</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nis || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4.5cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
        </div>

        {/* Body Paragraphs */}
        <div className="text-justify mb-6 cv-section break-inside-avoid">
          Memberitahukan bahwa anak saya tersebut di atas tidak dapat mengikuti pelajaran seperti biasa pada tanggal {tanggalDisplay} dikarenakan {formData.alasanIzin || "..........................................................................."}. Oleh karena itu, kami memohon pada Bapak/Ibu Wali Kelas agar memberikan izin dan memakluminya.
        </div>

        <div className="text-justify mb-4 cv-section break-inside-avoid">
          Demikian permohonan izin ini kami sampaikan. Atas perhatian dan perkenan Bapak/Ibu kami ucapkan terimakasih.
        </div>

        {/* Spacer for signature */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature Area */}
        <div className="flex justify-end pt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-1">Hormat Kami</p>
            <p className="mb-4">Orang Tua/Wali Murid</p>
            
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
