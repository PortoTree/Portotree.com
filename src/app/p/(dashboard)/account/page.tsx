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
  let portfolioUsername: string | null = null;

  let portfolioData: any = null;

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
    const pData = portfolioDoc.exists ? portfolioDoc.data() : null;

    const resumeDoc = await adminDb.collection("resumes").doc(decodedToken.uid).get();
    const rData = resumeDoc.exists ? resumeDoc.data() : null;

    const pPersonal = pData?.data?.personal || {};
    const rPersonal = rData?.data?.personal || {};
    const mergedPersonal = { ...rPersonal, ...pPersonal };

    portfolioPhoto = mergedPersonal.photoUrl || "";
    portfolioName = mergedPersonal.fullName || pData?.username || rData?.username || "";
    portfolioUsername = pData?.username || rData?.username || null;
    
    portfolioData = {
      personal: mergedPersonal,
      education: (pData?.data?.education?.length > 0 ? pData?.data?.education : null) || rData?.data?.education || [],
      experience: (pData?.data?.experience?.length > 0 ? pData?.data?.experience : null) || rData?.data?.experience || [],
    };

  } catch (error) {
    console.error("Error fetching account data:", error);
    redirect("/login");
  }

  const userData = {
    uid: userRecord.uid,
    email: userRecord.email,
    name: portfolioName || userRecord.displayName || "",
    username: portfolioUsername,
    picture: portfolioPhoto || userRecord.photoURL || "",
    email_verified: userRecord.emailVerified,
    creationTime: userRecord.metadata.creationTime,
  };

  return <AccountClient user={userData} stats={stats} portfolioData={portfolioData} />;
}
