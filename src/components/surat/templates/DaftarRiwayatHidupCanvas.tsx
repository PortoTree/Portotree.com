interface DaftarRiwayatHidupCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function DaftarRiwayatHidupCanvas({ formData, signatureData }: DaftarRiwayatHidupCanvasProps) {
  const validPendidikanFormal = (formData.pendidikanFormal || []).filter((item: any) => item.tahunMulai || item.tahunSelesai || item.tahun || item.institusi);
  const validPendidikanNonformal = (formData.pendidikanNonformal || []).filter((item: any) => item.tahunMulai || item.tahunSelesai || item.tahun || item.institusi);
  const validPengalamanKerja = (formData.pengalamanKerja || []).filter((item: any) => item.tahunMulai || item.tahunSelesai || item.tahun || item.deskripsi);
  const validRiwayatOrganisasi = (formData.riwayatOrganisasi || []).filter((item: any) => item.tahunMulai || item.tahunSelesai || item.tahun || item.deskripsi);

  return (
    <div className="px-[20mm] py-[12mm] text-[12pt] leading-[1.5] flex flex-col flex-1 bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Header */}
      <h2 className="text-center font-bold text-xl pt-4 mb-8 tracking-wide uppercase underline underline-offset-4 cv-section break-inside-avoid">
        DAFTAR RIWAYAT HIDUP
      </h2>

      {/* DATA PRIBADI */}
      <div className="mb-6 cv-section break-inside-avoid">
        <h3 className="font-bold mb-4 uppercase">DATA PRIBADI</h3>
        <table className="w-full ml-4">
          <tbody>
            <tr>
              <td className="w-52 pb-2">Nama</td>
              <td className="w-4 pb-2">:</td>
              <td className="pb-2">{formData.nama || '[Nama Lengkap]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Tempat/ Tgl. Lahir</td>
              <td className="pb-2">:</td>
              <td className="pb-2">
                {formData.tempatLahir || '[Tempat Lahir]'}, {formData.tanggalLahir ? new Date(formData.tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Tanggal Lahir]'}
              </td>
            </tr>
            <tr>
              <td className="pb-2">Jenis Kelamin</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.jenisKelamin || '[Jenis Kelamin]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Status</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.statusPernikahan || '[Status Pernikahan]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Agama</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.agama || '[Agama]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Kewarganegaraan</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.kewarganegaraan || '[Kewarganegaraan]'}</td>
            </tr>
            <tr>
              <td className="pb-2 align-top">Alamat</td>
              <td className="pb-2 align-top">:</td>
              <td className="pb-2 align-top whitespace-pre-wrap">{formData.alamat || '[Alamat Lengkap]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Pendidikan Terakhir</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.pendidikan || '[Pendidikan Terakhir]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Telepon (HP)</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.telepon || '[Nomor Telepon]'}</td>
            </tr>
            <tr>
              <td className="pb-2">Email</td>
              <td className="pb-2">:</td>
              <td className="pb-2">{formData.email || '[Email]'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PENDIDIKAN */}
      {(validPendidikanFormal.length > 0 || validPendidikanNonformal.length > 0) && (
        <div className="mb-6 cv-section">
          <h3 className="font-bold mb-4 uppercase">PENDIDIKAN</h3>
          
          <div className="ml-4">
            {/* Pendidikan Formal */}
            {validPendidikanFormal.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold mb-2">Pendidikan Formal</h4>
                <div className="w-full ml-4 flex flex-col">
                  {validPendidikanFormal.map((item: any, idx: number) => (
                    <div key={idx} className="break-inside-avoid flex pb-2">
                      <div className="w-40 shrink-0">
                        {item.tahunMulai || item.tahunSelesai 
                          ? `${item.tahunMulai || ''} ${item.tahunMulai && item.tahunSelesai ? '-' : ''} ${item.tahunSelesai || ''}`.trim()
                          : (item.tahun || '')}
                      </div>
                      <div>{item.institusi || ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pendidikan Nonformal */}
            {validPendidikanNonformal.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold mb-2">Pendidikan Nonformal</h4>
                <div className="w-full ml-4 flex flex-col">
                  {validPendidikanNonformal.map((item: any, idx: number) => (
                    <div key={idx} className="break-inside-avoid flex pb-2">
                      <div className="w-40 shrink-0">
                        {item.tahunMulai || item.tahunSelesai 
                          ? `${item.tahunMulai || ''} ${item.tahunMulai && item.tahunSelesai ? '-' : ''} ${item.tahunSelesai || ''}`.trim()
                          : (item.tahun || '')}
                      </div>
                      <div>{item.institusi || ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PENGALAMAN KERJA */}
      {validPengalamanKerja.length > 0 && (
        <div className="mb-6 cv-section">
          <h3 className="font-bold mb-4 uppercase">PENGALAMAN KERJA</h3>
          <div className="w-full ml-4 flex flex-col">
            {validPengalamanKerja.map((item: any, idx: number) => (
              <div key={idx} className="break-inside-avoid flex pb-2">
                <div className="w-52 shrink-0">
                  {item.tahunMulai || item.tahunSelesai 
                    ? `${item.tahunMulai || ''} ${item.tahunMulai && item.tahunSelesai ? '-' : ''} ${item.tahunSelesai || ''}`.trim()
                    : (item.tahun || '')}
                </div>
                <div className="w-4 shrink-0">:</div>
                <div>{item.deskripsi || ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RIWAYAT ORGANISASI */}
      {validRiwayatOrganisasi.length > 0 && (
        <div className="mb-6 cv-section">
          <h3 className="font-bold mb-4 uppercase">RIWAYAT ORGANISASI</h3>
          <div className="w-full ml-4 flex flex-col">
            {validRiwayatOrganisasi.map((item: any, idx: number) => (
              <div key={idx} className="break-inside-avoid flex pb-2">
                <div className="w-52 shrink-0">
                  {item.tahunMulai || item.tahunSelesai 
                    ? `${item.tahunMulai || ''} ${item.tahunMulai && item.tahunSelesai ? '-' : ''} ${item.tahunSelesai || ''}`.trim()
                    : (item.tahun || '')}
                </div>
                <div className="w-4 shrink-0">:</div>
                <div>{item.deskripsi || ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing Statement */}
      <div className="mb-6">
        <p className="mb-2">
          Demikian Surat Riwayat Hidup ini saya buat dengan sebenar-benarnya dan dapat dipertanggungjawabkan.
        </p>
      </div>

      {/* Signature */}
      <div className="flex justify-end pr-8 mt-6 pt-4 cv-section break-inside-avoid">
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
