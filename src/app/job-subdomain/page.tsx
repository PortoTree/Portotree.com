import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/server";
import FeedClient from "@/components/job/FeedClient";

export default async function JobFeedPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  let userPhoto = null;
  let userName = "Pengguna";
  let userRole = "pengguna";

  if (sessionCookie) {
    try {
      const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
      
      const portfolioDoc = await adminDb.collection("portfolios").doc(decodedToken.uid).get();
      if (portfolioDoc.exists) {
        const pData = portfolioDoc.data();
        if (pData?.data?.personal?.photoUrl) {
          userPhoto = pData.data.personal.photoUrl;
        }
        if (pData?.data?.personal?.fullName || pData?.data?.personal?.name) {
          userName = pData.data.personal.fullName || pData.data.personal.name;
        }
      }
    } catch (error) {
      console.error("Error fetching user data for feed:", error);
    }
  }

  return <FeedClient userPhoto={userPhoto} userName={userName} userRole={userRole} />;
}
