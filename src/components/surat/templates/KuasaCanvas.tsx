import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";

interface KuasaCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function KuasaCanvas({ formData, signatureData }: KuasaCanvasProps) {
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
  
  const formattedTglLahirPemberi = formatDate(formData.tanggalLahirPemberi);
  const tempatTglLahirPemberi = [formData.tempatLahirPemberi, formattedTglLahirPemberi].filter(Boolean).join(", ");
  
  const formattedTglLahirPenerima = formatDate(formData.tanggalLahirPenerima);
  const tempatTglLahirPenerima = [formData.tempatLahirPenerima, formattedTglLahirPenerima].filter(Boolean).join(", ");

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none p-[2.54cm] text-black text-[12pt] font-['Times_New_Roman',_Times,_serif] leading-[1.5]"
    >
      <div className="flex flex-col h-full cv-section break-inside-avoid">
        {/* Title */}
        <div className="text-center font-bold text-[14pt] underline mb-8">
          SURAT KUASA
        </div>

        {/* Pemberi Kuasa */}
        <div className="mb-4">
          Yang bertanda tangan dibawah ini :
        </div>

        <div className="mb-6 flex flex-col gap-1">
          <div className="flex">
            <span className="w-[4cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1 font-bold">{formData.namaPemberi || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Tempat/Tgl Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahirPemberi}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelaminPemberi || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Tanda Pengenal</span>
            <span className="mr-2">:</span>
            <span className="flex-1">KTP No. {formData.tandaPengenalPemberi || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamatPemberi || ""}</span>
          </div>
        </div>

        {/* Penerima Kuasa */}
        <div className="mb-4">
          Memberi kuasa kepada :
        </div>

        <div className="mb-6 flex flex-col gap-1">
          <div className="flex">
            <span className="w-[4cm] shrink-0">Nama</span>
            <span className="mr-2">:</span>
            <span className="flex-1 font-bold">{formData.namaPenerima || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Tempat/Tgl Lahir</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{tempatTglLahirPenerima}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Jenis Kelamin</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.jenisKelaminPenerima || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Tanda Pengenal</span>
            <span className="mr-2">:</span>
            <span className="flex-1">KTP No. {formData.tandaPengenalPenerima || ""}</span>
          </div>
          <div className="flex">
            <span className="w-[4cm] shrink-0">Alamat</span>
            <span className="mr-2">:</span>
            <span className="flex-1">{formData.alamatPenerima || ""}</span>
          </div>
        </div>

        {/* Perihal Kuasa */}
        <div className="text-justify mb-4">
          Untuk keperluan {formData.tujuanKuasa || ".........................................................................................."}
        </div>
        
        {formData.rincianKuasa && (
          <div className="pl-8 mb-6 whitespace-pre-wrap font-[inherit]">
            {formData.rincianKuasa}
          </div>
        )}

        <div className="indent-8 text-justify mb-12">
          Demikian Surat Kuasa ini dibuat dengan sebenar-benarnya untuk dipergunakan seperlunya. Atas perhatian dan kerjasama Bapak/Ibu/Saudara kami ucapkan terima kasih.
        </div>

        {/* Signature Area */}
        <div className="relative mt-8 break-inside-avoid cv-section flex justify-between items-end">
          {/* Penerima Kuasa (Kiri) */}
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-4">Penerima Kuasa</p>
            <div className="h-24 w-40 relative my-2" /> {/* Blank space for manual signing */}
            <p className="font-bold underline mt-2">{formData.namaPenerima || "............................."}</p>
          </div>

          {/* Materai box (Tengah) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-2 border border-black w-[2cm] h-[2.5cm] flex items-center justify-center text-[10px] text-center p-1">
            Materai<br/>10000
          </div>

          {/* Pemberi Kuasa (Kanan) */}
          <div className="flex flex-col items-center min-w-[200px]">
            <p className="mb-1">{tempatTanggalSurat}</p>
            <p className="mb-4">Pemberi Kuasa</p>
            
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
            
            <p className="font-bold underline mt-2">{formData.namaPemberi || "............................."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
