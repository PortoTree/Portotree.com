"use client";

import { PortfolioViewer } from "@/components/builder/PortfolioViewer";
import { PortfolioData } from "@/lib/portfolioData";

interface PublicPortfolioClientProps {
  data: PortfolioData;
  username: string;
}

export function PublicPortfolioClient({ data, username }: PublicPortfolioClientProps) {
  console.log(`[DEBUG] Rendering public portfolio for: ${username}`);

  return (
    <div className="min-h-screen bg-white">
      <PortfolioViewer data={data} />
    </div>
  );
}
