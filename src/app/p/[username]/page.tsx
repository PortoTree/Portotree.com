import { notFound } from "next/navigation";
import { getPublicPortfolio } from "@/app/actions/portfolio";
import { PublicPortfolioClient } from "./PublicPortfolioClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ username: string }>;
}

// Dynamic metadata untuk SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const result = await getPublicPortfolio(username);

  if (!result.success || !result.data) {
    return {
      title: "Portfolio Tidak Ditemukan | PortoTree",
    };
  }

  const data = result.data;
  return {
    title: `${data.personal?.name || username} | PortoTree`,
    description: data.personal?.bio || `Portfolio ${data.personal?.name || username} di PortoTree`,
    openGraph: {
      title: `${data.personal?.name || username} — Portfolio`,
      description: data.personal?.headline || data.personal?.bio || "",
      images: data.personal?.photoUrl ? [{ url: data.personal.photoUrl }] : [],
    },
  };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const result = await getPublicPortfolio(username);

  if (!result.success || !result.data) {
    notFound();
  }

  return <PublicPortfolioClient data={result.data} username={username} />;
}
