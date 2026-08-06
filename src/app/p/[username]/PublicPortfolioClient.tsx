"use client";

import { useEffect, useRef } from "react";
import { PortfolioViewer } from "@/components/builder/PortfolioViewer";
import { PortfolioData } from "@/lib/portfolioData";

interface PublicPortfolioClientProps {
  data: PortfolioData;
  username: string;
}

export function PublicPortfolioClient({ data, username }: PublicPortfolioClientProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    const storageKey = `tracked_view_${username}`;
    const lastTracked = localStorage.getItem(storageKey);
    const now = Date.now();

    if (lastTracked && now - parseInt(lastTracked) < 60000) {
      console.log("[Analytics] View tracked recently, skipping to save quota.");
      return;
    }

    localStorage.setItem(storageKey, now.toString());

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, type: "view" }),
    }).catch(err => console.error("[Analytics] Failed to track view:", err));
  }, [username]);

  return (
    <div className="min-h-screen bg-white">
      <PortfolioViewer data={data} />
    </div>
  );
}
