interface PengunduranDiriCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function PengunduranDiriCanvas({ formData, signatureData }: PengunduranDiriCanvasProps) {
  return (
    <div className="px-[20mm] py-[20mm] text-[12pt] leading-[1.6] flex flex-col flex-1 bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Header */}
      <h2 className="text-center font-bold text-xl pt-12 mb-12 tracking-wide uppercase underline underline-offset-4 cv-section break-inside-avoid">
        SURAT PENGUNDURAN DIRI
      </h2>

      {/* Tempat & Tanggal */}
      <div className="text-right mb-8 cv-section break-inside-avoid">
        <p>{formData.tempatSurat || 'Tempat'}, {formData.tanggalSurat ? new Date(formData.tanggalSurat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal'}</p>
      </div>

      {/* Penerima */}
      <div className="mb-8 leading-tight cv-section break-inside-avoid">
        <p>Kepada Yth:</p>
        <p className="whitespace-pre-wrap">{formData.penerimaSurat || '[Penerima Surat]'}</p>
        <p className="whitespace-pre-wrap">{formData.perusahaan || '[Nama Perusahaan]'}</p>
      </div>

      {/* Salam Pembuka */}
      <div className="mb-6 cv-section break-inside-avoid">
        <p>Dengan hormat,</p>
      </div>

      {/* Content */}
      <div className="mb-6 cv-section break-inside-avoid">
        <p className="text-justify mb-4">
          Melalui surat ini saya {formData.nama || '[Nama]'} bermaksud mengundurkan diri sebagai {formData.posisi || '[Posisi]'} di {formData.perusahaan || '[Perusahaan]'} terhitung sejak {formData.tanggalPengunduran ? new Date(formData.tanggalPengunduran).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Tanggal Pengunduran Diri]'}.
        </p>
        <p className="text-justify mb-4">
          Saya sangat berterimakasih atas kesempatan yang telah diberikan kepada saya untuk bekerja di {formData.perusahaan || '[Perusahaan]'}, saya juga meminta maaf kepada seluruh karyawan dan pimpinan apabila terdapat kesalahan yang telah saya lakukan selama bekerja.
        </p>
        <p className="text-justify">
          Demikian Surat Pengunduran Diri ini saya tulis dengan sebenar-benarnya dan penuh kesadaran. Saya berharap {formData.perusahaan || '[Perusahaan]'} dapat terus berjaya dan memperoleh yang terbaik.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-end pr-8 mt-4 pt-8 cv-section break-inside-avoid">
        <div className="text-center">
          <p className="mb-4">Hormat Saya,</p>
          
          {signatureData ? (
            <div className="mb-1 w-40 h-24 mx-auto flex items-center justify-center -rotate-2">
              <img src={signatureData} alt="Tanda Tangan" className="max-w-full max-h-full object-contain scale-110" />
            </div>
          ) : (
            <p className="font-['Brush_Script_MT',cursive] text-4xl mb-4 transform -rotate-2 text-slate-300 opacity-90">
              TTD
            </p>
          )}
          
          <p className="font-bold underline decoration-1 underline-offset-4">{formData.nama || '[Nama]'}</p>
        </div>
      </div>
    </div>
  );
}
