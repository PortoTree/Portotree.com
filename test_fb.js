const { adminDb } = require('./src/lib/firebase/server');

async function test() {
  const snapshot = await adminDb.collection('system_announcements').get();
  snapshot.forEach(doc => {
    console.log(doc.id, doc.data());
  });
}
test().catch(console.error);
