import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const adminDb = getFirestore();

async function checkDb() {
  try {
    const snap = await adminDb.collection("blogs").get();
    let count = 0;
    let published = 0;
    let totalLength = 0;
    
    snap.forEach(doc => {
      const data = doc.data();
      count++;
      if (data.status === 'published' || data.isPublished === true) {
        published++;
      }
      
      const content = data.content || data.body || "";
      totalLength += content.length;
    });

    console.log(`TOTAL_ARTICLES: ${count}`);
    console.log(`PUBLISHED: ${published}`);
    console.log(`AVERAGE_CHAR_LENGTH: ${count > 0 ? Math.round(totalLength / count) : 0}`);
  } catch (error) {
    console.error("DB Error:", error.message);
  }
}

checkDb();
