import { adminAuth, adminDb } from "@/lib/firebase/server";
import { UsersTable } from "./UsersTable";

export const metadata = {
  title: "Users | PortoTree Owner",
};

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  // Fetch users from Firebase Auth
  const listUsersResult = await adminAuth.listUsers(100);
  const usersAuth = listUsersResult.users;

  // Fetch users from Firestore to get premium status
  const snapshot = await adminDb.collection("users").get();
  const firestoreUsers = new Map();
  snapshot.docs.forEach(doc => {
    firestoreUsers.set(doc.id, doc.data());
  });

  // Fetch portfolios to get username
  const portfolioSnapshot = await adminDb.collection("portfolios").get();
  const firestorePortfolios = new Map();
  portfolioSnapshot.docs.forEach(doc => {
    firestorePortfolios.set(doc.id, doc.data());
  });

  // Combine data
  const users = usersAuth.map(authRecord => {
    const firestoreData = firestoreUsers.get(authRecord.uid) || {};
    const portfolioData = firestorePortfolios.get(authRecord.uid) || {};
    return {
      uid: authRecord.uid,
      email: authRecord.email,
      displayName: authRecord.displayName || '',
      username: portfolioData.username || '',
      emailVerified: authRecord.emailVerified,
      creationTime: authRecord.metadata.creationTime,
      lastSignInTime: authRecord.metadata.lastSignInTime,
      isPremium: firestoreData.isPremium || false,
      premiumUntil: firestoreData.premiumUntil || null,
      freeResumeCount: firestoreData.freeResumeCount || 0,
      freeSuratCount: firestoreData.freeSuratCount || 0,
      isSuspended: firestoreData.isSuspended || false,
    };
  });

  // Sort by creation time (newest first)
  users.sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Pengguna</h1>
        <p className="text-slate-500 mt-1">Daftar semua pengguna yang terdaftar di platform PortoTree.</p>
      </div>

      <UsersTable initialUsers={users} />
    </div>
  );
}
