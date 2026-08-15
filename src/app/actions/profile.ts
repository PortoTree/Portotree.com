"use server";

import { adminDb, adminAuth } from "@/lib/firebase/server";
import { getAuthenticatedUid } from "./portfolio";

export async function updateProfileData(type: 'personal' | 'education' | 'experience', data: any) {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    // We update BOTH portfolios and resumes to keep them synchronized
    const portfolioRef = adminDb.collection("portfolios").doc(uid);
    const resumeRef = adminDb.collection("resumes").doc(uid);

    const portfolioDoc = await portfolioRef.get();
    const resumeDoc = await resumeRef.get();

    if (portfolioDoc.exists) {
      await portfolioRef.update({
        [`data.${type}`]: data
      });
    } else {
      await portfolioRef.set({
        data: { [type]: data }
      });
    }

    if (resumeDoc.exists) {
      await resumeRef.update({
        [`data.${type}`]: data
      });
    } else {
      await resumeRef.set({
        data: { [type]: data }
      });
    }

    // Sync full name to Firebase Auth profile if it's personal data
    if (type === 'personal' && data.fullName) {
      try {
        await adminAuth.updateUser(uid, {
          displayName: data.fullName
        });
      } catch (authErr) {
        console.error("Failed to sync displayName to Auth:", authErr);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating profile data:", error);
    return { success: false, error: error.message };
  }
}
