import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface KeteranganSakitCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function KeteranganSakitCanvas({ formData, signatureData }: KeteranganSakitCanvasProps) {
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

  const formattedTglLahir = formatDate(formData.tanggalLahir);
  const formattedTglSurat = formatDate(formData.tanggalSurat);
  const formattedTglMulai = formatDate(formData.tanggalMulaiSakit);
  const formattedTglSelesai = formatDate(formData.tanggalSelesaiSakit);

  const tempatTglLahir = [formData.tempatLahir, formattedTglLahir].filter(Boolean).join(", ");

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none p-[2.54cm] text-black text-[12pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5]"
    >
      <div className="flex flex-col h-full cv-section break-inside-avoid">
        {/* Title */}
        <div className="text-center font-bold text-[14pt] underline mb-10">
          SURAT KETERANGAN SAKIT
        </div>

        {/* Content */}
        <div className="text-justify mb-4">
          Saya yang bertanda tangan di bawah ini, menerangkan bahwa:
        </div>

        <div className="ml-8 mb-4 flex flex-col gap-1">
          <div className="flex">
            <span className="w-40 shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.nama || ""}</span>
          </div>
          <div className="flex">
            <span className="w-40 shrink-0">Tempat, Tgl Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahir}</span>
          </div>
          <div className="flex">
            <span className="w-40 shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelamin || ""}</span>
          </div>
          <div className="flex">
            <span className="w-40 shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamat || ""}</span>
          </div>
          <div className="flex">
            <span className="w-40 shrink-0">Pekerjaan</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.pekerjaan || ""}</span>
          </div>
          <div className="flex">
            <span className="w-40 shrink-0">Diagnosa</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.diagnosa || ""}</span>
          </div>
        </div>

        <div className="indent-8 text-justify mb-4">
          Dengan ini menerangkan bahwa saya dalam keadaan SAKIT dan perlu ISTIRAHAT selama {formData.lamaSakit || ""} hari, mulai tanggal {formattedTglMulai} s.d {formattedTglSelesai}.
        </div>

        <div className="indent-8 text-justify mb-12">
          Demikian surat keterangan sakit ini saya buat dengan sebenar-benarnya untuk dipergunakan semestinya.
        </div>

        {/* Signature Area */}
        <div className="flex justify-end mt-4 break-inside-avoid cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-1">{formattedTglSurat}</p>
            <p className="mb-4">Yang Menerangkan</p>
            
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
