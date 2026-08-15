import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import AccountClient from "./AccountClient";

export const metadata = {
  title: "Akun Saya | PortoTree",
};

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/login");
  }

  let decodedToken: any = null;
  let userRecord: any = null;
  let stats: any = {
    isPremium: false,
    premiumUntil: null,
    isSuspended: false,
    freeResumeCount: 0,
    freeSuratCount: 0
  };

  let portfolioPhoto = "";
  let portfolioName = "";

  try {
    decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    userRecord = await adminAuth.getUser(decodedToken.uid);

    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    if (userDoc.exists) {
      const data = userDoc.data();
      
      const now = Date.now();
      let isPremium = data?.isPremium || false;
      if (isPremium && data?.premiumUntil && data.premiumUntil <= now) {
        isPremium = false; // Expired
      }

      stats = {
        isPremium: isPremium,
        premiumUntil: data?.premiumUntil || null,
        isSuspended: data?.isSuspended || false,
        freeResumeCount: data?.freeResumeCount || 0,
        freeSuratCount: data?.freeSuratCount || 0,
      };
    }

    const portfolioDoc = await adminDb.collection("portfolios").doc(decodedToken.uid).get();
    if (portfolioDoc.exists) {
      const pData = portfolioDoc.data();
      portfolioPhoto = pData?.data?.personal?.photoUrl || "";
      portfolioName = pData?.data?.personal?.fullName || pData?.username || "";
    }

  } catch (error) {
    console.error("Error fetching account data:", error);
    redirect("/login");
  }

  const userData = {
    uid: userRecord.uid,
    email: userRecord.email,
    name: portfolioName || userRecord.displayName || "",
    picture: portfolioPhoto || userRecord.photoURL || "",
    email_verified: userRecord.emailVerified,
    creationTime: userRecord.metadata.creationTime,
  };

  return <AccountClient user={userData} stats={stats} />;
}
