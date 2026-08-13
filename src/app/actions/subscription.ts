"use server";

import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export async function checkDownloadLimit(type: 'cv' | 'surat') {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    
    if (!sessionCookie) {
      return { success: false, error: "Unauthorized" };
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie.value, true);
    const userId = decoded.uid;

    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    let userData: any = {
      isPremium: false,
      premiumUntil: null,
      freeResumeCount: 0,
      freeSuratCount: 0
    };

    if (userDoc.exists) {
      userData = { ...userData, ...userDoc.data() };
    } else {
      // Create user doc if it doesn't exist
      await userRef.set(userData);
    }

    // Check if premium
    const now = Date.now();
    if (userData.isPremium && (!userData.premiumUntil || userData.premiumUntil > now)) {
      // If they are lifetime (no premiumUntil) or valid until future
      return { success: true, isPremium: true };
    }

    // Free tier logic
    if (type === 'cv') {
      if (userData.freeResumeCount >= 1) {
        return { success: false, limitReached: true, error: "Limit resume download tercapai" };
      }
      await userRef.update({
        freeResumeCount: FieldValue.increment(1)
      });
    } else if (type === 'surat') {
      if (userData.freeSuratCount >= 1) {
        return { success: false, limitReached: true, error: "Limit surat download tercapai" };
      }
      await userRef.update({
        freeSuratCount: FieldValue.increment(1)
      });
    }

    return { success: true, isPremium: false };

  } catch (error: any) {
    console.error("Error checking download limit:", error);
    return { success: false, error: error.message };
  }
}
