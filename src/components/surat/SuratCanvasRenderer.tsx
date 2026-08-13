import React from "react";
import { LamaranKerjaCanvas } from "@/components/surat/templates/LamaranKerjaCanvas";
import { PengunduranDiriCanvas } from "@/components/surat/templates/PengunduranDiriCanvas";
import { DaftarRiwayatHidupCanvas } from "@/components/surat/templates/DaftarRiwayatHidupCanvas";
import { KeteranganSakitCanvas } from "@/components/surat/templates/KeteranganSakitCanvas";
import { IzinKerjaCanvas } from "@/components/surat/templates/IzinKerjaCanvas";
import { KuasaCanvas } from "@/components/surat/templates/KuasaCanvas";
import { MagangCanvas } from "@/components/surat/templates/MagangCanvas";
import { KesanggupanCanvas } from "@/components/surat/templates/KesanggupanCanvas";
import { PernyataanCanvas } from "@/components/surat/templates/PernyataanCanvas";
import { IzinKuliahCanvas } from "@/components/surat/templates/IzinKuliahCanvas";
import { IzinSekolahCanvas } from "@/components/surat/templates/IzinSekolahCanvas";
import { PernyataanBelumMenikahCanvas } from "@/components/surat/templates/PernyataanBelumMenikahCanvas";
import { CutiCanvas } from "@/components/surat/templates/CutiCanvas";
import { IzinOrtuCanvas } from "@/components/surat/templates/IzinOrtuCanvas";
import { InvoiceCanvas } from "@/components/surat/templates/InvoiceCanvas";

interface SuratCanvasRendererProps {
  type: string;
  formData: any;
  signatureData: string | null;
  berkasList?: any[];
}

export function SuratCanvasRenderer({ type, formData, signatureData, berkasList = [] }: SuratCanvasRendererProps) {
  switch (type) {
    case 'pengunduran-diri':
      return <PengunduranDiriCanvas formData={formData} signatureData={signatureData} />;
    case 'daftar-riwayat-hidup':
      return <DaftarRiwayatHidupCanvas formData={formData} signatureData={signatureData} />;
    case 'keterangan-sakit':
      return <KeteranganSakitCanvas formData={formData} signatureData={signatureData} />;
    case 'izin-kerja':
      return <IzinKerjaCanvas formData={formData} signatureData={signatureData} />;
    case 'kuasa':
      return <KuasaCanvas formData={formData} signatureData={signatureData} />;
    case "magang":
      return <MagangCanvas formData={formData} signatureData={signatureData} berkasList={berkasList} />;
    case "pernyataan":
      return <PernyataanCanvas formData={formData} signatureData={signatureData} pernyataanList={berkasList} />;
    case "kesanggupan":
      return <KesanggupanCanvas formData={formData} signatureData={signatureData} pernyataanList={berkasList} />;
    case "izin-kuliah":
      return <IzinKuliahCanvas formData={formData} signatureData={signatureData} />;
    case "izin-sekolah":
      return <IzinSekolahCanvas formData={formData} signatureData={signatureData} />;
    case "belum-menikah":
      return <PernyataanBelumMenikahCanvas formData={formData} signatureData={signatureData} />;
    case "cuti":
      return <CutiCanvas formData={formData} signatureData={signatureData} />;
    case "izin-ortu":
      return <IzinOrtuCanvas formData={formData} signatureData={signatureData} />;
    case "invoice":
      return <InvoiceCanvas formData={formData} signatureData={signatureData} />;
    case "lamaran-pekerjaan":
    default:
      return <LamaranKerjaCanvas formData={formData} signatureData={signatureData} berkasList={berkasList} />;
  }
}
