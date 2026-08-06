"use server";

import { adminAuth, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";

// ============================================================
// Helper: Ambil UID user dari session cookie
// ============================================================
export async function getAuthenticatedUid(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie?.value) return null;

    const decoded = await adminAuth.verifySessionCookie(sessionCookie.value, true);
    return decoded.uid;
  } catch (error) {
    console.error("[DEBUG] getAuthenticatedUid error:", error);
    return null;
  }
}

// ============================================================
// Check apakah username sudah dipakai
// ============================================================
export async function checkUsername(username: string): Promise<{ available: boolean; error?: string }> {
  try {
    if (!username || username.length < 3) {
      return { available: false, error: "Username minimal 3 karakter" };
    }

    // Validasi format: hanya huruf kecil, angka, dash, underscore
    const validFormat = /^[a-z0-9_-]+$/.test(username);
    if (!validFormat) {
      return { available: false, error: "Username hanya boleh huruf kecil, angka, dash (-), dan underscore (_)" };
    }

    if (username.length > 30) {
      return { available: false, error: "Username maksimal 30 karakter" };
    }

    const doc = await adminDb.collection("usernames").doc(username).get();
    if (doc.exists) {
      return { available: false, error: "Username sudah dipakai" };
    }

    return { available: true };
  } catch (error: any) {
    console.error("[DEBUG] checkUsername error:", error);
    return { available: false, error: error.message };
  }
}

// ============================================================
// Claim username untuk user yang sedang login
// ============================================================
export async function claimUsername(username: string): Promise<{ success: boolean; error?: string }> {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    // Cek apakah user sudah punya username
    const existingPortfolio = await adminDb.collection("portfolios").doc(uid).get();
    if (existingPortfolio.exists && existingPortfolio.data()?.username) {
      return { success: false, error: "Kamu sudah punya username" };
    }

    // Cek ketersediaan
    const check = await checkUsername(username);
    if (!check.available) {
      return { success: false, error: check.error };
    }

    // Atomic write: simpan username mapping + update portfolio doc
    const batch = adminDb.batch();

    // 1. Claim username mapping
    batch.set(adminDb.collection("usernames").doc(username), {
      uid,
      claimedAt: FieldValue.serverTimestamp(),
    });

    // 2. Set/update portfolio document dengan username
    batch.set(
      adminDb.collection("portfolios").doc(uid),
      {
        username,
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();
    console.log(`[DEBUG] Username "${username}" claimed by uid: ${uid}`);

    return { success: true };
  } catch (error: any) {
    console.error("[DEBUG] claimUsername error:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// Ubah username untuk user yang sedang login
// ============================================================
export async function updateUsername(newUsername: string): Promise<{ success: boolean; error?: string }> {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    const check = await checkUsername(newUsername);
    if (!check.available) {
      return { success: false, error: check.error };
    }

    const portfolioRef = adminDb.collection("portfolios").doc(uid);
    const existingPortfolio = await portfolioRef.get();
    
    if (!existingPortfolio.exists) {
       return { success: false, error: "Portfolio tidak ditemukan" };
    }

    const oldUsername = existingPortfolio.data()?.username;
    
    // Jika username tidak berubah
    if (oldUsername === newUsername) {
      return { success: true };
    }

    const batch = adminDb.batch();

    // 1. Delete old username mapping
    if (oldUsername) {
      batch.delete(adminDb.collection("usernames").doc(oldUsername));
    }

    // 2. Claim new username mapping
    batch.set(adminDb.collection("usernames").doc(newUsername), {
      uid,
      claimedAt: FieldValue.serverTimestamp(),
    });

    // 3. Update portfolio document
    batch.set(
      portfolioRef,
      {
        username: newUsername,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();
    console.log(`[DEBUG] Username updated from "${oldUsername}" to "${newUsername}" by uid: ${uid}`);

    return { success: true };
  } catch (error: any) {
    console.error("[DEBUG] updateUsername error:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// Simpan portfolio data ke Firestore
// ============================================================
export async function savePortfolio(portfolioData: any): Promise<{ success: boolean; error?: string }> {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    // Cek apakah user sudah punya portfolio doc (harus claim username dulu)
    const portfolioRef = adminDb.collection("portfolios").doc(uid);
    const existing = await portfolioRef.get();

    if (!existing.exists || !existing.data()?.username) {
      return { success: false, error: "Kamu belum memilih username. Pilih username terlebih dahulu." };
    }

    await portfolioRef.update({
      data: portfolioData,
      updatedAt: FieldValue.serverTimestamp(),
    });

    console.log(`[DEBUG] Portfolio saved for uid: ${uid}`);
    return { success: true };
  } catch (error: any) {
    console.error("[DEBUG] savePortfolio error:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// Ambil portfolio user yang sedang login
// ============================================================
export async function getMyPortfolio(): Promise<{ success: boolean; data?: any; username?: string; createdAt?: string; updatedAt?: string; error?: string }> {
  try {
    const uid = await getAuthenticatedUid();
    if (!uid) return { success: false, error: "Belum login" };

    const doc = await adminDb.collection("portfolios").doc(uid).get();
    if (!doc.exists) {
      return { success: true, data: null, username: undefined };
    }

    const docData = doc.data();
    return {
      success: true,
      data: docData?.data || null,
      username: docData?.username || undefined,
      createdAt: docData?.createdAt?.toDate?.().toISOString() || undefined,
      updatedAt: docData?.updatedAt?.toDate?.().toISOString() || undefined,
    };
  } catch (error: any) {
    console.error("[DEBUG] getMyPortfolio error:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// Ambil portfolio publik berdasarkan username (tanpa auth)
// ============================================================
export async function getPublicPortfolio(username: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // Lookup uid dari username mapping
    const usernameDoc = await adminDb.collection("usernames").doc(username).get();
    if (!usernameDoc.exists) {
      return { success: false, error: "Portfolio tidak ditemukan" };
    }

    const uid = usernameDoc.data()?.uid;
    if (!uid) {
      return { success: false, error: "Portfolio tidak ditemukan" };
    }

    // Ambil portfolio data
    const portfolioDoc = await adminDb.collection("portfolios").doc(uid).get();
    if (!portfolioDoc.exists || !portfolioDoc.data()?.data) {
      return { success: false, error: "Portfolio belum diisi" };
    }

    console.log(`[DEBUG] Public portfolio fetched for username: ${username}`);
    return { success: true, data: portfolioDoc.data()?.data };
  } catch (error: any) {
    console.error("[DEBUG] getPublicPortfolio error:", error);
    return { success: false, error: error.message };
  }
}
