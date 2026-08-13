"use server";

import { adminAuth, adminDb } from "@/lib/firebase/server";
import { cookies } from "next/headers";

/**
 * Checks if the current session belongs to the admin.
 */
async function isAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return false;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    const adminEmail = process.env.ADMIN_EMAIL;
    return adminEmail && decodedToken.email === adminEmail;
  } catch (error) {
    return false;
  }
}

/**
 * Toggle suspend status for a user.
 * Sets `isSuspended` in the user's Firestore document.
 */
export async function toggleSuspendUser(uid: string, suspend: boolean) {
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await adminDb.collection("users").doc(uid).set({
      isSuspended: suspend
    }, { merge: true });

    return { success: true };
  } catch (error: any) {
    console.error("Error toggling user suspend status:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a user account completely.
 */
export async function deleteUserAccount(uid: string) {
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Delete from Auth
    await adminAuth.deleteUser(uid);

    // Delete Firestore collections mapping (users, portfolios, resumes, dll)
    await adminDb.collection("users").doc(uid).delete();
    await adminDb.collection("portfolios").doc(uid).delete();
    
    // Note: If you have other subcollections or docs tied to UID, you might want to delete them too.
    // For now, deleting Auth + users + portfolios is sufficient for a hard delete.

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user account:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate a custom token to impersonate a user.
 */
export async function impersonateUser(uid: string) {
  const isAuthorized = await isAdmin();
  if (!isAuthorized) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const customToken = await adminAuth.createCustomToken(uid);
    return { success: true, customToken };
  } catch (error: any) {
    console.error("Error creating custom token:", error);
    return { success: false, error: error.message };
  }
}
