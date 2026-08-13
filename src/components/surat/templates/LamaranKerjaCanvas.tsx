interface LamaranKerjaCanvasProps {
  formData: any;
  signatureData: string | null;
  berkasList: any[];
}

export function LamaranKerjaCanvas({ formData, signatureData, berkasList }: LamaranKerjaCanvasProps) {
  return (
    <div className="px-[20mm] py-[8mm] text-[11pt] leading-[1.5] flex flex-col flex-1 bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Header */}
      <h2 className="text-center font-bold text-lg pt-8 mb-6 tracking-wide uppercase cv-section break-inside-avoid">
        SURAT LAMARAN PEKERJAAN
      </h2>

      <div className="text-right mb-6 cv-section break-inside-avoid">
        <p>{formData.tempatSurat || 'Tempat'}, {formData.tanggalSurat ? new Date(formData.tanggalSurat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal'}</p>
      </div>

      {/* Recipient */}
      <div className="mb-6 leading-tight cv-section break-inside-avoid">
        <p>Kepada Yth:</p>
        <p className="whitespace-pre-wrap">{formData.penerimaSurat || '[Penerima Surat]'}</p>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="mb-1.5">Dengan hormat,</p>
        <p className="indent-10 text-justify">
          Berdasarkan informasi yang saya peroleh bahwa perusahaan yang Bapak/Ibu pimpin saat ini memerlukan pegawai sebagai <strong>{formData.posisi || '[Posisi]'}</strong>. Oleh karena itu saya mengajukan permohonan untuk mengisi posisi tersebut dan siap di tempatkan dimana saja.
        </p>
      </div>

      <div className="mb-4 cv-section break-inside-avoid">
        <p className="mb-1.5">Saya yang bertanda tangan di bawah ini:</p>
        <table className="w-full ml-4">
          <tbody>
            <tr>
              <td className="w-48 pb-1">Nama</td>
              <td className="pb-1">: {formData.nama || '[Nama Lengkap]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Tempat/Tanggal Lahir</td>
              <td className="pb-1">: {formData.tempatLahir || '[Tempat Lahir]'}, {formData.tanggalLahir || '[Tanggal Lahir]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Alamat</td>
              <td className="pb-1">: {formData.alamat || '[Alamat Lengkap]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Jenis Kelamin</td>
              <td className="pb-1">: {formData.jenisKelamin || '[Jenis Kelamin]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Status Pernikahan</td>
              <td className="pb-1">: {formData.statusPernikahan || '[Status Pernikahan]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Agama</td>
              <td className="pb-1">: {formData.agama || '[Agama]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Lulusan</td>
              <td className="pb-1">: {formData.pendidikan || '[Pendidikan Terakhir]'}</td>
            </tr>
            <tr>
              <td className="pb-1">No. Telepon</td>
              <td className="pb-1">: {formData.telepon || '[Nomor Telepon]'}</td>
            </tr>
            <tr>
              <td className="pb-1">Email</td>
              <td className="pb-1">: {formData.email || '[Email]'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 cv-section break-inside-avoid">
        <p className="mb-1.5">Sebagai bahan pertimbangan bagi Bapak/ Ibu bersama ini turut saya lampirkan:</p>
        <ol className="list-decimal list-inside ml-4">
          {berkasList.map((berkas, index) => (
            <li key={berkas.id} className="pb-1">
              <span className="inline-block w-52">{berkas.name || '[Nama Berkas]'}</span>
              {berkas.name && (
                <span>1 Lembar{index === berkasList.length - 1 ? '.' : ''}</span>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-6 cv-section break-inside-avoid">
        <p className="indent-10 text-justify">
          Demikianlah surat permohonan kerja ini saya buat dengan sebenar-benarnya, besar harapan saya sudilah kiranya Bapak/Ibu dapat menerima saya bekerja di perusahaan yang Bapak/Ibu pimpin.
        </p>
        <p className="indent-10 text-justify mt-1">
          Atas perhatian Bapak/Ibu sebelum dan sesudahnya saya ucapkan terima kasih.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-end pr-8 mt-4 pt-4 cv-section break-inside-avoid">
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
          
          <p className="underline decoration-1 underline-offset-4">{formData.nama || '[Nama Lengkap]'}</p>
        </div>
      </div>
    </div>
  );
}
