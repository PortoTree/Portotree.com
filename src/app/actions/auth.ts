"use server";

import { adminAuth, adminDb } from "@/lib/firebase/server";
import { sendVerificationEmail } from "@/lib/resend";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(idToken: string) {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error creating session cookie:", error);
    return { success: false, error: error.message };
  }
}

export async function validateTurnstile(token: string) {
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET || "",
        response: token,
      }),
    });
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    const result = await r.json();
    if (!result.success) {
      return { success: false, error: "Verifikasi captcha gagal" };
    }
    return { success: true };
  } catch (error: any) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: error.message };
  }
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { success: true };
}

export async function sendVerification(email: string) {
  try {
    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in Firestore
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    await adminDb.collection('otps').doc(email).set({ code, expiresAt });
    
    // Send using Resend
    const result = await sendVerificationEmail(email, code);
    
    if (!result.success) {
      throw new Error("Failed to send email via Resend");
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return { success: false, error: error.message };
  }
}

export async function verifyOTP(email: string, code: string) {
  try {
    const docRef = adminDb.collection('otps').doc(email);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return { success: false, error: "Kode verifikasi tidak ditemukan." };
    }
    
    const data = doc.data();
    if (data?.code !== code) {
      return { success: false, error: "Kode verifikasi salah." };
    }
    
    if (Date.now() > data.expiresAt) {
      return { success: false, error: "Kode verifikasi telah kadaluarsa." };
    }
    
    // Valid! Update user emailVerified status
    const userRecord = await adminAuth.getUserByEmail(email);
    await adminAuth.updateUser(userRecord.uid, { emailVerified: true });
    
    // Clean up OTP
    await docRef.delete();
    
    return { success: true };
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: error.message };
  }
}
