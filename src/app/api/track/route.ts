import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, type } = body;

    if (!username || !type || (type !== "view" && type !== "click")) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Create an anonymous visitor hash (IP + User Agent)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const visitorHash = crypto.createHash("sha256").update(`${ip}-${userAgent}`).digest("hex").slice(0, 16);

    // Resolve UID by username
    const usernameDoc = await adminDb.collection("usernames").doc(username).get();
    if (!usernameDoc.exists) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    const uid = usernameDoc.data()?.uid;
    if (!uid) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // Convert date to YYYY-MM-DD
    const d = new Date();
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    // Firestore references
    const analyticsRef = adminDb.collection("analytics").doc(uid);
    const dailyRef = analyticsRef.collection("daily").doc(dateString);

    await adminDb.runTransaction(async (t) => {
      const analyticsDoc = await t.get(analyticsRef);
      // const dailyDoc = await t.get(dailyRef); // we don't necessarily need to read dailyDoc to use FieldValue.increment

      const isNewVisitor = !analyticsDoc.exists || !(analyticsDoc.data()?.visitorHashes || []).includes(visitorHash);

      // Data for Main Analytics Document
      const analyticsUpdate: any = {
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      if (type === "view") {
        analyticsUpdate.totalViews = FieldValue.increment(1);
      } else if (type === "click") {
        analyticsUpdate.totalClicks = FieldValue.increment(1);
      }

      if (isNewVisitor && type === "view") {
        analyticsUpdate.uniqueVisitors = FieldValue.increment(1);
        analyticsUpdate.visitorHashes = FieldValue.arrayUnion(visitorHash);
      }

      // Data for Daily Analytics Document
      const dailyUpdate: any = {
        date: dateString,
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (type === "view") {
        dailyUpdate.views = FieldValue.increment(1);
      } else if (type === "click") {
        dailyUpdate.clicks = FieldValue.increment(1);
      }

      if (isNewVisitor && type === "view") {
        dailyUpdate.uniqueVisitors = FieldValue.increment(1);
      }

      t.set(analyticsRef, analyticsUpdate, { merge: true });
      t.set(dailyRef, dailyUpdate, { merge: true });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] /api/track error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
