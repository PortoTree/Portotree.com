"use server";

import { adminDb } from "@/lib/firebase/server";
import { getAuthenticatedUid } from "./portfolio";

export type AnalyticsData = {
  totalViews: number;
  totalClicks: number;
  uniqueVisitors: number;
  chartData: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
};

export async function getDashboardAnalytics(): Promise<{ success: boolean; data?: AnalyticsData; error?: string }> {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    const analyticsRef = adminDb.collection("analytics").doc(uid);
    const doc = await analyticsRef.get();
    
    let totalViews = 0;
    let totalClicks = 0;
    let uniqueVisitors = 0;

    if (doc.exists) {
      const d = doc.data();
      totalViews = d?.totalViews || 0;
      totalClicks = d?.totalClicks || 0;
      uniqueVisitors = d?.uniqueVisitors || 0;
    }

    // Prepare last 7 days date strings
    const chartData = [];
    const today = new Date();
    const docRefs = [];
    const dateLabels = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      docRefs.push(analyticsRef.collection("daily").doc(dateString));
      
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      dateLabels.push({
        id: dateString,
        label: i === 0 ? 'Hari Ini' : days[d.getDay()]
      });
    }

    // Fetch all 7 daily docs in one batch
    let dailyDocs: any[] = [];
    if (docRefs.length > 0) {
      dailyDocs = await adminDb.getAll(...docRefs);
    }

    // Map data to chart
    for (let i = 0; i < dateLabels.length; i++) {
      const labelData = dateLabels[i];
      const snapshot = dailyDocs[i];
      let views = 0;
      let visitors = 0;
      
      if (snapshot && snapshot.exists) {
        const d = snapshot.data();
        views = d?.views || 0;
        visitors = d?.uniqueVisitors || 0;
      }

      chartData.push({
        date: labelData.label,
        views,
        visitors
      });
    }

    return {
      success: true,
      data: {
        totalViews,
        totalClicks,
        uniqueVisitors,
        chartData
      }
    };
  } catch (error: any) {
    console.error("[DEBUG] getDashboardAnalytics error:", error);
    return { success: false, error: error.message };
  }
}
