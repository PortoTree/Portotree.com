import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortoTree Resume - Buat CV ATS Profesional",
  description:
    "Rahasia Membuat CV Profesional dengan PortoTree. Format Terstandarisasi. Template CV ATS friendly yang sudah diuji untuk lolos sistem screening. Instan & Mudah.",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
