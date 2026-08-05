import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortoTree Portofolio - Bangun Identitas Digital",
  description:
    "Selamat Datang di PortoTree. Pilih tipe akun Anda untuk mulai membangun identitas digital. Apakah Anda membangun portofolio personal atau profil bisnis?",
};

export default function PortofolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
