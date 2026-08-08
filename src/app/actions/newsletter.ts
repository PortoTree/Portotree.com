"use server";

import { adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Email tidak valid." };
    }

    // Check if email already exists
    const snapshot = await adminDb
      .collection("subscribers")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return { success: false, error: "Email sudah terdaftar!" };
    }

    // Save to Firestore
    await adminDb.collection("subscribers").add({
      email,
      source: "blog_sidebar",
      createdAt: FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    console.error("[subscribeToNewsletter] Error:", error);
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}
