import { adminDb } from "./src/lib/firebase/server";

async function test() {
  const snapshot = await adminDb.collection("system_announcements").get();
  console.log("Total docs:", snapshot.size);
  snapshot.forEach(doc => console.log(doc.id, doc.data()));
}
test();
