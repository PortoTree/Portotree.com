"use server";

import { adminAuth, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { CVConfig, defaultCVConfig } from "@/lib/cvData";
import { defaultPortfolioData } from "@/lib/portfolioData";
import { getAuthenticatedUid } from "./portfolio";

export async function getCVData() {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    const portfolioRef = adminDb.collection('portfolios').doc(uid);
    const cvConfigRef = adminDb.collection('cvConfigs').doc(uid);

    const [portfolioDoc, cvConfigDoc] = await Promise.all([
      portfolioRef.get(),
      cvConfigRef.get()
    ]);

    // Serialize to plain objects to avoid Next.js serialization errors with Firebase Timestamps
    const rawPortfolio = portfolioDoc.exists ? portfolioDoc.data() : null;
    let portfolioDataOnly = rawPortfolio?.data || defaultPortfolioData;
    
    // Auto-recover nested data structure caused by previous CV Builder bug
    while (portfolioDataOnly && portfolioDataOnly.data && !portfolioDataOnly.personal && !portfolioDataOnly.activeSections) {
      portfolioDataOnly = portfolioDataOnly.data;
    }

    const safePortfolioData = JSON.parse(JSON.stringify(portfolioDataOnly));
    const safeConfigData = JSON.parse(JSON.stringify(cvConfigDoc.exists ? cvConfigDoc.data() : defaultCVConfig));

    return {
      success: true,
      data: {
        portfolio: safePortfolioData,
        config: { ...defaultCVConfig, ...safeConfigData } // Merge to ensure all keys exist
      }
    };
  } catch (error: any) {
    console.error("[DEBUG] getCVData error:", error);
    return { success: false, error: error.message };
  }
}

export async function saveCVConfig(config: CVConfig) {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    await adminDb.collection("cvConfigs").doc(uid).set(
      {
        ...config,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return { success: true };
  } catch (error: any) {
    console.error("[DEBUG] saveCVConfig error:", error);
    return { success: false, error: error.message };
  }
}
