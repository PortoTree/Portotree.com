import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortoTree Portofolio - Bangun Identitas Digital",
  description:
    "Selamat Datang di PortoTree. Pilih tipe akun Anda untuk mulai membangun identitas digital. Apakah Anda membangun portofolio personal atau profil bisnis?",
  openGraph: {
    images: ['/logo-portotree.png'],
  },
  twitter: {
    card: "summary_large_image",
    images: ['/logo-portotree.png'],
  },
};

export default function PortofolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
